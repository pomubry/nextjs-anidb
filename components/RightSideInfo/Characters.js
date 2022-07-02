import Image from "next/image";
import styles from "../../styles/RightSideInfo/Characters.module.css";

const Characters = ({ characters }) => {
  return characters.edges.map((edge, index) => {
    return (
      <div key={index} className={styles.charactersBox}>
        {/* Anime character on the left */}
        <div className={styles.charGrid}>
          <Image
            src={edge.node.image.large}
            width={60}
            height={80}
            alt={edge.node.name.full}
          />
          <div className="infoContainer">
            <h3 className="name">{edge.node.name.full}</h3>
            <h4 className="role">{edge.role}</h4>
          </div>
        </div>

        {/* Voice actor on the right */}
        {edge.voiceActors[0] && (
          <div className={styles.vaGrid} style={{ justifySelf: "flex-end" }}>
            <div className="infoContainer">
              <h3 className={styles.vaName}>{edge.voiceActors[0].name.full}</h3>
              <h4 className="role" style={{ alignSelf: "flex-end" }}>
                Japanese
              </h4>
            </div>
            <Image
              src={edge.voiceActors[0].image.large}
              width={60}
              height={80}
              alt={edge.voiceActors[0].name.full}
            />
          </div>
        )}
      </div>
    );
  });
};

export default Characters;
