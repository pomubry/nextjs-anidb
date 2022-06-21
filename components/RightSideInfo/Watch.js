import Image from "next/image";
import styles from "../../styles/RightSideInfo/Watch.module.css";

const Watch = ({ watch }) => {
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
            unoptimized
            alt={stream.title}
          />
          <p className={styles.watchTitle}>{stream.title}</p>
        </a>
      ))}
    </div>
  );
};

export default Watch;
