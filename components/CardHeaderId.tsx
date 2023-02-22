import Image from "next/image";
import parse from "html-react-parser";
import { FragmentType, useFragment } from "../lib/gql";
import { CardHeadIdFragment } from "../lib/query/queryAnime";

interface PropType {
  anime: FragmentType<typeof CardHeadIdFragment>;
}

const CardHeaderId = (props: PropType) => {
  const anime = useFragment(CardHeadIdFragment, props.anime);

  return (
    <>
      <div className="shadow-xl">
        {anime.bannerImage && (
          <div className="relative h-40 w-full sm:h-60 md:h-80 lg:h-96">
            <Image
              src={anime.bannerImage}
              alt={
                anime.title?.romaji || `Banner image of anime ID: ${anime.id}`
              }
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="mx-auto mt-5 max-w-6xl">
          <div className="relative grid grid-cols-[1fr] grid-rows-[auto,auto] gap-5 p-5 sm:grid-cols-[1fr,1fr] sm:grid-rows-[auto] md:grid-cols-[1fr,2fr]">
            <Image
              src={anime.coverImage?.extraLarge!}
              alt={
                anime.title?.romaji || `Cover image of anime ID: ${anime.id}`
              }
              width={300}
              height={300}
              className={`${
                anime.bannerImage ? "image-offset" : ""
              } mx-auto h-auto w-auto shadow-2xl shadow-black`}
            />

            <div>
              <h1 className="mb-7 text-3xl font-bold text-blue-500 dark:text-blue-300">
                {anime.title?.romaji}
              </h1>
              {anime.description && (
                <p className="mt-2 text-slate-800 dark:text-slate-200">
                  {parse(anime.description)}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CardHeaderId;
