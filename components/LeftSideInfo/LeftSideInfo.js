import Rankings from "./Rankings";
import Data from "./Data";
import Tags from "./Tags";
import StreamLinks from "./StreamLinks";
import styles from "../../styles/LeftSideInfo/LeftSideInfo.module.css";

const LeftSideInfo = ({ anime }) => {
  return (
    <div className={styles.LeftSideInfo}>
      {/* This component contains 4 parts: Rankings, Data, Tags, and Streaming Links */}

      {!!anime.rankings.length && <Rankings rankings={anime.rankings} />}

      <Data anime={anime} />

      {!!anime.tags.length && (
        <div className={styles.tags}>
          <h3 className={styles.category}>Tags</h3>
          <Tags tags={anime.tags} />
        </div>
      )}

      {!!anime.externalLinks.length && (
        <div className={styles.links}>
          <h3 className={styles.category}>External & Streaming links</h3>
          <StreamLinks links={anime.externalLinks} />
        </div>
      )}
    </div>
  );
};

export default LeftSideInfo;
