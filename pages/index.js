import { useEffect, useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import fetchQuery from "../lib/fetchQuery";

import Anime from "../components/Anime";
import SearchForm from "../components/SearchForm";
import InfiniteScroll from "react-infinite-scroller";

export async function getServerSideProps({ query }) {
  // If there are no queries, get current season
  if (Object.keys(query).length === 0) {
    query.getCurrentSeason = true;
  }

  const { pageInfo, media, validatedQueries, error } = await fetchQuery(query);

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      pageInfo,
      media,
      queryProp: validatedQueries,
    },
  };
}

export default function Home({ media, pageInfo, queryProp }) {
  const [animeArr, setAnimeArr] = useState(media);
  const [pageDetails, setPageDetails] = useState(pageInfo);
  const [isFetchError, setIsFetchError] = useState(false);

  const { season, seasonYear } = queryProp;

  // Keywords for <Head/>
  const keywords = animeArr.map((anime) => anime.title.romaji);

  // To be used by <InfiniteScroll/> package to load more data
  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;

    try {
      let query = {
        page: pageDetails.currentPage + 1,
        season,
        seasonYear,
      };
      const { pageInfo, media } = await fetchQuery(query);

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
  }, [media, pageInfo, queryProp]);

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
