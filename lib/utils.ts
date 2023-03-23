import { useRouter } from "next/router";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export const getEntries = <T extends object>(obj: T) =>
  Object.entries(obj) as Entries<T>;

export interface QueryHandlerType {
  cmd: "PREVIOUS" | "NEXT";
  query: "cp" | "sp";
  currentPage: number;
}

export const useVAPageQuery = () => {
  const router = useRouter();

  const handleQuery = ({ cmd, query, currentPage }: QueryHandlerType) => {
    const { id, ...restQueries } = router.query;
    router.push(
      {
        pathname: `/va/${id}`,
        query: {
          ...restQueries,
          [query]: cmd === "NEXT" ? currentPage + 1 : currentPage - 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  return handleQuery;
};
