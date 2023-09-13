import CardImg from "./CardImg";
import CardDesc from "./CardDesc";
import { useFragment, type FragmentType } from "@/lib/gql";
import { AnimeFragment } from "@/lib/query/queryHome";

interface PropType {
  anime: FragmentType<typeof AnimeFragment>;
  index: number;
}

export default function CardAni(props: PropType) {
  const anime = useFragment(AnimeFragment, props.anime);

  return (
    <li
      className={`grid grid-cols-[4fr_6fr] grid-rows-[13rem] overflow-hidden rounded-lg shadow-xl duration-300 bg-card min-[500px]:grid-rows-[19rem]`}
    >
      <CardImg anime={anime} index={props.index} />
      <CardDesc anime={anime} />
    </li>
  );
}
