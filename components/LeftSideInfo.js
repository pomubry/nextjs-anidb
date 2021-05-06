import Rankings from "./Rankings";
import Data from "./Data";
import Tags from "./Tags";
import StreamLinks from "./StreamLinks";
import styles from "../styles/LeftSideInfo.module.css";

const LeftSideInfo = ({ anime }) => {
  return (
    <div className={styles.LeftSideInfo}>
      {!!anime.rankings.length && <Rankings rankings={anime.rankings} />}

      <Data anime={anime} />

      {!!anime.tags.length && (
        <>
          <h3 className={styles.category}>Tags</h3>
          <Tags tags={anime.tags} />
        </>
      )}

      {!!anime.externalLinks.length && (
        <>
          <h3 className={styles.category}>External & Streaming links</h3>
          <StreamLinks links={anime.externalLinks} />
        </>
      )}
    </div>
  );
};

export default LeftSideInfo;
