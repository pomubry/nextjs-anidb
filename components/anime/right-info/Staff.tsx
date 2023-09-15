import Image from "next/image";

import ExpandButton from "./ExpandButton";
import ListParent from "./ListParent";

import { useFragment, type FragmentType } from "@/lib/gql";
import { useExpander } from "@/lib/hooks";
import { StaffFragment } from "@/lib/query/queryAnime";

interface PropType {
  staff: FragmentType<typeof StaffFragment>;
}

export default function Staff(props: PropType) {
  const maxNumber = 10;
  const staff = useFragment(StaffFragment, props.staff);

  const { sliceEnd, expanded, handleExpand } = useExpander({ maxNumber });

  return (
    <ListParent className="sm:grid-cols-[1fr,1fr]">
      {staff.edges?.slice(0, sliceEnd).map((obj) => {
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
      {(staff.edges?.length || 0) > maxNumber && (
        <ExpandButton
          expanded={expanded}
          handleExpand={handleExpand}
          colSpan="sm:col-[span_2]"
          key="StaffExpander"
        />
      )}
    </ListParent>
  );
}
