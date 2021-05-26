import Link from "next/link";
import { useRouter } from "next/router";
import footerLinks from "../lib/footerLinks";
import navLinks from "../lib/navLinks";
import styles from "../styles/Layout.module.css";

const Layout = ({ children }) => {
  const router = useRouter();
  let isAnime = router.asPath.includes("/anime");
  let isChildrenFallback = !Object.keys(children.props).length;
  console.log("isChildrenFallback?:", !isChildrenFallback);
  return (
    <div className={styles.mainLayout}>
      <nav
        className={`${styles.nav} ${
          isAnime && !isChildrenFallback && children.props.anime.bannerImage
            ? styles.opaque
            : ""
        }`}
      >
        <Link href="/">
          <a>
            <div className={styles.logoContainer}>
              <span className={styles.aLogo}>N</span>
              <span className={styles.lLogo}>A</span>
            </div>
          </a>
        </Link>
        {navLinks.map((arr) => (
          <ul className={styles.extLink} key={arr[0].link}>
            {arr.map((item) => {
              let cName =
                item.name === "Sign Up"
                  ? `${styles.link} ${styles.signup}`
                  : styles.link;
              return (
                <li className={cName} key={item.link}>
                  <a href={item.link} target="_blank" rel="noopener">
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        ))}
      </nav>
      {children}
      <footer className={styles.footer}>
        <div className={styles.disclaimer}>
          <h2 className={styles.discHeader}>Disclaimer:</h2>
          <br />
          <p>
            This website is not the official Anilist.co. This is a small project
            made for learning purposes only. However, all data are fetched from
            Anilist's API.
          </p>
        </div>
        <div className={styles.footerLinks}>
          {footerLinks.map((arr) => (
            <ul className={styles.footerUl} key={arr[0].link}>
              {arr.map((item) => (
                <li key={item.link}>
                  <a href={item.link} target="_blank" rel="noopener">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
