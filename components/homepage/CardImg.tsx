import Image from "next/image";
import Link from "next/link";
import { useFragment, type FragmentType } from "@/lib/gql";
import { CardImageFragment } from "@/lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof CardImageFragment>;
}

const CardImg = (props: PropType) => {
  const anime = useFragment(CardImageFragment, props.anime);

  const filterStudio = anime.studios?.edges?.filter(
    (studio) => studio?.node?.isAnimationStudio && !!studio.node.name.length,
  );

  return (
    <div className="relative overflow-hidden">
      <Image
        src={anime.coverImage?.extraLarge || "N/A"}
        alt={`Cover image for anime ${
          anime.title?.romaji ?? `id: ${anime.id}`
        }`}
        loading="lazy"
        fill
        className="object-cover duration-300 hover:scale-110"
      />
      <div className="absolute bottom-0 left-0 w-full bg-black/80 p-3">
        <h2
          title={anime.title?.romaji ?? `Anime ID: ${anime.id}`}
          className="text-slate-200 hover:underline "
        >
          <Link
            href={`/anime/${anime.id}`}
            className="mb-2 line-clamp-2 px-1 pt-1 text-sm min-[767px]:line-clamp-3"
          >
            {anime.title?.romaji ?? "Title: N/A"}
          </Link>
        </h2>

        <div className="flex flex-wrap gap-2">
          {filterStudio?.map((studio, idx) => {
            if (!studio?.node?.id) return null;
            return (
              <h3 key={studio.node.id}>
                <Link
                  href={`/studio/${studio.node.id}`}
                  style={
                    anime.coverImage?.color
                      ? { color: anime.coverImage.color }
                      : {}
                  }
                  className="p-1 text-sm text-purple-300 hover:underline"
                >
                  {studio.node.name}
                  {filterStudio.length - 1 !== idx &&
                    !!filterStudio[idx + 1]?.node?.name.length &&
                    ", "}
                </Link>
              </h3>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CardImg;
