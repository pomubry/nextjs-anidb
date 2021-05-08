import Image from "next/image";
import styles from "../styles/Cards.module.css";

const Watch = ({ watch }) => {
  return (
    <div className={styles.watchGrid}>
      {watch.map((stream, index) => (
        <a href={stream.url} key={index} style={{ display: "inline-block" }}>
          <div style={{ minWidth: "154px", height: "100px" }}>
            <Image src={stream.thumbnail} layout="fill" />
          </div>
          <p>{stream.title}</p>
        </a>
      ))}
    </div>
  );
};

export default Watch;
