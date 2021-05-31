import styles from "../../styles/LeftSideInfo/Tags.module.css";

const Tags = ({ tags }) => {
  return (
    <div>
      {tags.map((tag) => (
        <div className={styles.tag} key={tag.name}>
          <p>{tag.name}</p>
          <p>{tag.rank}%</p>
        </div>
      ))}
    </div>
  );
};

export default Tags;
