const query = ({ getCurrentSeason, page, season, seasonYear, search }) => {
  let query = `query (
    $page: Int,
    $seasonYear: Int,
    $season: MediaSeason,
    $search:String,
  ) {
    Page (page: $page) {
      
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
        search:$search,
        type:ANIME,
        sort:POPULARITY_DESC
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
            }
          }
        }
        trending
        season
        seasonYear
        genres
        coverImage {
          extraLarge
          color
        }
      }
    }
  }`;

  const date = new Date();

  const isSeasonValid = (season) =>
    ["WINTER", "SPRING", "SUMMER", "FALL"].includes(season);

  const isSeasonYearValid = (seasonYear) =>
    seasonYear >= 1940 && seasonYear <= date.getFullYear() + 1;

  if (!page) {
    page = 1;
  }

  // Any invalid queries will be explicitly set to null & filter later before sending to API
  if (!isSeasonYearValid(seasonYear)) seasonYear = null;
  if (!isSeasonValid(season)) season = null;
  if (!search) search = null;

  // if `getCurrentSeason` is specified, override all other queries above
  if (getCurrentSeason) {
    switch (date.getMonth()) {
      case 0:
      case 1:
      case 2:
        season = "WINTER";
        break;
      case 3:
      case 4:
      case 5:
        season = "SPRING";
        break;
      case 6:
      case 7:
      case 8:
        season = "SUMMER";
        break;
      default:
        season = "FALL";
        break;
    }
    seasonYear = date.getFullYear();
  }

  // validatedQueries will be taken by the app
  // variables will be sent to the API (null values were removed)
  let validatedQueries = { page, season, seasonYear, search };
  let variables = {};

  // populate `variables` with non-null values
  for (const keys in validatedQueries) {
    if (validatedQueries[keys]) variables[keys] = validatedQueries[keys];
  }

  return {
    query,
    variables,
    validatedQueries,
  };
};

export default query;
