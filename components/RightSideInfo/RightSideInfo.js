import styles from "../../styles/RightSideInfo/RightSideInfo.module.css";
import Relations from "./Relations";
import Characters from "./Characters";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Watch from "./Watch";
import Recommendations from "./Recommendations";

const RightSideInfo = ({ anime }) => {
  return (
    <div className={styles.RightSideInfo}>
      {/* This component contains 6 parts: 
          Relations, Characters, Staff, StatusDistribution, Watch, Trailer, & Recommendations */}

      {!!anime.relations?.nodes?.length && (
        <>
          <h3 className={styles.header}>Relations</h3>
          <div className={styles.cards}>
            <Relations relations={anime.relations} />
          </div>
        </>
      )}

      {!!anime.characters?.edges?.length && (
        <>
          <h3 className={styles.header}>Characters</h3>
          <div className={styles.cards}>
            <Characters characters={anime.characters} />
          </div>
        </>
      )}

      {!!anime.staff?.edges?.length && (
        <>
          <h3 className={styles.header}>Staff</h3>
          <div className={styles.cards}>
            <Staff staff={anime.staff} />
          </div>
        </>
      )}

      {!!anime.stats?.statusDistribution?.length && (
        <>
          <h3 className={styles.header}>Status Distribution</h3>
          <StatusDistribution stats={anime.stats} />
        </>
      )}

      {!!anime.streamingEpisodes?.length && (
        <>
          <h3 className={styles.header}>Watch</h3>
          <Watch watch={anime.streamingEpisodes} />
        </>
      )}

      {!!anime.trailer?.site === "youtube" && (
        <>
          <h3 className={styles.header}>Trailer</h3>
          <iframe
            className={styles.embed}
            src={`https://www.${anime.trailer.site}.com/embed/${anime.trailer.id}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </>
      )}

      {!!anime.recommendations?.nodes?.length && (
        <>
          <h3 className={styles.header}>Recommendations</h3>
          <div className={styles.recCards}>
            <Recommendations rec={anime.recommendations.nodes} />
          </div>
        </>
      )}
    </div>
  );
};

export default RightSideInfo;
