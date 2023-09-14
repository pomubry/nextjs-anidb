import Image from "next/image";
import Link from "next/link";

import ExpandButton from "./ExpandButton";
import ListParent from "./ListParent";

import { useFragment, type FragmentType } from "@/lib/gql";
import { RelationsFragment } from "@/lib/query/queryAnime";
import { useExpander } from "@/lib/utils";

interface PropType {
  relations: FragmentType<typeof RelationsFragment>;
}

function getVal(relationType: string | null | undefined) {
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
}

function cleanString(str: string) {
  return str.replace(/_/g, "");
}

function Heading(props: { title: string; children: React.ReactNode }) {
  return (
    <h3
      title={props.title}
      className="mb-auto line-clamp-2 font-bold text-purple"
    >
      {props.children}
    </h3>
  );
}

export default function Relations(props: PropType) {
  const maxNumber = 4;
  const relations = useFragment(RelationsFragment, props.relations);
  const { sliceEnd, expanded, handleExpand } = useExpander({
    maxNumber,
  });

  if (!relations.edges) return null;

  const filteredEdges = relations.edges.filter(
    (edge): edge is NonNullable<typeof edge> => edge !== null,
  );

  return (
    <ListParent>
      {filteredEdges
        .sort((a, b) => getVal(b.relationType) - getVal(a.relationType))
        .slice(0, sliceEnd)
        .map((anime) => {
          if (!anime || !anime.node) return null;
          const title = anime.node.title?.romaji ?? "Title: N/A";
          const isAnimeMedia = /tv|movie|ova/i.test(anime.node.format ?? "");

          return (
            <li
              key={anime.id}
              className="relative flex overflow-hidden rounded-md shadow-xl bg-card"
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

                <Heading title={title}>
                  {isAnimeMedia ? (
                    <Link
                      href={`/anime/${anime.node.id}`}
                      className="hover:underline"
                    >
                      {title}
                    </Link>
                  ) : (
                    <>{title}</>
                  )}
                </Heading>

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
    </ListParent>
  );
}
