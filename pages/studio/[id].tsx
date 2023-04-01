import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { ClientError } from "graphql-request";

import AnimeWork from "@/components/studio/AnimeWork";
import SectionHeader from "@/components/studio/SectionHeader";
import GQLError from "@/components/generic/GQLError";
import NoData from "@/components/generic/NoData";

import { fetchStudio, studioQuerySchema } from "@/lib/query/queryStudio";
import Head from "next/head";

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

const Studio = () => {
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
  let keysIncluded: number[] = [];

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
      }
    ) || {};

  const animeKeys = Object.keys(anime).sort((a, b) => +b - +a);

  if (
    animeKeys.length === 0 ||
    typeof studio.media?.pageInfo?.currentPage !== "number" ||
    typeof studio.media?.pageInfo?.hasNextPage !== "boolean"
  )
    return (
      <div>
        <h1>{studio.name}</h1>
      </div>
    );

  const { currentPage, hasNextPage, total } = studio.media.pageInfo;

  return (
    <>
      <Head>
        <meta name="description" content={`Animation studio ${studio.name}`} />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database, ${studio.name}`}
        />
        <title>{studio.name} | NextAni Database</title>
      </Head>
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
            currentPage={currentPage}
            hasNextPage={hasNextPage}
            total={total}
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
export default Studio;
