import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
} from "@tanstack/react-query";
import type { ClientError } from "graphql-request";
import { URLSearchParams } from "url";

import CardAni from "@/components/homepage/CardAni";
import Pagination from "@/components/homepage/Pagination";
import SearchForm from "@/components/generic/SearchForm";
import Loading from "@/components/generic/Loading";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";

import { fetchHome } from "@/lib/query/queryHome";
import {
  cleanClientHomeSearchParams,
  getServerHomeQuery,
  objToUrlSearchParams,
} from "@/lib/utils";
import { clientHomeSearchParamsSchema } from "@/lib/validation";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<GSSP> = async (context) => {
  const clientHomeSearchParams = clientHomeSearchParamsSchema.parse(
    context.query,
  );

  const searchParams = cleanClientHomeSearchParams(clientHomeSearchParams);

  // Redirect if the number of keys in `searchParams` and `context.query` are not equal
  // That means some search params were cleaned up! Redirect to a cleaner url
  const redirect =
    Object.keys(searchParams).length !== Object.keys(context.query).length;

  if (redirect) {
    const destination = objToUrlSearchParams(
      searchParams as unknown as URLSearchParams,
    );

    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

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
};

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<PageProps> = () => {
  const router = useRouter();
  const queryKey = clientHomeSearchParamsSchema.parse(router.query);
  const variables = getServerHomeQuery(queryKey);

  const { data, error, isError, isPreviousData } = useQuery({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
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

  return (
    <>
      <Head>
        <meta
          name="description"
          content={`Check the highest rated anime for the current season of ${variables.season} of ${variables.seasonYear}!`}
        />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database, ${variables.season} ${variables.seasonYear}!`}
        />
        <title>NextAni Database</title>
      </Head>

      <div className="mx-auto max-w-7xl p-3 pb-9">
        <h1 className="text-4xl font-bold duration-300">NextAni Database!</h1>
        <SearchForm query={variables} />

        {isPreviousData && (pageQuery.media.length ?? 0) === 0 ? (
          <Loading />
        ) : (
          <>
            <ul
              className={`mt-10 grid grid-cols-[1fr] gap-5 md:grid-cols-[repeat(2,1fr)] ${
                isPreviousData
                  ? "select-none opacity-50"
                  : "select-auto opacity-100"
              }`}
            >
              {pageQuery.media.map((anime) => {
                if (!anime) return null;
                return <CardAni anime={anime} key={anime.id} />;
              })}
            </ul>

            <Pagination
              currentPage={currentPage}
              lastPage={pageInfo.lastPage ?? currentPage + 1}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Home;
