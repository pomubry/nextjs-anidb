import axios from "axios";
import { IErrorClause, IQueryCurrentSeason } from "./interface";
import { IFetchQuery } from "./IQuery";
import queryMethod from "./queryts";

const fetchQuery = async (queries: IQueryCurrentSeason) => {
  try {
    const { query, variables } = queryMethod(queries);
    let { data } = await axios.post<IFetchQuery>("https://graphql.anilist.co", {
      query,
      variables,
    });
    const { pageInfo, media } = data.data.Page;
    return { pageInfo, media, variables };
  } catch (error) {
    let err = error as IErrorClause;
    return { error: err };
  }
};

export default fetchQuery;
