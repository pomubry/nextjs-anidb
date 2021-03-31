import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import fetchQuery from '../lib/fetchQuery';
import Anime from '../components/Anime';

export async function getServerSideProps() {
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

export default function Home({ media }) {
  const [animeArr, setAnimeArr] = useState(media);
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js Ani-Database</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className={styles.title}>Trending Anime</h1>

      <section className={styles.animeContainer}>
        {animeArr.map((anime) => (
          <Anime anime={anime} key={anime.id} />
        ))}
      </section>
    </div>
  );
}
