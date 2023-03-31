import { useRouter } from "next/router";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { cleanStudioQuery, studioQuerySchema } from "@/lib/query/queryStudio";

interface PropType {
  currentPage: number | null | undefined;
  hasNextPage: boolean | null | undefined;
  total: number | null | undefined;
  isPreviousData: boolean;
}

const SectionHeader = (props: PropType) => {
  const currentPage = props.currentPage || 1;
  const router = useRouter();

  const pageHandler = ({ forward }: { forward: boolean }) => {
    const res = studioQuerySchema.parse(router.query);
    res["pg"] = forward ? res.pg + 1 : res.pg - 1;

    const cleanQuery = cleanStudioQuery(res);

    router.push(
      {
        pathname: `/studio/${res.id}`,
        query: cleanQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className="my-5 flex items-center gap-5">
      <h2 className="text-2xl font-extrabold">Anime Works</h2>
      <div className="flex items-center gap-2">
        <button
          onClick={() => pageHandler({ forward: false })}
          disabled={props.isPreviousData || currentPage <= 1}
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
          onClick={() => pageHandler({ forward: true })}
          disabled={props.isPreviousData || !props.hasNextPage}
          className={`rotate-180 text-3xl font-extrabold duration-300 ${
            props.hasNextPage
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
