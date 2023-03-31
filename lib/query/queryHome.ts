import request from "graphql-request";
import { z } from "zod";
import { graphql } from "../gql";

const queryHomePage = graphql(`
  query queryHomePage(
    $page: Int
    $seasonYear: Int
    $season: MediaSeason
    $search: String
    $perPage: Int
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      media(
        seasonYear: $seasonYear
        season: $season
        search: $search
        type: ANIME
        sort: TRENDING_DESC
        isAdult: false
      ) {
        id
        title {
          romaji
        }
        ...AnimeFragment
      }
    }
  }
`);

export const AnimeFragment = graphql(`
  fragment AnimeFragment on Media {
    ...CardImageFragment
    ...CardDescFragment
    id
    title {
      romaji
    }
    coverImage {
      extraLarge
      color
    }
    description
    episodes
    format
    genres
    nextAiringEpisode {
      id
    }
    season
    seasonYear
    studios(isMain: true) {
      edges {
        node {
          name
          isAnimationStudio
        }
      }
    }
    trending
  }
`);

export const CardImageFragment = graphql(`
  fragment CardImageFragment on Media {
    id
    title {
      romaji
    }
    coverImage {
      extraLarge
      color
    }
    studios(isMain: true) {
      edges {
        node {
          id
          name
          isAnimationStudio
        }
      }
    }
  }
`);

export const CardDescFragment = graphql(`
  fragment CardDescFragment on Media {
    id
    description
    episodes
    format
    genres
    season
    seasonYear
    trending
  }
`);

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

export const getCurrentYear = () => new Date().getFullYear();

const pageSchema = z.coerce.number().positive();
const seasonSchema = z.enum(["WINTER", "SPRING", "SUMMER", "FALL", "ALL"]);
const yearSchema = z.union([
  z.literal("ALL"),
  z.coerce
    .number()
    .min(1940)
    .max(getCurrentYear() + 1),
]);

export const homeSchema = z.object({
  pg: pageSchema.catch((e) => {
    if (Array.isArray(e.input)) {
      const res = (e.input as string[]).find(
        (input) => pageSchema.safeParse(input).success
      );
      return res ? +res : 1;
    } else {
      return 1;
    }
  }),
  ss: seasonSchema.catch((e) => {
    if (Array.isArray(e.input)) {
      const res = (e.input as string[]).find(
        (input) => seasonSchema.safeParse(input).success
      );
      return res ? seasonSchema.parse(res) : getCurrentSeason();
    } else {
      return getCurrentSeason();
    }
  }),
  yr: yearSchema.catch((e) => {
    if (Array.isArray(e.input)) {
      const res = (e.input as string[]).find(
        (input) => yearSchema.safeParse(input).success
      );
      return res ? +res : getCurrentYear();
    } else {
      return getCurrentYear();
    }
  }),
  sr: z.string().catch(""),
});

export type homeSchemaType = z.infer<typeof homeSchema>;

export const cleanHomeQuery = ({ pg, sr, ...restQuery }: homeSchemaType) => ({
  ...(pg > 1 && { pg }),
  ...(sr !== "" && { sr }),
  ...restQuery,
});

export const fetchHome = async (variables: homeSchemaType) => {
  const data = await request("https://graphql.anilist.co", queryHomePage, {
    perPage: 10,
    ...(variables.pg > 1 && { page: variables.pg }),
    ...(variables.ss !== "ALL" && { season: variables.ss }),
    ...(variables.yr !== "ALL" && { seasonYear: variables.yr }),
    ...(variables.sr !== "" && { search: variables.sr }),
  });
  return { data, variables };
};
