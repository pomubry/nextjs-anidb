import Image from "next/image";

import ListParent from "./ListParent";

import { useFragment, type FragmentType } from "@/lib/gql";
import { StaffFragment } from "@/lib/query/queryAnime";

interface PropType {
  staff: FragmentType<typeof StaffFragment>;
  isPlaceholderData: boolean;
}

export default function Staff(props: PropType) {
  const staff = useFragment(StaffFragment, props.staff);

  if (!staff.edges) return null;

  return (
    <ListParent
      className="sm:grid-cols-[1fr,1fr]"
      isPlaceholderData={props.isPlaceholderData}
    >
      {staff.edges.map((obj) => {
        if (!obj || !obj.node) return null;
        return (
          <li
            className="flex h-[110px] overflow-hidden rounded-md text-sm shadow-xl bg-card md:text-base"
            key={obj.id ?? `${obj.node.id}-${obj.role}`}
          >
            <div className="relative max-w-[130px] flex-[2]">
              <Image
                src={obj.node.image?.large || "N/A"}
                alt={
                  obj.node.name?.full || `Image for staff ID: ${obj.node.id}`
                }
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-[6] flex-col gap-3 p-3">
              <h3 className="mb-auto">{obj.node.name?.full || "N/A"}</h3>
              <p className="text-blue">{obj.role || "N/A"}</p>
            </div>
          </li>
        );
      })}
    </ListParent>
  );
}
