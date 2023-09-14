import Image from "next/image";
import Link from "next/link";
import { useFragment, type FragmentType } from "@/lib/gql";
import { AnimeWorkFragment } from "@/lib/query/queryStudio";

interface Props {
  anime: FragmentType<typeof AnimeWorkFragment>;
  index: number;
}

function Heading(props: { title: string; children: React.ReactNode }) {
  return (
    <h3
      title={props.title}
      className={`line-clamp-3 rounded-md px-2 pt-2 text-sm font-semibold duration-300 hover:bg-blue-400/20`}
    >
      {props.children}
    </h3>
  );
}

export default function AnimeWork(props: Props) {
  const anime = useFragment(AnimeWorkFragment, props.anime);
  const title = anime.title?.romaji || "N/A";

  return (
    <li className="flex min-w-[9rem] max-w-[9rem] flex-col overflow-hidden rounded-lg shadow-xl duration-300 bg-card">
      <div className="relative aspect-[2/3] overflow-hidden">
        <Image
          src={anime.coverImage?.large || "N/A"}
          alt={title}
          priority={props.index === 0}
          fill
          className="object-cover duration-300 hover:scale-110"
        />
      </div>
      <div className="flex flex-[1] flex-col justify-around gap-2 p-3 text-center">
        <Heading title={title}>
          {anime.type === "ANIME" ? (
            <Link href={`/anime/${anime.id}`} shallow>
              {title}
            </Link>
          ) : (
            <>{title}</>
          )}
        </Heading>
      </div>
    </li>
  );
}
