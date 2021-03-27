import Image from 'next/image';
import styles from '../styles/Anime.module.css';
import parse from 'html-react-parser';

const Anime = ({ anime }) => {
  return (
    <div className={styles.anime}>
      <div className={styles.coverContainer}>
        <Image
          src={anime.coverImage.extraLarge}
          //  width={185} height={265}
          layout="fill"
          objectFit
        />
        <div className={styles.coverInfo}>
          <h4 className={styles.coverTitle}>{anime.title.romaji}</h4>
          <p className={styles.coverStudio}>
            {anime.studios.edges[0].node.name}
          </p>
        </div>
      </div>
      <div className={styles.animeInfo}>
        <h4 className={styles.season}>
          {anime.season} {anime.seasonYear}
        </h4>
        <div className={styles.formatInfo}>
          <p>{anime.format === 'TV' ? 'TV Show' : anime.format}</p>
          <span> • </span>
          <p>
            {anime.episodes > 1
              ? anime.episodes + ' episodes'
              : anime.episodes + ' episode'}
          </p>
        </div>
        <div className={styles.description}>{parse(anime.description)}</div>
      </div>
    </div>
  );
};

export default Anime;
