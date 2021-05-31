import styles from "../../styles/RightSideInfo/StatusDistribution.module.css";

const StatusDistribution = ({ stats }) => {
  const total = stats.statusDistribution.reduce((acc, current) => {
    return acc + current.amount;
  }, 0);

  const color = (status) => {
    switch (status) {
      case "CURRENT":
        return "#68d639";
      case "PLANNING":
        return "#02a9ff";
      case "COMPLETED":
        return "#9256f3";
      case "DROPPED":
        return "#f779a4";
      case "PAUSED":
        return "#e85d75";
      default:
        return "black";
    }
  };

  const width = (amount) => {
    return `${(amount / total) * 100}%`;
  };

  return (
    <div className={styles.statusDistribution}>
      {/* Status and number of users */}
      <div className={styles.statusGrid}>
        {stats.statusDistribution.map((stat, index) => (
          <div key={index}>
            <span
              className={styles.statusCard}
              style={{ backgroundColor: color(stat.status) }}
            >
              {stat.status}
            </span>
            <span
              className={styles.statusUsers}
              style={{ color: color(stat.status) }}
            >
              {stat.amount} Users
            </span>
          </div>
        ))}
      </div>

      {/* Single horizontal bar graph */}
      <div className="flex">
        {stats.statusDistribution.map((stat, index) => (
          <div
            style={{
              height: "12px",
              width: width(stat.amount),
              backgroundColor: color(stat.status),
            }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusDistribution;
