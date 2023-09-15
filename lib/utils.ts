import { z } from "zod";
import type {
  ClientHomeSearchParams,
  StudioQuerySchemaType,
  staffSchemaType,
} from "./types";

// ===== Theme

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

// ===== Homepage

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
  const newSearchParams = "?" + new URLSearchParams(query).toString();
  return newSearchParams === "?" ? "" : newSearchParams;
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

// ===== Studio

export function cleanStudioQuery(query: StudioQuerySchemaType) {
  return {
    ...(query.pg > 1 && { pg: query.pg }),
  };
}

// ===== VA

export function cleanStaffQuery(query: staffSchemaType) {
  return {
    ...(query.cp > 1 && { cp: query.cp }),
    ...(query.sp > 1 && { sp: query.sp }),
  };
}
