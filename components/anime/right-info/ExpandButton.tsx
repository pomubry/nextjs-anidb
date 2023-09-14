import { IoIosArrowDown } from "react-icons/io";

interface PropType {
  handleExpand: () => void;
  expanded: boolean;
  colSpan?: string;
}
export default function ExpandButton(props: PropType) {
  return (
    <li className={`mx-auto ${props.colSpan || "md:col-[span_2]"}`}>
      <button
        onClick={props.handleExpand}
        className={`mx-auto mt-5 flex cursor-pointer items-center gap-2 rounded-md border-2 border-blue-400 px-5 shadow-xl duration-200 hover:bg-blue-300/30 dark:text-blue-300`}
      >
        {props.expanded ? (
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
      </button>
    </li>
  );
}
