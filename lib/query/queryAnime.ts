import request from "graphql-request";
import { graphql } from "../gql";

const queryAnime = graphql(`
  query queryAnime($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      idMal
      title {
        romaji
        english
        native
      }
      averageScore
      bannerImage
      characters(sort: RELEVANCE) {
        edges {
          node {
            id
            image {
              large
            }
            name {
              full
            }
          }
          role
          voiceActors(language: JAPANESE) {
            id
            image {
              large
            }
            name {
              full
            }
          }
        }
      }
      coverImage {
        extraLarge
        color
      }
      description
      duration
      endDate {
        year
        month
        day
      }
      episodes
      externalLinks {
        site
        url
      }
      favourites
      format
      genres
      meanScore
      nextAiringEpisode {
        id
      }
      popularity
      rankings {
        rank
        type
        year
        season
        allTime
        context
      }
      recommendations(sort: RATING_DESC) {
        nodes {
          mediaRecommendation {
            id
            title {
              romaji
            }
            coverImage {
              extraLarge
            }
          }
        }
      }
      relations {
        edges {
          id
          relationType(version: 2)
          node {
            id
            title {
              romaji
            }
            format
            status
            coverImage {
              extraLarge
            }
          }
        }
      }
      season
      seasonYear
      source
      staff {
        edges {
          role
          node {
            id
            name {
              full
            }
            image {
              large
            }
          }
        }
      }
      startDate {
        year
        month
        day
      }
      stats {
        statusDistribution {
          status
          amount
        }
      }
      status
      streamingEpisodes {
        title
        thumbnail
        url
      }
      studios {
        nodes {
          id
          name
          isAnimationStudio
        }
      }
      synonyms
      tags {
        rank
        name
      }
      trailer {
        id
        site
      }
      ...CardHeadIdFragment
      ...LeftInfoFragment
      ...RightInfoFragment
    }
  }
`);

export const CardHeadIdFragment = graphql(`
  fragment CardHeadIdFragment on Media {
    id
    title {
      romaji
    }
    bannerImage
    coverImage {
      extraLarge
    }
    description
  }
`);

// LeftInfo

export const LeftInfoFragment = graphql(`
  fragment LeftInfoFragment on Media {
    id
    externalLinks {
      id
      ...StreamLinksFragment
    }
    rankings {
      id
      ...RankingsFragment
    }
    tags {
      id
      ...TagsFragment
    }
    ...DataFragment
  }
`);

export const RankingsFragment = graphql(`
  fragment RankingsFragment on MediaRank {
    id
    allTime
    context
    rank
    season
    type
    year
  }
`);

export const DataFragment = graphql(`
  fragment DataFragment on Media {
    averageScore
    duration
    episodes
    endDate {
      year
      month
      day
    }
    favourites
    format
    genres
    meanScore
    popularity
    season
    seasonYear
    source
    status
    startDate {
      year
      month
      day
    }
    studios {
      nodes {
        id
        name
        isAnimationStudio
      }
    }
    synonyms
    title {
      english
      native
      romaji
    }
  }
`);

export const TagsFragment = graphql(`
  fragment TagsFragment on MediaTag {
    name
    rank
  }
`);

export const StreamLinksFragment = graphql(`
  fragment StreamLinksFragment on MediaExternalLink {
    site
    url
  }
`);

// RightInfo
export const RightInfoFragment = graphql(`
  fragment RightInfoFragment on Media {
    idMal
    characters(sort: RELEVANCE) {
      edges {
        id
      }
      ...CharactersFragment
    }
    recommendations(sort: RATING_DESC) {
      nodes {
        id
      }
      ...RecommendationsFragment
    }
    relations {
      edges {
        id
      }
      ...RelationsFragment
    }
    staff {
      edges {
        id
      }
      ...StaffFragment
    }
    stats {
      statusDistribution {
        status
      }
      ...StatsDistributionFragment
    }
    streamingEpisodes {
      url
      title
      ...StreamingEpisodesFragment
    }
    trailer {
      id
      site
    }
  }
`);

export const RelationsFragment = graphql(`
  fragment RelationsFragment on MediaConnection {
    edges {
      id
      relationType(version: 2)
      node {
        id
        title {
          romaji
        }
        format
        status
        coverImage {
          extraLarge
        }
      }
    }
  }
`);

export const CharactersFragment = graphql(`
  fragment CharactersFragment on CharacterConnection {
    edges {
      id
      node {
        id
        image {
          large
        }
        name {
          full
        }
      }
      role
      voiceActors(language: JAPANESE) {
        id
        image {
          large
        }
        name {
          full
        }
      }
    }
  }
`);

export const StaffFragment = graphql(`
  fragment StaffFragment on StaffConnection {
    edges {
      id
      role
      node {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
  }
`);

export const StatsDistributionFragment = graphql(`
  fragment StatsDistributionFragment on MediaStats {
    statusDistribution {
      status
      amount
    }
  }
`);

export const StreamingEpisodesFragment = graphql(`
  fragment StreamingEpisodesFragment on MediaStreamingEpisode {
    title
    thumbnail
    url
  }
`);

export const RecommendationsFragment = graphql(`
  fragment RecommendationsFragment on RecommendationConnection {
    nodes {
      mediaRecommendation {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
        }
      }
    }
  }
`);

export const fetchAnime = async (id: number) => {
  const data = await request("https://graphql.anilist.co", queryAnime, { id });
  return { anime: data.Media };
};
