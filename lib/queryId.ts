const query = `query ($id: Int) {
      Media (id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        averageScore
        bannerImage
        characters(sort:FAVOURITES_DESC) {
          edges {
            node {
              image {
                large
              }
              name {
                full
              }
            }
            role
            voiceActors(language:JAPANESE) {
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
        recommendations(sort:RATING_DESC) {
          nodes{
            mediaRecommendation{
              id
              title{
                romaji
              }
              coverImage {
                extraLarge
              }
            }
          }
        }
        relations {
          edges{
            relationType(version:2)
          }
          nodes{
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
        season
        seasonYear
        source
    		staff {
          edges{
            role
            node {
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
        stats{
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
      }
    }`;

const queryId = (id: number) => {
  const variables = { id };
  return { query, variables };
};

export default queryId;
