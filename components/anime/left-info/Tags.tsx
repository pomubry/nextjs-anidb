import { FragmentType, useFragment } from "../../../lib/gql";
import { TagsFragment } from "../../../lib/query/queryAnime";

interface PropType {
  tags: FragmentType<typeof TagsFragment>;
}

const Tags = (props: PropType) => {
  const tags = useFragment(TagsFragment, props.tags);

  return (
    <li className="mb-2 flex overflow-x-scroll rounded-md bg-slate-100 p-2 text-sm shadow-xl dark:bg-slate-900 dark:text-slate-200">
      <p className="flex-1">{tags.name}</p>
      <p>{tags.rank ? `${tags.rank}%` : "-"}</p>
    </li>
  );
};

export default Tags;
