import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import fetchQuery from '../lib/fetchQuery';
import Anime from '../components/Anime';
import { useRouter } from 'next/router';

export async function getServerSideProps() {
  const data = await fetchQuery();

  if (!data) {
    return {
      notFound: true,
    };
  }
  const { pageInfo, media } = data.data.Page;

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
  const [isLoading, setIsLoading] = useState(false);
  const { query } = useRouter();
  const { page, season, seasonYear } = query;

  const fetchMore = async () => {
    if (!pageDetails.hasNextPage) return;
    setIsLoading(true);

    const data = await fetchQuery(
      pageDetails.currentPage + 1,
      season,
      seasonYear
    );
    if (!data) {
      setIsLoading(false);
      return;
    }
    const { pageInfo, media } = data.data.Page;

    let oldArr = [...animeArr];
    media.forEach((anime) => {
      let isUnique = true;
      oldArr.forEach((obj) => {
        if (obj.id === anime.id) isUnique = false;
      });
      if (isUnique) oldArr.push(anime);
    });

    setAnimeArr(oldArr);
    setPageDetails(pageInfo);
    setIsLoading(false);
  };

  useEffect(async () => {
    if (!Object.keys(query).length) return;

    setIsLoading(true);
    const data = await fetchQuery(page, season, seasonYear);
    if (!data) {
      setIsLoading(false);
      return;
    }

    const { pageInfo, media } = data.data.Page;
    setAnimeArr(media);
    setPageDetails(pageInfo);
    setIsLoading(false);
  }, [page, season, seasonYear]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Ani-Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>
        Trending Anime {isLoading && 'Am Loading'}
      </h1>

      <section className={styles.animeContainer}>
        {animeArr &&
          animeArr.map((anime) => <Anime anime={anime} key={anime.id} />)}
      </section>
      {isLoading && <p>Am Loading</p>}
      {!isLoading && pageDetails.hasNextPage && (
        <button onClick={fetchMore}>fetchMore</button>
      )}
    </div>
  );
}
