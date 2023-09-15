import Head from "next/head";
import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { z } from "zod";
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

interface GSSP {
  dehydratedState: DehydratedState;
}

const idSchema = z.coerce.number().positive();

export const getServerSideProps = (async (context) => {
  const idParams = idSchema.safeParse(context.params?.id);
  if (!idParams.success) {
    console.error("Invalid queries:", idParams.error);
    return {
      notFound: true,
    };
  }

  const id = idParams.data;

  const queryClient = new QueryClient();
  const queryKey = ["anime", id];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchAnime(id);
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
  const id = idSchema.parse(router.query.id);

  const { data, error, isError, isPreviousData } = useQuery({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: 1,
    queryKey: ["anime", id],
    queryFn: async () => {
      return fetchAnime(id);
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
    : id + " | NextAni";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={"nextani database, " + keywords || ""} />
      </Head>

      <AnimeHeader anime={data.anime} />

      <div
        className={`mx-auto max-w-7xl px-5 ${
          isPreviousData ? "select-none opacity-50" : "select-auto opacity-100"
        }`}
      >
        <SearchForm query={{ page: 1 }} />

        <div className="mt-10 gap-10 sm:flex">
          <div className="flex-1">
            <LeftInfo anime={data.anime} />
          </div>
          <div className="flex-1 max-sm:mt-5 sm:flex-[3]">
            <RightInfo anime={data.anime} />
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
