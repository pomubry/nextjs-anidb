const queryId = (id) => {
  const query = `query ($id: Int) {
      Media (id: $id, type: ANIME) {
        id
        title {
          romaji
          english
          native
        }
        description
    		duration
        format
        episodes
    		status
        season
        seasonYear
        genres
        meanScore
        averageScore
        popularity
        favourites
        trending
        source
        bannerImage
        coverImage {
          extraLarge
          large
          medium
          color
        }
    		startDate {
    		  year
    		  month
    		  day
    		}
    		endDate {
    		  year
    		  month
    		  day
    		}
        studios {
          nodes {
            name
            isAnimationStudio
          }
        }
        nextAiringEpisode {
          id
        }
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
        rankings {
          rank
          type
          year
          season
          allTime
          context
        }
        synonyms
        tags {
          rank
          name
        }
        externalLinks {
          site
          url
        }
      }
    }`;

  const variables = { id };
  return { query, variables };
};

export default queryId;
