import Image from "next/image";
import Link from "next/link";
import { FragmentType, useFragment } from "@/lib/gql";
import { RoleEdgeFragment } from "@/lib/query/queryVoiceActor";

interface PropType {
  role: FragmentType<typeof RoleEdgeFragment>;
}

const Head3 = ({ title }: { title: string | null | undefined }) => (
  <h3
    title={title || ""}
    className={`line-clamp-3 rounded-md px-2 pt-2 text-sm font-semibold duration-300 hover:bg-blue-400/20`}
  >
    {title}
  </h3>
);

const RoleCard = (props: PropType) => {
  const role = useFragment(RoleEdgeFragment, props.role);
  return (
    <li className="flex min-w-[9rem] max-w-[9rem] flex-col overflow-hidden rounded-lg bg-slate-100 shadow-xl dark:bg-slate-900">
      <div className="relative aspect-[2/3]">
        <Image
          src={role.node?.coverImage?.large || "N/A"}
          alt={role.node?.title?.romaji || "N/A"}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-[1] flex-col justify-around gap-2 p-3 text-center">
        {role.node?.type === "ANIME" ? (
          <>
            <Link href={`/anime/${role.node.id}`} shallow>
              <Head3 title={role.node.title?.romaji || "N/A"} />
            </Link>
            <span
              title={role.staffRole || "N/A"}
              className="line-clamp-4 text-xs text-purple-600 dark:text-purple-300"
            >
              {role.staffRole}
            </span>
          </>
        ) : (
          <>
            <Head3 title={role.node?.title?.romaji || "N/A"} />
            <span
              title={role.staffRole || "N/A"}
              className="text-xs text-purple-600 dark:text-purple-300"
            >
              {role.staffRole}
            </span>
          </>
        )}
      </div>
    </li>
  );
};
export default RoleCard;
