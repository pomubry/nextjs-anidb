import request from "graphql-request";
import { graphql } from "../gql";
import type { staffSchemaType } from "../types";

const queryStaff = graphql(`
  query queryStaff(
    $id: Int
    $sort: [MediaSort]
    $characterPage: Int
    $staffPage: Int
  ) {
    Staff(id: $id) {
      ...VAHeaderFragment
      id
      description
      name {
        full
      }
      characterMedia(page: $characterPage, sort: $sort) {
        ...VACharactersFragment
      }
      staffMedia(page: $staffPage, sort: $sort) {
        ...VAStaffRolesFragment
      }
    }
  }
`);

export const VAHeaderFragment = graphql(`
  fragment VAHeaderFragment on Staff {
    age
    bloodType
    dateOfBirth {
      year
      month
      day
    }
    dateOfDeath {
      year
      month
      day
    }
    description
    gender
    homeTown
    image {
      large
    }
    name {
      full
      native
      alternative
    }
    yearsActive
  }
`);

export const VACharactersFragment = graphql(`
  fragment VACharactersFragment on MediaConnection {
    pageInfo {
      total
      currentPage
      hasNextPage
    }
    edges {
      ...CharacterEdgeFragment
      id
      node {
        startDate {
          year
        }
      }
    }
  }
`);

export const VAStaffRolesFragment = graphql(`
  fragment VAStaffRolesFragment on MediaConnection {
    pageInfo {
      total
      currentPage
      hasNextPage
    }
    edges {
      ...RoleEdgeFragment
      id
      node {
        startDate {
          year
        }
      }
    }
  }
`);

export const CharacterEdgeFragment = graphql(`
  fragment CharacterEdgeFragment on MediaEdge {
    id
    characterRole
    characters {
      image {
        large
      }
      name {
        full
      }
    }
    node {
      id
      coverImage {
        large
      }
      title {
        romaji
      }
      type
    }
  }
`);

export const RoleEdgeFragment = graphql(`
  fragment RoleEdgeFragment on MediaEdge {
    node {
      id
      coverImage {
        large
      }
      title {
        romaji
      }
      type
    }
    staffRole
  }
`);

export async function fetchStaff(query: staffSchemaType) {
  const data = await request("https://graphql.anilist.co", queryStaff, {
    id: query.id,
    characterPage: query.cp,
    staffPage: query.sp,
    sort: "START_DATE_DESC",
  });
  return data.Staff;
}
