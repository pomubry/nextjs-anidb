import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/router";
import { ClientError } from "graphql-request";
import { z } from "zod";

import AnimeHeader from "@/components/anime/AnimeHeader";
import LeftInfo from "@/components/anime/left-info";
import RightInfo from "@/components/anime/right-info";
import SearchForm from "@/components/generic/SearchForm";

import { fetchAnime } from "@/lib/query/queryAnime";

interface GSSP {
  dehydratedState: DehydratedState;
}

const idSchema = z.coerce.number().positive();

export const getServerSideProps: GetServerSideProps<GSSP> = async (context) => {
  const idParams = idSchema.safeParse(context.params?.id);
  if (!idParams.success) {
    console.error("Invalid queries:", idParams.error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
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
    console.error("Fetching error in the getServerSideProps:");
    console.error(error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Anime: NextPage = () => {
  const router = useRouter();
  const id = +(router.query.id as string);

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
    let errorList: React.ReactNode[];

    if (err.response.errors && err.response.errors.length > 0) {
      errorList = err.response.errors.map((err, i) => (
        <li className="my-1" key={i}>
          - {err.message}
        </li>
      ));
    } else {
      errorList = [
        <li className="my-1" key="err.message">
          - {err.message}
        </li>,
      ];
    }
    return (
      <div className="container mx-auto p-3">
        <h2 className="font-bold text-red-600">Anilist Errors:</h2>
        <ul className="ml-3">{errorList}</ul>
      </div>
    );
  }

  if (!data?.anime) {
    return (
      <div className="container mx-auto p-3">
        <h2 className="font-bold text-red-600">No data was found!</h2>
      </div>
    );
  }

  const description =
    data.anime.description ||
    data.anime.title?.romaji ||
    "NextAni ID: " + data.anime.id;

  const keywords = data.anime.synonyms?.join(", ") || description;

  const title = data.anime.title?.romaji ? `${data.anime.title.romaji} | ` : "";

  return (
    <>
      <Head>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content={keywords + ", nextani database, anime list"}
        />
        <title>{title}NextAni</title>
      </Head>

      <AnimeHeader anime={data.anime} />

      <div
        className={`mx-auto max-w-7xl px-5 ${
          isPreviousData ? "select-none opacity-50" : "select-auto opacity-100"
        }`}
      >
        <SearchForm query={{ ss: "ALL", yr: "ALL", pg: 1, sr: "" }} />

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

export default Anime;
