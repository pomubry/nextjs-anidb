import styles from "../../styles/LeftSideInfo/StreamLinks.module.css";

const bgColor = (site) => {
  switch (site.toLowerCase()) {
    case "animelab":
    case "funimation":
    case "hbo max":
      return styles.purple;
    case "amazon":
    case "crunchyroll":
    case "vrv":
      return styles.orange;
    case "hulu":
      return styles.green;
    case "netflix":
    case "youtube":
      return styles.red;
    default:
      return styles.blue;
  }
};
const StreamLinks = ({ links }) => {
  return (
    <div>
      {links.map((link, index) => (
        <a
          href={link.url}
          key={index}
          target="_blank"
          className={`${styles.link} ${bgColor(link.site)}`}
        >
          {link.site}
        </a>
      ))}
    </div>
  );
};

export default StreamLinks;
