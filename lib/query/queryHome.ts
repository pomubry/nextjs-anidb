import request from "graphql-request";
import { graphql } from "../gql";
import type { ServerHomeQuery } from "../types";

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

export async function fetchHome(variables: ServerHomeQuery) {
  try {
    const data = await request("https://graphql.anilist.co", queryHomePage, {
      perPage: 10,
      ...variables,
    });
    return { data, variables };
  } catch (error) {
    console.error(error);
    return { error: true };
  }
}
