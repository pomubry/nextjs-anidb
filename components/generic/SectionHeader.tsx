import { BsArrowLeftSquareFill } from "react-icons/bs";

interface Props {
  title: string;
  currentPage: number | null | undefined;
  hasNextPage: boolean | null | undefined;
  total: number | null | undefined;
  isPlaceholderData: boolean;
  forwardHandler: () => void;
  previousHandler: () => void;
}

export default function SectionHeader(props: Props) {
  const currentPage = props.currentPage || 1;

  return (
    <div className="my-5 flex items-center gap-5">
      <h2 className="text-2xl font-extrabold text-blue">{props.title}</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={props.previousHandler}
          disabled={props.isPlaceholderData || currentPage <= 1}
          aria-label="View previous works"
          className={`text-3xl font-extrabold ${
            currentPage === 1 || props.isPlaceholderData
              ? "cursor-not-allowed opacity-50 text-purple"
              : "text-purple hover:opacity-80"
          } `}
        >
          <BsArrowLeftSquareFill />
        </button>
        <span>
          {currentPage} / {props.hasNextPage ? props.total : currentPage}
        </span>
        <button
          onClick={props.forwardHandler}
          disabled={props.isPlaceholderData || !props.hasNextPage}
          aria-label="View more works"
          className={`rotate-180 text-3xl font-extrabold ${
            props.hasNextPage && !props.isPlaceholderData
              ? "text-purple hover:opacity-80"
              : "cursor-not-allowed opacity-50 text-purple"
          }`}
        >
          <BsArrowLeftSquareFill />
        </button>
      </div>
    </div>
  );
}
