import styles from "../styles/RightSideInfo.module.css";
import Relations from "./Relations";

const RightSideInfo = ({ anime }) => {
  return (
    <div className={styles.RightSideInfo}>
      <h3 className={styles.header}>Relations</h3>
      <div className={styles.relations}>
        <Relations relations={anime.relations} />
      </div>
    </div>
  );
};

export default RightSideInfo;
