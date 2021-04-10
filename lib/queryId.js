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
        episodes
    		duration
    		status
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
        meanScore
        averageScore
        popularity
        favourites
        studios(isMain:true) {
          edges {
            node{
              name
              isAnimationStudio
            }
          }
        }
        nextAiringEpisode {
          id
        }
        format
        studios(isMain:true) {
          edges {
            node{
              name
              isAnimationStudio
            }
          }
        }
        trending
        season
        seasonYear
        genres
        coverImage {
          extraLarge
          large
          medium
          color
        }
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
      }
    }`;

  const variables = { id };
  return { query, variables };
};

export default queryId;
