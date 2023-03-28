import Image from "next/image";
import Link from "next/link";
import { FragmentType, useFragment } from "@/lib/gql";
import { RecommendationsFragment } from "@/lib/query/queryAnime";

interface PropType {
  rec: FragmentType<typeof RecommendationsFragment>;
}

const Recommendations = (props: PropType) => {
  const rec = useFragment(RecommendationsFragment, props.rec);
  if (!rec.nodes) return null;
  return (
    <>
      {rec.nodes.map((recommendation) => {
        if (!recommendation || !recommendation.mediaRecommendation) return null;
        const mediaRecommendation = recommendation.mediaRecommendation;
        return (
          <li
            className="overflow-hidden rounded-md bg-slate-100 shadow-xl dark:bg-slate-900"
            key={mediaRecommendation.id}
          >
            <div className="relative aspect-[1/1.25] w-full object-cover">
              <Image
                src={
                  mediaRecommendation.coverImage?.extraLarge ??
                  "Image source: N/A"
                }
                alt={mediaRecommendation.title?.romaji ?? "Image alt: N/A"}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-2 text-center">
              <h3 className="rounded-md p-2 font-semibold text-blue-500 duration-300 hover:bg-blue-400/20 dark:text-blue-300">
                <Link
                  href={"/anime/" + mediaRecommendation.id}
                  title={mediaRecommendation.title?.romaji ?? "Title: N/A"}
                  className="line-clamp-4 break-words"
                >
                  {mediaRecommendation.title?.romaji ?? "Title: N/A"}
                </Link>
              </h3>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default Recommendations;
