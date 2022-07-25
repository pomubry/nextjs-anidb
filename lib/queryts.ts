import { IQueryCurrentSeason, IVariables } from "./interface";

const query = ({
  getCurrentSeason,
  page = 1,
  season,
  seasonYear,
  search,
}: IQueryCurrentSeason) => {
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
        sort:TRENDING_DESC
        isAdult:false
      ) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
          color
        }
        description
        episodes
        format
        genres
        nextAiringEpisode {
          id
        }
        season
        seasonYear
        studios(isMain:true) {
          edges {
            node{
              name
            }
          }
        }
        trending
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

  return {
    query,
    variables,
  };
};

export default query;
