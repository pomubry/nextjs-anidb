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
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { URLSearchParams } from "url";

import CardAni from "../components/CardAni";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";

import {
  cleanHomeQuery,
  fetchHome,
  getCurrentSeason,
  getCurrentYear,
  homeSchema,
} from "../lib/query/queryHome";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<GSSP> = async (context) => {
  const queries = homeSchema.safeParse(context.query);

  if (!queries.success) {
    console.log("Invalid queries:");
    console.log(queries.error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const cleanQuery = cleanHomeQuery(queries.data);
  const { ss, yr, ...restCleanQuery } = cleanQuery;
  const ssrQuery = {
    ...restCleanQuery,
    ...(ss !== getCurrentSeason() && { ss }),
    ...(yr !== getCurrentYear() && { yr }),
  };

  // Redirect if there's a difference between `context.query` and `queries.cleanVariables`
  // i.e. /?ss=SPRING&yr=2022&ss=WINTER will redirect to /?ss=SPRING&yr=2022
  const redirect =
    Object.entries(ssrQuery).some((pair) => {
      const [key, value] = pair;
      const queryValue = context.query[key];
      return queryValue !== value.toString();
    }) ||
    // Redirect if there are excessive/irrelevant queries
    // i.e. for this page, we only need `ss`, `yr`, `pg`, `sr`
    Object.keys(ssrQuery).length !== Object.keys(context.query).length;

  if (redirect) {
    const queryString = new URLSearchParams(
      ssrQuery as any as URLSearchParams
    ).toString();

    console.log(`Redirecting to /?${queryString}`);

    return {
      redirect: {
        destination: "/?" + queryString,
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const queryKey = ["home", queries.data];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchHome(queries.data);
    },
  });

  const error = queryClient.getQueryState(queryKey)?.error;

  if (error) {
    console.log("Fetching error in the getServerSideProps:");
    console.log(error);
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

type PageProp = InferGetServerSidePropsType<typeof getServerSideProps>;

const Home: NextPage<PageProp> = () => {
  const router = useRouter();
  const queryKey = homeSchema.parse(router.query);

  const { data, error, isError, isPreviousData, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: 1,
    queryKey: ["home", queryKey],
    queryFn: async () => {
      return fetchHome(queryKey);
    },
  });

  const setPage = (pg: number) => {
    const res = homeSchema.parse({ ...router.query });
    res.pg = pg;
    const query = cleanHomeQuery(res);

    router.push(
      {
        pathname: "/",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

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

  if (isLoading)
    return (
      <div className="container mx-auto p-3">
        <h2 className="text-blue-400">
          <AiOutlineLoading3Quarters className="mx-auto animate-spin text-4xl" />
        </h2>
      </div>
    );

  const keywords = data.data.Page?.media?.reduce((acc, curr) => {
    const title = curr?.title?.romaji ?? "";
    return acc.length > 0 ? `${acc}, ${title}` : title;
  }, "");

  return (
    <>
      <Head>
        <meta name="description" content="Anime list database" />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database, ${
            keywords ?? ""
          }`}
        />
        <title>NextAni Database</title>
      </Head>

      <div className="mx-auto max-w-7xl p-3 pb-9 dark:text-slate-200">
        <h1 className="text-4xl font-bold duration-300">NextAni Database</h1>
        <SearchForm query={queryKey} />

        <ul
          className={`mt-10 grid grid-cols-[1fr] gap-5 md:grid-cols-[repeat(2,1fr)] ${
            isPreviousData
              ? "select-none opacity-50"
              : "select-auto opacity-100"
          }`}
        >
          {data.data.Page?.media?.map((anime) => (
            <CardAni anime={anime!} key={anime!.id} />
          ))}
        </ul>

        <Pagination
          {...data.data.Page?.pageInfo}
          currentPage={queryKey.pg ?? 1}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Home;
