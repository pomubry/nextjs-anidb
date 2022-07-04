import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import fetchQuery from "../lib/fetchQuery";
import queryVariables from "../lib/query";

import Anime from "../components/Anime";
import SearchForm from "../components/SearchForm";
import InfiniteScroll from "react-infinite-scroller";

export async function getServerSideProps({ query }) {
  // Validate first the queries
  const { season, seasonYear } = query;
  const { possibleValues } = queryVariables();
  let isSeasonValid =
    season === undefined || possibleValues.season.includes(season);
  let isSeasonYearValid =
    seasonYear === undefined || possibleValues.seasonYear.includes(seasonYear);

  if (!isSeasonValid || !isSeasonYearValid) {
    return {
      notFound: true,
    };
  }

  // Fetch data once query was valdiated
  const { pageInfo, media, error } = await fetchQuery(1, season, seasonYear);

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageInfo,
      media,
      queryProp: query,
    },
  };
}

export default function Home({ media, pageInfo, queryProp }) {
  const [animeArr, setAnimeArr] = useState(media);
  const [pageDetails, setPageDetails] = useState(pageInfo);
  const [isFetchError, setIsFetchError] = useState(false);

  const { page, season, seasonYear } = useRouter().query;

  // Keywords for <Head/>
  const keywords = animeArr.map((anime) => anime.title.romaji);

  // To be used by <InfiniteScroll/> package to load more data
  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;

    try {
      const { pageInfo, media } = await fetchQuery(
        pageDetails.currentPage + 1,
        season,
        seasonYear
      );

      let newArr = [...animeArr];

      // Only add anime not yet in the state
      media.forEach((animeToAdd) => {
        let isUnique = newArr.every(
          (includedAnime) => includedAnime.id !== animeToAdd.id
        );
        if (isUnique) newArr.push(animeToAdd);
      });

      setAnimeArr(newArr);
      setPageDetails(pageInfo);
      setIsFetchError(false);
    } catch (error) {
      setIsFetchError(true);
    }
  };

  useEffect(() => {
    setAnimeArr(media);
    setPageDetails(pageInfo);
  }, [page, season, seasonYear, media, pageInfo]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Anime list database" />
        <meta
          name="keywords"
          content={`anime list, anime database, nextjs, nextani database, ${keywords}`}
        />
        <meta name="author" content="pomubry" />
        <title>NextAni Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>NextAni Database</h1>

      <SearchForm queryProp={queryProp} />

      <InfiniteScroll
        pageStart={0}
        loadMore={fetchMore}
        hasMore={pageDetails.hasNextPage}
        loader={
          <h4 className={styles.loadingMsg} key={0}>
            {!isFetchError
              ? "Loading..."
              : "Loading failed. Please try again..."}
          </h4>
        }
      >
        <section className={styles.animeContainer}>
          {animeArr?.map((anime) => (
            <Anime anime={anime} key={anime.id} />
          ))}
        </section>
      </InfiniteScroll>
    </div>
  );
}
