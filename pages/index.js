import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import fetchQuery from '../lib/fetchQuery';
import Anime from '../components/Anime';

export async function getStaticProps() {
  const data = await fetchQuery(1);
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

export default function Home({ pageInfo, media }) {
  const [animeArr, setAnimeArr] = useState(media);
  const [hasNextPage, sethasNextPage] = useState(pageInfo.hasNextPage);
  const [lastPage, setLastPage] = useState(pageInfo.lastPage);
  const [currentPage, setCurrentPage] = useState(pageInfo.currentPage);

  const nextBtn = async (e) => {
    if (hasNextPage) {
      setCurrentPage((old) => old + 1);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Trending Anime</h1>

      {/* <button onClick={previousBtn}>-</button> */}
      <p>Page {currentPage}</p>
      <button onClick={nextBtn}>+</button>

      <div className={styles.animeContainer}>
        {animeArr.map((anime) => (
          <Anime anime={anime} />
        ))}
      </div>
    </div>
  );
}
