import Image from "next/image";
import styles from "../styles/Cards.module.css";

const Watch = ({ watch }) => {
  console.log(watch[0].title);
  let isNotReversed = watch[0].title.includes("Episode 1 ");
  let arr = isNotReversed ? watch : watch.reverse();
  return (
    <div className={styles.watchGrid}>
      {arr.map((stream, index) => (
        <a href={stream.url} key={index} className={styles.watchAnchor}>
          <Image
            src={stream.thumbnail}
            layout="fill"
            objectFit="cover"
            className={styles.watchImg}
          />
          <p className={styles.watchTitle}>{stream.title}</p>
        </a>
      ))}
    </div>
  );
};

export default Watch;
