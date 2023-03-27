import { useState } from "react";
import { useRouter } from "next/router";
import { cleanStaffQuery, staffSchema } from "./query/queryVoiceActor";

interface QueryHandlerType {
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

export const useExpander = ({ maxNumber }: { maxNumber: number }) => {
  const [expanded, setExpanded] = useState(false);
  const handleExpand = () => setExpanded((prev) => !prev);

  return {
    sliceEnd: expanded ? undefined : maxNumber,
    expanded,
    handleExpand,
  };
};
