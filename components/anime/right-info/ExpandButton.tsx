import { IoIosArrowDown } from "react-icons/io";

interface PropType {
  handleExpand: () => void;
  expanded: boolean;
  colSpan?: string;
}
const ExpandButton = ({
  handleExpand,
  expanded,
  colSpan = "md:col-[span_2]",
}: PropType) => {
  return (
    <li
      onClick={handleExpand}
      aria-label="Show more items"
      className={`mx-auto mt-5 flex cursor-pointer items-center gap-2 rounded-md border-2 border-blue-400 px-5 shadow-xl duration-200 hover:bg-blue-300/30 dark:text-blue-300 ${colSpan}`}
    >
      {expanded ? (
        <>
          <IoIosArrowDown className="rotate-180" />
          Hide
        </>
      ) : (
        <>
          <IoIosArrowDown />
          Show more
        </>
      )}
    </li>
  );
};

export default ExpandButton;
