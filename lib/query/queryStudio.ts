import request from "graphql-request";
import { graphql } from "../gql";
import type { StudioQuerySchemaType } from "../types";

const queryStudio = graphql(`
  query queryStudio($id: Int, $pg: Int) {
    Studio(id: $id) {
      id
      name
      siteUrl
      media(sort: START_DATE_DESC, page: $pg) {
        pageInfo {
          total
          currentPage
          hasNextPage
        }
        nodes {
          ...AnimeWorkFragment
          id
          coverImage {
            large
          }
          title {
            romaji
          }
          startDate {
            year
            month
            day
          }
        }
      }
    }
  }
`);

export const AnimeWorkFragment = graphql(`
  fragment AnimeWorkFragment on Media {
    id
    coverImage {
      large
    }
    startDate {
      year
      month
      day
    }
    title {
      romaji
    }
    type
  }
`);

export async function fetchStudio(query: StudioQuerySchemaType) {
  const data = await request("https://graphql.anilist.co", queryStudio, query);
  return data.Studio;
}
