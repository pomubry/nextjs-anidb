import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Anime.module.css';
import parse from 'html-react-parser';

const Anime = ({ anime }) => {
  return (
    <div className={styles.anime}>
      <div className={styles.coverContainer}>
        <Link href={'/anime/' + anime.id}>
          <a>
            <Image
              src={anime.coverImage.extraLarge}
              layout="fill"
              objectFit
              className={styles.imgBorder}
            />
          </a>
        </Link>
        <div className={styles.coverInfo}>
          <Link href={'/anime/' + anime.id}>
            <a>
              <h4 className={styles.coverTitle}>{anime.title.romaji}</h4>
            </a>
          </Link>
          <p className={styles.coverStudio}>
            {anime.studios.edges[0] && anime.studios.edges[0].node.name}
          </p>
        </div>
      </div>
      <div className={styles.infoFlex}>
        <div className={styles.animeInfo}>
          <h4 className={styles.season}>
            {anime.season} {anime.seasonYear}
          </h4>
          <div className={styles.formatInfo}>
            <p>{anime.format === 'TV' ? 'TV Show' : anime.format}</p>
            <span> • </span>
            <p>
              {anime.episodes > 1 ? anime.episodes + ' episodes' : '? episodes'}
            </p>
            <span> • </span>
            <p>Trend Score: {anime.trending}</p>
          </div>
          <div className={styles.description}>
            {parse(
              anime.description !== null
                ? anime.description
                : 'No description was added yet for this anime.'
            )}
          </div>
        </div>
        <div className={styles.genres}>
          {anime.genres.length > 0 &&
            anime.genres.map((genre, index) => (
              <span className={styles.genre} key={index}>
                {genre}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Anime;
