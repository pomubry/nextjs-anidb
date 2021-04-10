import { useRouter } from 'next/router';
import styles from '../../styles/animeId.module.css';
import axios from 'axios';
import fetchQuery from '../../lib/fetchQuery';
import queryId from '../../lib/queryId';

export async function getStaticPaths() {
  const { media } = await fetchQuery();
  let paths = media.map((anime) => ({
    params: { animeId: anime.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  try {
    const { data } = await axios.post(
      'https://graphql.anilist.co',
      queryId(params.animeId)
    );
    return {
      props: { anime: data.data.Media },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

const anime = ({ anime }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Tis Fallback Page!</div>;
  }
  return (
    <div className={styles.container}>
      <h2>{anime.title.romaji}</h2>
    </div>
  );
};

export default anime;
