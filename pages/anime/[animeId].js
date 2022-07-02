import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import styles from "../../styles/animeId.module.css";
import axios from "axios";
import fetchQuery from "../../lib/fetchQuery";
import queryId from "../../lib/queryId";
import parse from "html-react-parser";
import LeftSideInfo from "../../components/LeftSideInfo/LeftSideInfo";
import RightSideInfo from "../../components/RightSideInfo/RightSideInfo";

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
      "https://graphql.anilist.co",
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

const Anime = ({ anime }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <meta name="description" content={anime.description} />
        <meta name="keywords" content={anime.synonyms} />
        <title>{`${anime.title.romaji} | NextAni`}</title>
      </Head>

      {anime.bannerImage && (
        <div
          className={styles.bannerContainer}
          style={{ backgroundImage: `url(${anime.bannerImage})` }}
        ></div>
      )}

      {/* Header containing cover image and synopsis */}
      <header className={styles.header}>
        <div className={styles.flexContainerHeader}>
          <div
            className={`${styles.headerImg} ${
              anime.bannerImage ? styles.topOffset : ""
            }`}
          >
            <Image
              src={anime.coverImage.extraLarge}
              layout="fill"
              alt={anime.title.romaji}
            />
          </div>
          <div className={styles.headerTexts}>
            <h1 className={styles.darkText}>{anime.title.romaji}</h1>
            <p className={styles.lightText}>
              {parse(
                anime.description !== null
                  ? anime.description
                  : "No description was added yet for this anime."
              )}
            </p>
          </div>
        </div>
      </header>

      {/* Main info in these two components */}
      <div className={styles.container}>
        <div className={styles.flexContainer}>
          <LeftSideInfo anime={anime} />
          <RightSideInfo anime={anime} />
        </div>
      </div>
    </div>
  );
};

export default Anime;
