import Image from "next/image";
import Link from "next/link";
import { FragmentType, useFragment } from "@/lib/gql";
import { CardImageFragment } from "@/lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof CardImageFragment>;
}

const CardImg = (props: PropType) => {
  const anime = useFragment(CardImageFragment, props.anime);
  const aniStudio = anime.studios?.edges?.reduce((acc, curr) => {
    let isFirstItem = acc.length === 0;
    if (isFirstItem) {
      return `${curr?.node?.isAnimationStudio ? curr.node.name : ""}`;
    } else {
      return `${acc}, ${curr?.node?.isAnimationStudio ? curr.node.name : ""}`;
    }
  }, "");

  return (
    <div className="relative overflow-hidden">
      <Image
        src={anime.coverImage?.extraLarge!}
        alt={`Cover image for anime ${
          anime.title?.romaji ?? `id: ${anime.id}`
        }`}
        loading="lazy"
        fill
        className="object-cover transition hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/80 p-3">
        <Link href={`/anime/${anime.id}`}>
          <h2
            title={anime.title?.romaji ?? `Anime ID: ${anime.id}`}
            className="line-clamp-3 text-sm text-slate-200 hover:underline min-[767px]:text-base"
          >
            {anime.title?.romaji ?? "Title: N/A"}
          </h2>
        </Link>

        <h3
          style={
            anime.coverImage?.color ? { color: anime.coverImage.color } : {}
          }
          className="text-sm text-purple-400 min-[767px]:text-base"
        >
          {aniStudio?.length === 0 ? "Studio: N/A" : aniStudio}
        </h3>
      </div>
    </div>
  );
};

export default CardImg;
