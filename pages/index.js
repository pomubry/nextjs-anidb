import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import fetchQuery from "../lib/fetchQuery";
import queryVariables from "../lib/query";

import Anime from "../components/Anime";
import SearchForm from "../components/SearchForm";

import InfiniteScroll from "react-infinite-scroll-component";

export async function getServerSideProps({ query }) {
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
    },
  };
}

export default function Home({ media, pageInfo }) {
  const [animeArr, setAnimeArr] = useState(media);
  const [pageDetails, setPageDetails] = useState(pageInfo);
  const [isFetchError, setIsFetchError] = useState(false);

  const { page, season, seasonYear } = useRouter().query;

  const keywords = animeArr.map((anime) => anime.title.romaji);

  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;

    try {
      const { pageInfo, media } = await fetchQuery(
        pageDetails.currentPage + 1,
        season,
        seasonYear
      );

      let newArr = [...animeArr];

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
  }, [page, season, seasonYear]);

  return (
    <div className={styles.container}>
      <Head>
        <meta name="description" content="Anime list database" />
        <meta
          name="keywords"
          content={`anime list,anime database,nextjs,${keywords}`}
        />
        <meta name="author" content="pomubry" />
        <title>NextAni Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className={styles.title}>NextAni Database</h1>

      <SearchForm />

      <InfiniteScroll
        dataLength={animeArr.length}
        next={fetchMore}
        hasMore={pageDetails.hasNextPage}
        loader={
          <h4 className={styles.loadingMsg}>
            {!isFetchError
              ? "Loading..."
              : "Loading failed. Please try again..."}
          </h4>
        }
      >
        <section className={styles.animeContainer}>
          {animeArr &&
            animeArr.map((anime) => <Anime anime={anime} key={anime.id} />)}
        </section>
      </InfiniteScroll>
    </div>
  );
}
