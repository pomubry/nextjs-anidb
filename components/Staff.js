import Image from "next/image";
import styles from "../styles/Cards.module.css";

const Staff = ({ staff }) => {
  return staff.edges.map((obj, index) => {
    return (
      <div className={styles.staffContainer} key={index}>
        <Image src={obj.node.image.large} width={52} height={70} />
        <div className={styles.infoContainer}>
          <h3 className={styles.name}>{obj.node.name.full}</h3>
          <h4 className={styles.role}>{obj.role}</h4>
        </div>
      </div>
    );
  });
};

export default Staff;
