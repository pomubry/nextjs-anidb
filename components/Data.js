import styles from "../styles/animeId.module.css";

const Data = ({ anime }) => {
  const studios = anime.studios.nodes.filter(
    (studio) => studio.isAnimationStudio
  );
  const producers = anime.studios.nodes.filter(
    (studio) => !studio.isAnimationStudio
  );

  return (
    <section className={styles.mainData}>
      {anime.format && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Format</h4>
          <p className={styles.lightText}>{anime.format}</p>
        </div>
      )}

      {!!anime.episodes && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Episodes</h4>
          <p className={styles.lightText}>{anime.episodes}</p>
        </div>
      )}

      {!!anime.duration && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Episode Duration</h4>
          <p className={styles.lightText}>{anime.duration} minutes</p>
        </div>
      )}

      {anime.status && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Status</h4>
          <p className={styles.lightText}>{anime.status}</p>
        </div>
      )}

      {Object.keys(anime.startDate).every(
        (props) => anime.startDate[props]
      ) && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Start Date</h4>
          <p className={styles.lightText}>
            {new Date(
              anime.startDate.year,
              anime.startDate.month,
              anime.startDate.day
            ).toDateString()}
          </p>
        </div>
      )}

      {Object.keys(anime.endDate).every((props) => anime.endDate[props]) && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>End Date</h4>
          <p className={styles.lightText}>
            {new Date(
              anime.endDate.year,
              anime.endDate.month,
              anime.endDate.day
            ).toDateString()}
          </p>
        </div>
      )}

      {(anime.season || anime.seasonYear) && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Season</h4>
          <p className={styles.lightText}>
            {`${anime.season} ${anime.seasonYear}`}
          </p>
        </div>
      )}

      {!!anime.averageScore && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Average Score</h4>
          <p className={styles.lightText}>{anime.averageScore}%</p>
        </div>
      )}

      {!!anime.meanScore && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Mean Score</h4>
          <p className={styles.lightText}>{anime.meanScore}%</p>
        </div>
      )}

      {!!anime.popularity && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Popularity</h4>
          <p className={styles.lightText}>{anime.popularity}</p>
        </div>
      )}

      {!!anime.favourites && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Favourites</h4>
          <p className={styles.lightText}>{anime.favourites}</p>
        </div>
      )}

      {!!studios.length && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Studios</h4>
          {studios.map((studio, index) => (
            <p className={styles.lightText} key={index}>
              {studio.name}
            </p>
          ))}
        </div>
      )}

      {!!producers.length && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Producers</h4>
          {producers.map((studio, index) => (
            <p className={styles.lightText} key={index}>
              {studio.name}
            </p>
          ))}
        </div>
      )}

      <div className={styles.shortInfo}>
        <h4 className={styles.darkText}>Source</h4>
        <p className={styles.lightText}>{anime.source}</p>
      </div>

      {!!anime.genres.length && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Genres</h4>
          {anime.genres.map((genre, index) => (
            <span className={styles.lightText} key={index}>
              {genre}
              {anime.genres.length !== index + 1 ? ", " : ""}
            </span>
          ))}
        </div>
      )}

      <div className={styles.shortInfo}>
        <h4 className={styles.darkText}>Romaji</h4>
        <p className={styles.lightText}>{anime.title.romaji}</p>
      </div>

      <div className={styles.shortInfo}>
        <h4 className={styles.darkText}>English</h4>
        <p className={styles.lightText}>{anime.title.english}</p>
      </div>

      <div className={styles.shortInfo}>
        <h4 className={styles.darkText}>Native</h4>
        <p className={styles.lightText}>{anime.title.native}</p>
      </div>

      {!!anime.synonyms.length && (
        <div className={styles.shortInfo}>
          <h4 className={styles.darkText}>Synonyms</h4>
          {anime.synonyms.map((synonym, index) => (
            <p className={styles.lightText} key={index}>
              {synonym}
            </p>
          ))}
        </div>
      )}
    </section>
  );
};

export default Data;
