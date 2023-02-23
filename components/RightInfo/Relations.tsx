import Image from "next/image";
import Link from "next/link";
import ExpandButton from "../ExpandButton";
import { FragmentType, useFragment } from "../../lib/gql";
import { RelationsFragment } from "../../lib/query/queryAnime";
import useExpander from "../../lib/useExpander";

interface PropType {
  relations: FragmentType<typeof RelationsFragment>;
}

const getVal = (relationType: string | null | undefined) => {
  switch (relationType) {
    case "SEQUEL":
      return 6;
    case "PREQUEL":
      return 5;
    case "ALTERNATIVE":
      return 4;
    case "SPIN_OFF":
      return 3;
    case "SIDE_STORY":
      return 2;
    default:
      return 1;
  }
};

const cleanString = (str: string) => str.replace(/_/g, "");

const Head3 = ({ title }: { title: string }) => (
  <h3
    title={title}
    className="mb-auto font-bold text-purple-500 line-clamp-2 dark:text-purple-300"
  >
    {title}
  </h3>
);

const Relations = (props: PropType) => {
  const maxNumber = 4;
  const relations = useFragment(RelationsFragment, props.relations);
  const { sliceEnd, expanded, handleExpand } = useExpander({
    maxNumber,
  });

  if (!relations.edges) return null;

  const filteredEdges = relations.edges.filter((edge) => edge !== null);

  return (
    <>
      {filteredEdges
        // types returned by filter method doesn't work properly so use non-null assertion
        .sort((a, b) => getVal(b!.relationType) - getVal(a!.relationType))
        .slice(0, sliceEnd)
        .map((anime) => {
          if (!anime || !anime.node) return null;
          return (
            <li
              key={anime.id}
              className="relative flex overflow-hidden rounded-md bg-slate-100 shadow-2xl dark:bg-slate-900 dark:text-slate-200"
            >
              <div className="relative min-h-[150px] flex-[2]">
                <Image
                  src={anime.node.coverImage!.extraLarge!}
                  alt={
                    anime.node.title?.romaji ??
                    "Cover image for anime with ID:" + anime.node.id
                  }
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-[6] flex-col p-3">
                <p className="mb-2">{cleanString(anime.relationType ?? "")}</p>

                {/tv|movie|ova/i.test(anime.node.format ?? "") ? (
                  <h3
                    title={anime.node.title?.romaji ?? "Title: N/A"}
                    className="mb-auto font-bold text-purple-500 line-clamp-2 dark:text-purple-300"
                  >
                    <Link
                      href={`/anime/${anime.node.id}`}
                      className="hover:underline"
                    >
                      {anime.node.title?.romaji ?? "Title: N/A"}
                    </Link>
                  </h3>
                ) : (
                  <Head3 title={anime.node.title?.romaji ?? "Title: N/A"} />
                )}

                {anime.node.format && anime.node.status && (
                  <p>
                    {cleanString(anime.node.format)} ·{" "}
                    {cleanString(anime.node.status)}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      {filteredEdges.length > maxNumber && (
        <ExpandButton
          expanded={expanded}
          handleExpand={handleExpand}
          key="RelationsExpander"
        />
      )}
    </>
  );
};

export default Relations;
