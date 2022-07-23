import axios from "axios";
import { IErrorClause, IFetchQuery, IQuery } from "./interface";
import queryMethod from "./queryts";

const fetchQuery = async (queries: IQuery) => {
  try {
    const { query, variables } = queryMethod(queries);
    let { data } = await axios.post<IFetchQuery>("https://graphql.anilist.co", {
      query,
      variables,
    });
    console.log(data);
    const { pageInfo, media } = data.data.Page;
    return { pageInfo, media, variables };
  } catch (error) {
    let err = error as IErrorClause;
    return { error: err };
  }
};

export default fetchQuery;
