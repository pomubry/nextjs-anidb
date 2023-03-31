import Image from "next/image";
import Link from "next/link";
import { FragmentType, useFragment } from "@/lib/gql";
import { AnimeWorkFragment } from "@/lib/query/queryStudio";

interface PropType {
  anime: FragmentType<typeof AnimeWorkFragment>;
}

const Head3 = ({ title }: { title: string | null | undefined }) => (
  <h3
    title={title || ""}
    className={`line-clamp-3 rounded-md px-2 pt-2 text-sm font-semibold duration-300 hover:bg-blue-400/20`}
  >
    {title}
  </h3>
);

const AnimeWork = (props: PropType) => {
  const anime = useFragment(AnimeWorkFragment, props.anime);
  return (
    <li className="flex min-w-[9rem] max-w-[9rem] flex-col overflow-hidden rounded-lg bg-slate-100 shadow-xl duration-300 dark:bg-slate-900">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={anime.coverImage?.large || "N/A"}
          alt={anime.title?.romaji || "N/A"}
          fill
          className="object-cover duration-300 hover:scale-110"
        />
      </div>
      <div className="flex flex-[1] flex-col justify-around gap-2 p-3 text-center">
        {anime.type === "ANIME" ? (
          <Link href={`/anime/${anime.id}`} shallow>
            <Head3 title={anime.title?.romaji || "N/A"} />
          </Link>
        ) : (
          <Head3 title={anime.title?.romaji || "N/A"} />
        )}
      </div>
    </li>
  );
};
export default AnimeWork;
