import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
} from "@tanstack/react-query";
import type { ClientError } from "graphql-request";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { URLSearchParams } from "url";

import CardAni from "../components/CardAni";
import Pagination from "../components/Pagination";
import SearchForm from "../components/SearchForm";

import cleanQueries from "../lib/query/cleanQueries";
import { fetchHome } from "../lib/query/queryHome";
import { getEntries } from "../lib/utils";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<GSSP> = async (context) => {
  const queries = cleanQueries(context.query);

  // Redirect if there's a difference between `context.query` and `queries.cleanVariables`
  // i.e. /?season=SPRING&seasonYear=2022&season=WINTER will redirect to /?season=SPRING&seasonYear=2022
  let redirect = getEntries(queries.cleanVariables).some((a) => {
    if (a !== undefined) {
      const [key, value] = a;
      return context.query[key] !== value?.toString();
    }
  });

  // Redirect if there are excessive/irrelevant queries
  // i.e. for this page, we only need `page`, `season`, `seasonYear`, `search`
  redirect =
    redirect ||
    Object.keys(context.query).length !==
      Object.keys(queries.cleanVariables).length;

  if (redirect) {
    return {
      redirect: {
        destination:
          "/?" +
          new URLSearchParams({
            ...(queries.cleanVariables as URLSearchParams),
          }).toString(),
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const queryKey = ["home", queries.variables];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchHome(queries.variables);
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
type PropType = Awaited<ReturnType<typeof fetchHome>>;

const Home: NextPage<PageProp> = ({ dehydratedState }) => {
  const initialState = dehydratedState.queries[0].state.data as PropType;
  const initialRender = useRef(true);
  const router = useRouter();

  const queries = initialRender.current ? initialState.variables : router.query;
  const cleanVariables = cleanQueries(queries).variables;

  const { data, error, isError, isPreviousData, isLoading } = useQuery({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: 1,
    queryKey: ["home", cleanVariables],
    queryFn: async () => {
      return fetchHome(cleanVariables);
    },
  });

  const setPage = (page: number) => {
    const query = { ...router.query, page };
    router.push(
      {
        pathname: "/",
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    initialRender.current = false;
  }, []);

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

      <div className="mx-auto max-w-6xl p-3 pb-9 dark:text-slate-200">
        <h1 className="text-4xl font-bold">NextAni Database</h1>
        <SearchForm queryProp={{ ...data.variables }} />

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
          currentPage={cleanVariables.page ?? 1}
          setPage={setPage}
        />
      </div>
    </>
  );
};

export default Home;
