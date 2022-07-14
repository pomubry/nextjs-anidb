import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/RightSideInfo/Recommendations.module.css";

const Recommendations = ({ rec }) => {
  return rec.map(
    ({ mediaRecommendation }) =>
      mediaRecommendation && (
        <div key={mediaRecommendation.id}>
          <div className={styles.recImg}>
            <Link
              href={"/anime/" + mediaRecommendation.id}
              key={mediaRecommendation.id}
            >
              <a>
                <div className={styles.recImgContainer}>
                  <Image
                    src={mediaRecommendation.coverImage.extraLarge}
                    layout="fill"
                    alt={mediaRecommendation.title.romaji}
                  />
                </div>
              </a>
            </Link>
          </div>
          <Link href={"/anime/" + mediaRecommendation.id}>
            <a className={styles.recTitle}>
              {mediaRecommendation.title.romaji}
            </a>
          </Link>
        </div>
      )
  );
};

export default Recommendations;
