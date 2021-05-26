import Image from "next/image";
import styles from "../styles/Cards.module.css";

const Characters = ({ characters }) => {
  return characters.edges.map((edge, index) => {
    return (
      <div key={index} className={styles.charactersBox}>
        <div className={styles.charGrid}>
          <Image src={edge.node.image.large} width={60} height={80} />
          <div className={styles.infoContainer}>
            <h3 className={styles.name}>{edge.node.name.full}</h3>
            <h4 className={styles.role}>{edge.role}</h4>
          </div>
        </div>
        {edge.voiceActors[0] && (
          <div className={styles.vaGrid} style={{ justifySelf: "flex-end" }}>
            <div className={styles.infoContainer}>
              <h3 className={styles.vaName}>{edge.voiceActors[0].name.full}</h3>
              <h4 className={styles.role} style={{ alignSelf: "flex-end" }}>
                Japanese
              </h4>
            </div>
            <Image
              src={edge.voiceActors[0].image.large}
              width={60}
              height={80}
            />
          </div>
        )}
      </div>
    );
  });
};

export default Characters;
[
  {
    image: {
      large:
        "https://s4.anilist.co/file/anilistcdn/staff/large/n124390-4bA3z0wmHehe.png",
    },
    name: {
      full: "Kana Ichinose",
    },
  },
];
