import { AiFillHeart, AiFillStar } from "react-icons/ai";
import { FragmentType, useFragment } from "@/lib/gql";
import { RankingsFragment } from "@/lib/query/queryAnime";

interface PropType {
  rank: FragmentType<typeof RankingsFragment>;
}

const Rankings = (props: PropType) => {
  const rank = useFragment(RankingsFragment, props.rank);

  return (
    <li className="mb-2 grid place-content-center rounded-md bg-slate-100 p-2 text-slate-900 shadow-xl dark:bg-slate-900 dark:text-slate-200">
      <p className="flex items-center gap-2 text-center text-sm capitalize">
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
};

export default Rankings;
