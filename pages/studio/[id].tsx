import Link from "next/link";
import { useRouter } from "next/router";
import {
  dehydrate,
  QueryClient,
  useQuery,
  type DehydratedState,
} from "@tanstack/react-query";
import type { GetServerSideProps } from "next";
import type { ClientError } from "graphql-request";

import MainLayout from "@/layouts/MainLayout";
import AnimeWork from "@/components/studio/AnimeWork";
import SectionHeader from "@/components/studio/SectionHeader";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";
import StudioHead from "@/components/studio/StudioHead";

import {
  cleanStudioQuery,
  fetchStudio,
  studioQuerySchema,
} from "@/lib/query/queryStudio";
import type { NextPageWithLayout } from "@/lib/types";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps: GetServerSideProps<GSSP> = async (context) => {
  const query = studioQuerySchema.safeParse(context.query);
  if (!query.success) {
    console.error("Invalid queries:", query.error);
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const cleanQuery = cleanStudioQuery(query.data);

  // Redirect if there's a difference between `context.query` and `cleanQuery` (means there's a wrong query)
  // i.e. /studio/858/?pg=ABC&pg=3&pg=4 will redirect to /studio/858/?pg=3
  const redirect =
    Object.entries(cleanQuery).some((pair) => {
      const [key, value] = pair;
      const queryValue = context.query[key]; // type string | string[] | undefined
      return queryValue !== value.toString();
    }) ||
    // Redirect if there are excessive/irrelevant queries
    // i.e. for this page, we only need `pg`
    // i.e. ?pg=abc&pg=4&random=query will redirect to ?pg=4
    Object.keys(cleanQuery).length !== Object.keys(context.query).length - 1; // -1 is to disregard [id] query

  if (redirect) {
    const queryString = new URLSearchParams(
      cleanQuery as unknown as URLSearchParams,
    ).toString();

    return {
      redirect: {
        destination: `/studio/${query.data.id}?` + queryString,
        permanent: false,
      },
    };
  }

  const queryClient = new QueryClient();
  const queryKey = ["anime", query.data];
  await queryClient.prefetchQuery({
    queryKey,
    queryFn: async () => {
      return await fetchStudio(query.data);
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

const Studio: NextPageWithLayout = () => {
  const router = useRouter();
  const queryKey = studioQuerySchema.parse(router.query);

  const {
    data: studio,
    error,
    isError,
    isPreviousData,
  } = useQuery({
    refetchOnWindowFocus: false,
    keepPreviousData: true,
    retry: 1,
    queryKey: ["anime", queryKey],
    queryFn: async () => {
      return fetchStudio(queryKey);
    },
  });

  if (isError) {
    const err = error as ClientError;
    return <GQLError err={err} />;
  }

  if (!studio) {
    return <NoData />;
  }

  // Keep track track of already evaluated anime ID because it could have duplicates.
  const keysIncluded: number[] = [];

  const anime =
    studio.media?.nodes?.reduce(
      (acc, cur) => {
        if (!cur || keysIncluded.includes(cur.id)) return acc;
        keysIncluded.push(cur.id);
        const year = cur.startDate?.year || 9999;
        const arr = acc[year];
        return { ...acc, [year]: arr ? [...arr, cur] : [cur] };
      },
      {} as {
        [key: number]: typeof studio.media.nodes;
      },
    ) || {};

  const animeKeys = Object.keys(anime).sort((a, b) => +b - +a);

  if (
    animeKeys.length === 0 ||
    typeof studio.media?.pageInfo?.currentPage !== "number" ||
    typeof studio.media?.pageInfo?.hasNextPage !== "boolean"
  )
    return (
      <>
        <StudioHead name={studio.name} />
        <div>
          <header className="container mx-auto mb-10 p-5">
            <h1 className="text-4xl font-extrabold">{studio.name}</h1>
            {studio.siteUrl && (
              <a
                href={studio.siteUrl}
                rel="noopener noreferer"
                target="_blank"
              ></a>
            )}
          </header>
          <section
            className={`${
              isPreviousData && "opacity-50"
            } container mx-auto px-5`}
          >
            <p>No works were found for {studio.name}</p>
            {queryKey.pg === 1 ? (
              <Link href="/" className="text-blue-500 dark:text-blue-300">
                Go back to homepage
              </Link>
            ) : (
              <Link
                href={`/studio/${queryKey.id}`}
                className="text-blue-500 dark:text-blue-300"
              >
                Go back to page 1
              </Link>
            )}
          </section>
        </div>
      </>
    );

  return (
    <>
      <StudioHead name={studio.name} />
      <div>
        <header className="container mx-auto mb-10 p-5">
          <h1 className="text-4xl font-extrabold">{studio.name}</h1>
          {studio.siteUrl && (
            <a
              href={studio.siteUrl}
              rel="noopener noreferer"
              target="_blank"
            ></a>
          )}
        </header>
        <section
          className={`${isPreviousData && "opacity-50"} container mx-auto px-5`}
        >
          <SectionHeader
            currentPage={studio.media?.pageInfo?.currentPage}
            hasNextPage={studio.media?.pageInfo?.hasNextPage}
            total={studio.media?.pageInfo?.total}
            isPreviousData={isPreviousData}
          />
          {animeKeys.map((yr) => {
            const year = +yr;
            return (
              <div key={year} className="mb-10">
                <p className="text-right text-2xl">
                  {year === 9999 ? "To Be Announced" : year}
                </p>
                <ul className="my-2 flex gap-2 overflow-scroll md:flex-wrap md:gap-5 md:overflow-visible">
                  {anime[+year].map((ani) => {
                    if (!ani) return null;
                    return <AnimeWork key={ani.id} anime={ani} />;
                  })}
                </ul>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
};

Studio.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Studio;
