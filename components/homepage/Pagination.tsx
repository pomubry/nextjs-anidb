import { useRouter } from "next/router";
import { cleanClientHomeSearchParams } from "@/lib/utils";
import { clientHomeSearchParamsSchema } from "@/lib/validation";

interface BtnType {
  pageNum: number;
}

interface PropType {
  currentPage: number;
  lastPage: number;
}

const classNames = "m-5 mt-16 flex items-center justify-center gap-3";

const Pagination = ({ currentPage, lastPage }: PropType) => {
  const router = useRouter();

  const setPage = (pg: number) => {
    const res = clientHomeSearchParamsSchema.parse({ ...router.query });
    res.pg = pg;
    const query = cleanClientHomeSearchParams(res);

    router.push(
      {
        pathname: "/",
        query,
      },
      undefined,
      { shallow: true, scroll: false },
    );
  };

  const Radio = ({ pageNum }: BtnType) => (
    <button
      onClick={() => setPage(pageNum)}
      disabled={currentPage === pageNum}
      className={`h-8 w-8 overflow-ellipsis rounded-lg text-xs duration-300 sm:h-10 sm:w-10 sm:text-sm ${
        currentPage === pageNum
          ? "bg-blue-300 text-slate-900"
          : "hover:bg-blue-400 hover:text-slate-900"
      }`}
    >
      {pageNum}
    </button>
  );

  const arr: number[] = [];

  if (currentPage && lastPage) {
    for (let i = -2; i <= 2; i++) {
      if (currentPage + i > 1 && currentPage + i < lastPage) {
        arr.push(currentPage + i);
      }
    }

    return (
      // Anilist API doesn't return the exact number of `lastPage` or `total`
      <div className={classNames}>
        <Radio pageNum={1} />

        {arr[0] - 1 > 2 && <span> • • • </span>}

        {arr.map((num) => (
          <Radio pageNum={num} key={num} />
        ))}

        {lastPage - arr[arr.length - 1] > 2 && <span> • • • </span>}

        {lastPage > 1 && <Radio pageNum={lastPage} />}
      </div>
    );
  }

  return (
    <div className={`${classNames} text-red-400`}>Page info is missing</div>
  );
};

export default Pagination;
