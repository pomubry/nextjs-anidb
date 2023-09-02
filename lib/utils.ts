import { useState } from "react";
import { useRouter } from "next/router";
import { cleanStaffQuery, staffSchema } from "./query/queryVoiceActor";
import type { HomeQuery } from "./types";

interface QueryHandlerType {
  cmd: "PREVIOUS" | "NEXT";
  query: "cp" | "sp";
  currentPage: number;
}

export const appThemeKey = "nextani-tw-theme";

export const getAppTheme = () => {
  if (
    localStorage.getItem(appThemeKey) === "dark" ||
    (!(appThemeKey in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  } else {
    return "light";
  }
};

export const setDarkMode = () => {
  localStorage.setItem(appThemeKey, "dark");
  document.documentElement.classList.add("dark");
};

export const setLightMode = () => {
  localStorage.setItem(appThemeKey, "light");
  document.documentElement.classList.remove("dark");
};

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

export const getCurrentYear = () => new Date().getFullYear();

export const getCurrentSeason = () => {
  switch (new Date().getMonth()) {
    case 0:
    case 1:
    case 2:
      return "WINTER";
    case 3:
    case 4:
    case 5:
      return "SPRING";
    case 6:
    case 7:
    case 8:
      return "SUMMER";
    default:
      return "FALL";
  }
};

export const cleanHomeQuery = ({ pg, sr, ...restQuery }: HomeQuery) => ({
  ...(pg > 1 && { pg }),
  ...(sr !== "" && { sr }),
  ...restQuery,
});
