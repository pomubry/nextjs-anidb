import Head from "next/head";
import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
  keepPreviousData,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import type { GetServerSideProps } from "next";
import type { ClientError } from "graphql-request";

import MainLayout from "@/layouts/MainLayout";
import AnimeHeader from "@/components/anime/AnimeHeader";
import LeftInfo from "@/components/anime/left-info";
import RightInfo from "@/components/anime/right-info";
import SearchForm from "@/components/generic/SearchForm";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";

import { fetchAnime } from "@/lib/query/queryAnime";
import type { NextPageWithLayout } from "@/lib/types";
import { animeSchema } from "@/lib/validation";
import { cleanAnimeQuery } from "@/lib/utils";
import { useNewURL } from "@/lib/hooks";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps = (async (context) => {
  const anime = animeSchema.safeParse(context.query);
  if (!anime.success) {
    console.error("Invalid queries:", anime.error);
    return {
      notFound: true,
    };
  }

  const queryClient = new QueryClient();
  const queryKey = ["anime", anime.data];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAnime(anime.data.id, anime.data.cp);
    },
  });

  const error = queryClient.getQueryState(queryKey)?.error;

  if (error) {
    console.error("Fetching error in the getServerSideProps:", error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}) satisfies GetServerSideProps<GSSP>;

const Anime: NextPageWithLayout = () => {
  const router = useRouter();
  const animeQuery = animeSchema.parse(router.query);
  const searchParams = cleanAnimeQuery(animeQuery);

  useNewURL(searchParams);

  const { data, error, isError, isPlaceholderData } = useQuery({
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    retry: 1,
    queryKey: ["anime", animeQuery],
    queryFn: async () => {
      return fetchAnime(animeQuery.id, animeQuery.cp);
    },
  });

  if (isError) {
    const err = error as ClientError;
    return <GQLError err={err} />;
  }

  if (!data?.anime) {
    return <NoData />;
  }

  const description =
    data.anime.description ||
    data.anime.title?.romaji ||
    "NextAni ID: " + data.anime.id;

  const keywords = data.anime.synonyms?.join(", ");

  const title = data.anime.title?.romaji
    ? `${data.anime.title.romaji} | NextAni`
    : animeQuery.id + " | NextAni";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={"nextani database, " + keywords || ""} />
      </Head>

      <AnimeHeader anime={data.anime} />

      <div className={`mx-auto max-w-7xl px-5`}>
        <SearchForm query={{ page: 1 }} />

        <div className="mt-10 gap-10 sm:flex">
          <div className="flex-1">
            <LeftInfo anime={data.anime} />
          </div>
          <div className="flex-1 max-sm:mt-5 sm:flex-[3]">
            <RightInfo
              anime={data.anime}
              isPlaceholderData={isPlaceholderData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

Anime.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Anime;
