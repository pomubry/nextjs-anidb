import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useVAPageQuery } from "@/lib/utils";

interface PropType {
  heading: "Characters" | "Anime Staff Roles";
  currentPage: number | null | undefined;
  hasNextPage: boolean | null | undefined;
  total: number | null | undefined;
  query: "cp" | "sp";
}

const SectionHeader = (props: PropType) => {
  const currentPage = props.currentPage || 1;
  const pageHandler = useVAPageQuery();

  return (
    <div className="my-5 flex items-center gap-5">
      <h2 className="text-2xl font-extrabold">{props.heading}</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            pageHandler({
              cmd: "PREVIOUS",
              query: props.query,
              currentPage,
            })
          }
          disabled={currentPage <= 1}
          className={`text-3xl font-extrabold duration-300 ${
            currentPage === 1
              ? "text-purple-500/50 dark:text-purple-300/50"
              : "text-purple-500 hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-400"
          } `}
        >
          <BsArrowLeftSquareFill />
        </button>
        <span>
          {currentPage} / {props.hasNextPage ? props.total : currentPage}
        </span>
        <button
          onClick={() =>
            pageHandler({
              cmd: "NEXT",
              query: props.query,
              currentPage,
            })
          }
          disabled={!props.hasNextPage}
          className={`rotate-180 text-3xl font-extrabold duration-300 ${
            props?.hasNextPage
              ? "text-purple-500 hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-400"
              : "text-purple-500/50 dark:text-purple-300/50"
          }`}
        >
          <BsArrowLeftSquareFill />
        </button>
      </div>
    </div>
  );
};
export default SectionHeader;
