import styles from "../styles/RightSideInfo.module.css";
import Characters from "./Characters";
import Relations from "./Relations";
import Staff from "./Staff";
import StatusDistribution from "./StatusDistribution";
import Watch from "./Watch";

const RightSideInfo = ({ anime }) => {
  return (
    <div className={styles.RightSideInfo}>
      {!!anime.relations.nodes.length && (
        <>
          <h3 className={styles.header}>Relations</h3>
          <div className={styles.cards}>
            <Relations relations={anime.relations} />
          </div>
        </>
      )}

      {!!anime.characters.edges.length && (
        <>
          <h3 className={styles.header}>Characters</h3>
          <div className={styles.cards}>
            <Characters characters={anime.characters} />
          </div>
        </>
      )}

      {!!anime.staff.edges.length && (
        <>
          <h3 className={styles.header}>Staff</h3>
          <div className={styles.cards}>
            <Staff staff={anime.staff} />
          </div>
        </>
      )}

      <h3 className={styles.header}>Status Distribution</h3>
      <StatusDistribution stats={anime.stats} />

      {!!anime.streamingEpisodes.length && (
        <>
          <h3 className={styles.header}>Watch</h3>
          <Watch watch={anime.streamingEpisodes} />
        </>
      )}
    </div>
  );
};

export default RightSideInfo;
