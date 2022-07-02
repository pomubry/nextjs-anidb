import Image from "next/image";
import styles from "../../styles/RightSideInfo/Relations.module.css";

const Relations = ({ relations }) => {
  return relations.nodes.map((anime, index) => (
    <div key={index} className={styles.relationBox}>
      <Image
        src={anime.coverImage.extraLarge}
        width={85}
        height={115}
        alt={anime.title.romaji}
      />
      <div className="infoContainer">
        <h4 className={styles.type}>
          {relations.edges[index].relationType.replace(/_/g, " ")}
        </h4>
        <h3 className={styles.title}>{anime.title.romaji}</h3>
        <h4 className={styles.info}>
          {anime.format} · {anime.status.replace(/_/g, " ")}
        </h4>
      </div>
    </div>
  ));
};

export default Relations;
