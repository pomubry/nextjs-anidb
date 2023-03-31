import Image from "next/image";
import Link from "next/link";
import { FragmentType, useFragment } from "@/lib/gql";
import { CardImageFragment } from "@/lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof CardImageFragment>;
}

const CardImg = (props: PropType) => {
  const anime = useFragment(CardImageFragment, props.anime);

  const filterStudio = anime.studios?.edges?.filter(
    (studio) => studio?.node?.isAnimationStudio && !!studio.node.name.length
  );

  return (
    <div className="relative overflow-hidden">
      <Image
        src={anime.coverImage?.extraLarge!}
        alt={`Cover image for anime ${
          anime.title?.romaji ?? `id: ${anime.id}`
        }`}
        loading="lazy"
        fill
        className="object-cover duration-300 hover:scale-110"
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

        <div>
          {filterStudio?.map((studio, idx) => {
            if (!studio?.node?.id) return null;
            return (
              <Link
                href={`/studio/${studio.node.id}`}
                style={
                  anime.coverImage?.color
                    ? { color: anime.coverImage.color }
                    : {}
                }
                className="text-sm text-purple-400 hover:underline min-[767px]:text-base"
                key={studio.node.id}
              >
                {studio.node.name}
                {filterStudio.length - 1 !== idx &&
                  !!filterStudio[idx + 1]?.node?.name.length &&
                  ", "}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardImg;
