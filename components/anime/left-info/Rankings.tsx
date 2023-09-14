import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { useFragment, type FragmentType } from "@/lib/gql";
import { RankingsFragment } from "@/lib/query/queryAnime";

interface PropType {
  rank: FragmentType<typeof RankingsFragment>;
}

export default function Rankings(props: PropType) {
  const rank = useFragment(RankingsFragment, props.rank);

  return (
    <li className="mb-2 grid place-content-center rounded-md p-2 shadow-xl bg-card">
      <p className="grid grid-cols-[1fr_4fr] items-center text-center text-sm capitalize">
        {rank.type === "RATED" ? (
          <AiFillStar className="mr-1 text-xl text-yellow-400" />
        ) : (
          <AiFillHeart className="mr-1 text-xl text-red-400" />
        )}
        #{rank.rank} {rank.context}
        {!rank.allTime && " of "}
        {rank.season} {rank.year}
      </p>
    </li>
  );
}
