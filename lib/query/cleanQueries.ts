import { ParsedUrlQuery } from "querystring";
import { getEntries } from "../utils";
import { MediaSeason, QueryHomePageQueryVariables } from "../gql/graphql";

const getCurrentSeason = () => {
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

const pageQuery = (page: string) => {
  let res = Number.isInteger(+page) && +page > 0 ? +page : 1;
  return res;
};

export const seasonQuery = (season: string) => {
  switch (season) {
    case "WINTER":
    case "SPRING":
    case "SUMMER":
    case "FALL":
      return season;
    default:
      return getCurrentSeason();
  }
};

export const seasonYearQuery = (seasonYear: string) => {
  const num = Number.isInteger(+seasonYear) ? +seasonYear : 0;
  const currentYear = new Date().getFullYear();
  return num >= 1940 && num <= currentYear + 1 ? num : currentYear;
};

interface CleanHomePageQueryVariables
  extends Omit<
    QueryHomePageQueryVariables,
    "search" | "season" | "seasonYear"
  > {
  search?: string;
  season?: MediaSeason | "ALL";
  seasonYear?: number | "ALL";
}

const cleanQueries = (query: ParsedUrlQuery | QueryHomePageQueryVariables) => {
  // for fetching API, query key
  let variables: QueryHomePageQueryVariables = {
    page: 1,
    perPage: 10,
    season: seasonQuery("FOO BAR"), // Default to current season
    seasonYear: seasonYearQuery("FOO BAR"), // Default to current year
  };

  // for router queries
  let cleanVariables: CleanHomePageQueryVariables = {};

  // change variables according to query
  getEntries(query).forEach((q) => {
    if (q !== undefined) {
      const [key, value] = q;
      switch (key) {
        case "page":
          if (typeof value === "string" || typeof value === "number") {
            variables["page"] = pageQuery(value.toString());
          } else if (Array.isArray(value)) {
            variables["page"] = pageQuery(value[0]);
          }

          if (variables["page"] !== 1)
            cleanVariables["page"] = variables["page"];

          break;

        case "season":
          if (typeof value === "string" && value === "ALL") {
            delete variables["season"];
            cleanVariables["season"] = "ALL";
          } else if (typeof value === "string") {
            variables["season"] = seasonQuery(value);
          } else if (Array.isArray(value)) {
            variables["season"] = seasonQuery(value[0]);
          } else if (typeof value === undefined) {
            variables["season"] = seasonQuery("");
          }

          if (variables["season"])
            cleanVariables["season"] = variables["season"];

          break;

        case "seasonYear":
          if (typeof value === "string" && value === "ALL") {
            delete variables["seasonYear"];
            cleanVariables["seasonYear"] = "ALL";
          } else if (typeof value === "string" || typeof value === "number") {
            variables["seasonYear"] = seasonYearQuery(value.toString());
          } else if (Array.isArray(value)) {
            variables["seasonYear"] = seasonYearQuery(value[0]);
          } else if (typeof value === undefined) {
            variables["seasonYear"] = seasonYearQuery("");
          }

          if (variables["seasonYear"])
            cleanVariables["seasonYear"] = variables["seasonYear"];

          break;

        case "search":
          if (typeof value === "string" && value.length > 0) {
            variables["search"] = value;
          } else if (Array.isArray(value) && value[0].length > 0) {
            variables["search"] = value[0];
          }

          if (variables["search"])
            cleanVariables["search"] = variables["search"];

          break;
      }
    }
  });

  return {
    variables,
    cleanVariables,
  };
};

export default cleanQueries;
