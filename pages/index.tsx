import { useRouter } from "next/router";
import Head from "next/head";
import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
  keepPreviousData,
} from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import type { ClientError } from "graphql-request";

import MainLayout from "@/layouts/MainLayout";
import CardAni from "@/components/homepage/CardAni";
import SearchForm from "@/components/generic/SearchForm";
import Pagination from "@/components/homepage/Pagination";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";

import { useNewURL } from "@/lib/hooks";
import { fetchHome } from "@/lib/query/queryHome";
import { cleanClientHomeSearchParams, getServerHomeQuery } from "@/lib/utils";
import { clientHomeSearchParamsSchema } from "@/lib/validation";
import type { NextPageWithLayout } from "@/lib/types";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps = (async (context) => {
  const clientHomeSearchParams = clientHomeSearchParamsSchema.parse(
    context.query,
  );
  const searchParams = cleanClientHomeSearchParams(clientHomeSearchParams);
  const variables = getServerHomeQuery(searchParams);

  const queryClient = new QueryClient();
  const queryKey = ["home", variables];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchHome(variables);
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

const Home: NextPageWithLayout = () => {
  const router = useRouter();

  const clientHomeSearchParams = clientHomeSearchParamsSchema.parse(
    router.query,
  );
  const searchParams = cleanClientHomeSearchParams(clientHomeSearchParams);
  const variables = getServerHomeQuery(searchParams);

  useNewURL(searchParams);

  const { data, error, isError, isPlaceholderData } = useQuery({
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
    retry: 1,
    queryKey: ["home", variables],
    queryFn: async () => {
      return fetchHome(variables);
    },
  });

  if (isError) {
    const err = error as ClientError;
    return <GQLError err={err} />;
  }

  const pageQuery = data?.data?.Page;
  if (!pageQuery?.media || !pageQuery.pageInfo) return <NoData />;

  const pageInfo = pageQuery.pageInfo;
  const currentPage = pageInfo.currentPage ?? 1;
  let total = 0;

  if (pageInfo.hasNextPage) {
    if (pageInfo.total) {
      total = pageInfo.total;
    } else {
      total = currentPage * 10;
    }
  } else {
    if (pageQuery.media.length > 0) {
      total = (currentPage - 1) * 10 + pageQuery.media.length;
    } else {
      total = currentPage * 10; // only 10 items per query;
    }
  }

  return (
    <>
      <Head>
        <title>NextAni Database</title>
        <meta
          name="description"
          content={`Check the highest rated anime for the current season of ${variables.season} of ${variables.seasonYear}!`}
        />
        <meta
          name="keywords"
          content={`nextani database, ${variables.season} ${variables.seasonYear}`}
        />
      </Head>

      <div className="mx-auto max-w-7xl p-3 pb-9">
        <h1 className="text-4xl font-extrabold duration-300">
          NextAni Database
        </h1>
        <SearchForm query={variables} />

        <ul
          className={`mt-10 grid grid-cols-[1fr] gap-5 md:grid-cols-[repeat(2,1fr)] ${
            isPlaceholderData
              ? "pointer-events-none opacity-50"
              : "opacity-100"
          }`}
        >
          {pageQuery.media.map((anime, index) => {
            if (!anime) return null;
            return <CardAni anime={anime} index={index} key={anime.id} />;
          })}
        </ul>

        <Pagination defaultPage={currentPage} count={total} />
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Home;
