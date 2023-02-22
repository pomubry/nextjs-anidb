import request from "graphql-request";
import { graphql } from "../gql";
import { QueryHomePageQueryVariables } from "../gql/graphql";

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
    ...CardImageFragment
    ...CardDescFragment
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

export const fetchHome = async (
  variables: QueryHomePageQueryVariables = {}
) => {
  const data = await request(
    "https://graphql.anilist.co",
    queryHomePage,
    variables
  );
  return { data, variables };
};
