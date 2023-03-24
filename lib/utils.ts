import { useRouter } from "next/router";
import { cleanStaffQuery, staffSchema } from "./query/queryVoiceActor";

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
    const res = staffSchema.parse(router.query);
    res[query] = cmd === "NEXT" ? currentPage + 1 : currentPage - 1;

    const cleanQuery = cleanStaffQuery(res);

    router.push(
      {
        pathname: `/va/${res.id}`,
        query: cleanQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return handleQuery;
};
