import { PageInfo } from "../lib/gql/graphql";

interface BtnType {
  pageNum: number;
}

interface PropType extends PageInfo {
  // eslint-disable-next-line no-unused-vars
  setPage: (val: number) => void;
}

const classNames = "m-5 mt-16 flex items-center justify-center gap-3";

const Pagination = ({ currentPage, setPage, lastPage }: PropType) => {
  const Radio = ({ pageNum }: BtnType) => (
    <button
      onClick={() => setPage(pageNum)}
      disabled={currentPage === pageNum}
      className={`h-8 w-8 overflow-ellipsis rounded-full text-xs duration-300 sm:h-10 sm:w-10 sm:text-sm ${
        currentPage === pageNum
          ? "bg-purple-600 text-slate-300 dark:bg-purple-300 dark:text-slate-800"
          : "border-2 border-purple-400 text-slate-800 hover:bg-purple-400 dark:text-slate-300 hover:dark:text-slate-800"
      }`}
    >
      {pageNum}
    </button>
  );

  let arr: number[] = [];

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
