import CardImg from "./CardImg";
import CardDesc from "./CardDesc";
import { FragmentType, useFragment } from "../lib/gql";
import { AnimeFragment } from "../lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof AnimeFragment>;
}

const CardAni = (props: PropType) => {
  const anime = useFragment(AnimeFragment, props.anime);

  return (
    <li
      className={`grid grid-cols-[4fr_6fr] grid-rows-[13rem] overflow-hidden rounded-lg bg-slate-100 shadow-2xl shadow-slate-700 dark:bg-slate-900 min-[500px]:grid-rows-[17rem]`}
    >
      <CardImg anime={anime} />
      <CardDesc anime={anime} />
    </li>
  );
};

export default CardAni;
