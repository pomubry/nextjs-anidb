import { AiFillStar, AiFillHeart } from "react-icons/ai";
import styles from "../styles/Rankings.module.css";

const Rankings = ({ rankings }) => {
  return (
    <div>
      {!!rankings.length &&
        rankings.map((rank, index) => {
          return (
            <div className={styles.rank} key={index}>
              {rank.type === "RATED" ? (
                <AiFillStar style={{ color: "#f7bf63" }} />
              ) : (
                <AiFillHeart style={{ color: "#e85d75" }} />
              )}
              <span style={{ marginLeft: "10px" }}>
                #{rank.rank} {rank.context}
                {!rank.allTime && " of "}
                {!rank.allTime && !!rank.season && rank.season}{" "}
                {!rank.allTime && !!rank.year && rank.year}
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Rankings;
