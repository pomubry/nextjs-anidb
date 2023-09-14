import Head from "next/head";
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

import { fetchStudio } from "@/lib/query/queryStudio";
import { cleanStudioQuery, objToUrlSearchParams } from "@/lib/utils";
import { studioQuerySchema } from "@/lib/validation";
import type { NextPageWithLayout } from "@/lib/types";

interface GSSP {
  dehydratedState: DehydratedState;
}

export const getServerSideProps = (async (context) => {
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

  const searchParams = cleanStudioQuery(query.data);

  // Redirect if the number of keys in `searchParams` and `context.query` are not equal
  // That means some search params were cleaned up! Redirect to a cleaner url
  const redirect =
    Object.keys(searchParams).length !== Object.keys(context.query).length - 1; // -1 is to disregard [id] query

  if (redirect) {
    const destination = objToUrlSearchParams(
      searchParams as unknown as URLSearchParams,
    );

    return {
      redirect: {
        destination: `/studio/${query.data.id}` + destination,
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

  const hasNoWorks =
    animeKeys.length === 0 ||
    typeof studio.media?.pageInfo?.currentPage !== "number" ||
    typeof studio.media?.pageInfo?.hasNextPage !== "boolean";

  return (
    <>
      <Head>
        <title>{`${studio.name} | NextAni`}</title>
        <meta name="description" content={`Animation studio ${studio.name}`} />
        <meta name="keywords" content={`nextani database, ${studio.name}`} />
      </Head>

      <div>
        <header className="container mx-auto mb-10 p-5">
          <h1 className="text-4xl font-extrabold">{studio.name}</h1>
        </header>
        <section
          className={`${isPreviousData && "opacity-50"} container mx-auto px-5`}
        >
          {hasNoWorks ? (
            <>
              <p>No works were found for {studio.name}</p>
              {queryKey.pg === 1 ? (
                <Link
                  href="/"
                  className="mt-3 inline-block rounded-lg p-3 font-semibold text-blue bg-card hover:opacity-80"
                >
                  Go back to homepage
                </Link>
              ) : (
                <Link
                  href={`/studio/${queryKey.id}`}
                  className="mt-3 inline-block rounded-lg p-3 font-semibold text-blue bg-card hover:opacity-80"
                >
                  Go back to page 1
                </Link>
              )}
            </>
          ) : (
            <>
              <SectionHeader
                currentPage={studio.media?.pageInfo?.currentPage}
                hasNextPage={studio.media?.pageInfo?.hasNextPage}
                total={studio.media?.pageInfo?.total}
                isPreviousData={isPreviousData}
              />
              {animeKeys.map((yr, index) => {
                const year = +yr;
                return (
                  <div key={year} className="mb-10">
                    <p className="text-right text-2xl">
                      {year === 9999 ? "To Be Announced" : year}
                    </p>
                    <ul className="my-2 flex gap-2 overflow-scroll md:flex-wrap md:gap-5 md:overflow-visible">
                      {anime[+year].map((ani) => {
                        if (!ani) return null;
                        return (
                          <AnimeWork anime={ani} index={index} key={ani.id} />
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </>
          )}
        </section>
      </div>
    </>
  );
};

Studio.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

export default Studio;
