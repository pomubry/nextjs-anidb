import { useState } from "react";
import { useRouter } from "next/router";
import { z } from "zod";
import { cleanStaffQuery, staffSchema } from "./query/queryVoiceActor";
import type { ClientHomeSearchParams } from "./types";

interface QueryHandlerType {
  cmd: "PREVIOUS" | "NEXT";
  query: "cp" | "sp";
  currentPage: number;
}

export const appThemeKey = "lighthalzen-tw-theme";

export function getAppTheme() {
  if (
    localStorage.getItem(appThemeKey) === "dark" ||
    (!(appThemeKey in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  } else {
    return "light";
  }
}

export function setDarkMode() {
  localStorage.setItem(appThemeKey, "dark");
  document.documentElement.classList.add("dark");
}

export function setLightMode() {
  localStorage.setItem(appThemeKey, "light");
  document.documentElement.classList.remove("dark");
}

export function useVAPageQuery() {
  const router = useRouter();

  function handleQuery({ cmd, query, currentPage }: QueryHandlerType) {
    const res = staffSchema.parse(router.query);
    res[query] = cmd === "NEXT" ? currentPage + 1 : currentPage - 1;

    const cleanQuery = cleanStaffQuery(res);

    router.push(
      {
        pathname: `/va/${res.id}`,
        query: cleanQuery,
      },
      undefined,
      { shallow: true, scroll: false },
    );
  }

  return handleQuery;
}

export function useExpander({ maxNumber }: { maxNumber: number }) {
  const [expanded, setExpanded] = useState(false);

  function handleExpand() {
    return setExpanded((prev) => !prev);
  }

  return {
    sliceEnd: expanded ? undefined : maxNumber,
    expanded,
    handleExpand,
  };
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getCurrentSeason() {
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
}

export function objToUrlSearchParams(query: URLSearchParams) {
  return "/?" + new URLSearchParams(query).toString();
}

/**
 * Remove keys with values of `undefined` or empty strings
 */
export function cleanClientHomeSearchParams(
  query: ClientHomeSearchParams,
): ClientHomeSearchParams {
  const copy = { ...query };

  for (const prop in copy) {
    const propTyped = prop as keyof typeof copy;
    const value = copy[propTyped];

    switch (typeof value) {
      case "undefined":
        delete copy[propTyped];
        break;
      case "string":
        if (value.length === 0) {
          delete copy[propTyped];
        }
        break;
      case "number":
        if (value === 1) {
          delete copy[propTyped];
        }
        break;
      default:
        break;
    }
  }

  return copy;
}

export function catchHandler<T extends z.ZodTypeAny>(
  data: {
    error: z.ZodError<unknown>;
    input: unknown;
  },
  schema: T,
) {
  if (Array.isArray(data.input)) {
    const match = data.input.find((item) => schema.safeParse(item).success);
    const matchParsed = schema.safeParse(match);
    return matchParsed.success ? (matchParsed.data as z.output<T>) : undefined;
  } else {
    return undefined;
  }
}

/**
 * Get variables to send to the graphql server
 */
export function getServerHomeQuery(variables: ClientHomeSearchParams) {
  const { pg, sr, ss, yr } = variables;
  const page = pg !== undefined && pg > 0 && pg;
  const search = sr !== undefined && sr.length > 0 && sr;
  const season =
    ss === "ALL" ? false : ss === undefined ? getCurrentSeason() : ss;
  const seasonYear =
    yr === "ALL" ? false : yr === undefined ? getCurrentYear() : yr;

  return {
    ...(page && { page }),
    ...(search && { search }),
    ...(season && { season }),
    ...(seasonYear && { seasonYear }),
  };
}
