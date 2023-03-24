import request from "graphql-request";
import { z } from "zod";
import { graphql } from "../gql";

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

export const staffSchema = z.object({
  id: z.coerce.number().positive(),
  cp: z.coerce
    .number()
    .positive()
    .catch((e) => {
      if (Array.isArray(e.input)) {
        return z.coerce.number().catch(1).parse(e.input[0]);
      } else {
        return 1;
      }
    }),
  sp: z.coerce
    .number()
    .positive()
    .catch((e) => {
      if (Array.isArray(e.input)) {
        return z.coerce.number().catch(1).parse(e.input[0]);
      } else {
        return 1;
      }
    }),
});

export type staffSchemaType = z.infer<typeof staffSchema>;

export const cleanStaffQuery = (query: staffSchemaType) => ({
  ...(query.cp > 1 && { cp: query.cp }),
  ...(query.sp > 1 && { sp: query.sp }),
});

export const fetchStaff = async (query: staffSchemaType) => {
  const data = await request("https://graphql.anilist.co", queryStaff, {
    id: query.id,
    characterPage: query.cp,
    staffPage: query.sp,
    sort: "START_DATE_DESC",
  });
  return data.Staff;
};
