import axios from "axios";
import errorLogger from "./errorLogger";
import { FetchQueryReturn, IQueryCurrentSeason } from "./interface";
import { IFetchQuery } from "./IQuery";
import queryMany from "./queryMany";

const fetchQuery = async (
  queries: IQueryCurrentSeason
): Promise<FetchQueryReturn> => {
  try {
    const { query, variables } = queryMany(queries);
    let { data } = await axios.post<IFetchQuery>("https://graphql.anilist.co", {
      query,
      variables,
    });
    const { pageInfo, media } = data.data.Page;
    return { pageInfo, media, variables, error: false };
  } catch (error) {
    errorLogger(error);
    console.error("Error in fetchQuery");
    return { error: true };
  }
};

export default fetchQuery;
