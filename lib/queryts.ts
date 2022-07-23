import { IQuery, IVariables } from "./interface";

const query = ({
  getCurrentSeason,
  page = 1,
  season,
  seasonYear,
  search,
}: IQuery) => {
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
        isAdult:false
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

  let variables: IVariables = { page };

  const date = new Date();

  const isSeasonValid = (season: string) =>
    ["WINTER", "SPRING", "SUMMER", "FALL"].includes(season);

  const isSeasonYearValid = (seasonYear: number) =>
    seasonYear >= 1940 && seasonYear <= date.getFullYear() + 1;

  // Any invalid queries will be explicitly set to null & filter later before sending to API
  if (seasonYear && isSeasonYearValid(seasonYear))
    variables.seasonYear = seasonYear;
  if (season && !isSeasonValid(season)) variables.season = season;
  if (search) variables.search = search;

  // if `getCurrentSeason` is specified, override all other queries above
  if (getCurrentSeason) {
    switch (date.getMonth()) {
      case 0:
      case 1:
      case 2:
        variables.season = "WINTER";
        break;
      case 3:
      case 4:
      case 5:
        variables.season = "SPRING";
        break;
      case 6:
      case 7:
      case 8:
        variables.season = "SUMMER";
        break;
      default:
        variables.season = "FALL";
        break;
    }
    variables.seasonYear = date.getFullYear();
  }

  // validatedQueries will be taken by the app
  // variables will be sent to the API (null values were removed)
  // let validatedQueries = { page, season, seasonYear, search };

  // populate `variables` with non-null values
  //   for (const keys in validatedQueries) {
  //     if (validatedQueries[keys as keyof IVariables]) variables[keys as keyof IVariables] = validatedQueries[keys as keyof IVariables];
  //   }
  // if (validatedQueries.page) variables.page = validatedQueries.page;
  // if (validatedQueries.season) variables.season = validatedQueries.season;
  // if (validatedQueries.seasonYear)
  //   variables.seasonYear = validatedQueries.seasonYear;
  // if (validatedQueries.search) variables.search = validatedQueries.search;

  return {
    query,
    variables,
    // validatedQueries,
  };
};

export default query;
