import styles from "../styles/RightSideInfo.module.css";
import Characters from "./Characters";
import Relations from "./Relations";
import Staff from "./Staff";

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
      <h3 className={styles.header}>Staff</h3>
      <div className={styles.cards}>
        <Staff staff={anime.staff} />
      </div>
    </div>
  );
};

export default RightSideInfo;
