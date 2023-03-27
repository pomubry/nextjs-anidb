import Image from "next/image";
import ExpandButton from "../ExpandButton";
import { FragmentType, useFragment } from "../../lib/gql";
import { StaffFragment } from "../../lib/query/queryAnime";
import { useExpander } from "../../lib/utils";

interface PropType {
  staff: FragmentType<typeof StaffFragment>;
}

const Staff = (props: PropType) => {
  const maxNumber = 10;
  const staff = useFragment(StaffFragment, props.staff);

  const { sliceEnd, expanded, handleExpand } = useExpander({ maxNumber });

  return (
    <>
      {staff.edges?.slice(0, sliceEnd).map((obj) => {
        if (!obj || !obj.node) return null;
        return (
          <li
            className="flex h-[110px] overflow-hidden rounded-md bg-slate-100 text-sm shadow-2xl dark:bg-slate-900 md:text-base"
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
              <p className="text-blue-600 dark:text-blue-400">
                {obj.role || "N/A"}
              </p>
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
    </>
  );
};

export default Staff;
