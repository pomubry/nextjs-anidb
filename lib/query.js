const query = (page = 1) => {
  let query = `query (
    $page: Int,
    $perPage: Int,
    $seasonYear: Int,
    $season: MediaSeason,
  ) {
    Page (page: $page, perPage: $perPage) {
      
      pageInfo {
        total
        perPage
        currentPage
        lastPage
        hasNextPage
      }
      
      media (
        seasonYear:$seasonYear,
        season:$season,
        type:ANIME
        sort:TRENDING_DESC
      ) {
        id
        title {
          romaji
        }
        description
        episodes
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
      }
      
    }
  }`;

  let data = new Date();
  let seasonYear = data.getFullYear();
  let monthNum = data.getMonth();
  let season = '';

  switch (monthNum) {
    case 0:
    case 1:
    case 2:
      season = 'WINTER';
      break;
    case 3:
    case 4:
    case 5:
      season = 'SPRING';
      break;
    case 6:
    case 7:
    case 8:
      season = 'SUMMER';
      break;
    default:
      season = 'FALL';
      break;
  }

  let variables = {
    seasonYear,
    season,
    page,
    perPage: 20,
  };

  return {
    query,
    variables,
  };
};

export default query;
