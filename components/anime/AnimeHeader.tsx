import Image from "next/image";
import { sanitize } from "isomorphic-dompurify";
import { useFragment, type FragmentType } from "@/lib/gql";
import { CardHeadIdFragment } from "@/lib/query/queryAnime";

interface PropType {
  anime: FragmentType<typeof CardHeadIdFragment>;
}

export default function AnimeHeader(props: PropType) {
  const anime = useFragment(CardHeadIdFragment, props.anime);

  const cleanHtml = sanitize(
    anime.description ?? "<i>There are no descriptions for this anime yet.</i>",
    { USE_PROFILES: { html: true } },
  );

  return (
    <div className="shadow-xl">
      {anime.bannerImage && (
        <div className="relative h-40 w-full sm:h-60 md:h-80 lg:h-96">
          <Image
            src={anime.bannerImage}
            alt={anime.title?.romaji || `Banner image of anime ID: ${anime.id}`}
            priority
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="mx-auto mt-5 max-w-7xl pb-5">
        <div className="relative grid grid-cols-[1fr] grid-rows-[auto,auto] gap-5 p-5 sm:grid-cols-[1fr,1fr] sm:grid-rows-[auto] md:grid-cols-[1fr,2fr]">
          <Image
            src={anime.coverImage?.extraLarge || "N/A"}
            alt={anime.title?.romaji || `Cover image of anime ID: ${anime.id}`}
            width={300}
            height={300}
            priority
            className={`${
              anime.bannerImage ? "image-offset" : ""
            } mx-auto aspect-[2/3] object-cover shadow-xl shadow-slate-900`}
          />

          <div>
            <h1 className="mb-7 text-3xl font-bold text-blue">
              {anime.title?.romaji}
            </h1>
            {anime.description && (
              <p
                className="mt-2 text-slate"
                dangerouslySetInnerHTML={{
                  __html: cleanHtml,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
