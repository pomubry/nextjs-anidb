import Image from "next/image";
import styles from "../../styles/RightSideInfo/Staff.module.css";

const Staff = ({ staff }) => {
  return staff.edges.map((obj, index) => {
    return (
      <div className={styles.staffContainer} key={index}>
        <Image src={obj.node.image.large} width={52} height={70} unoptimized />
        <div className="infoContainer">
          <h3 className="name">{obj.node.name.full}</h3>
          <h4 className="role">{obj.role}</h4>
        </div>
      </div>
    );
  });
};

export default Staff;
