import axios from "axios";
import { IErrorClause, IFetchQueryId } from "./interface";
import queryId from "./queryIdts";

const fetchQueryId = async (id: number) => {
  try {
    const { data } = await axios.post<IFetchQueryId>(
      "https://graphql.anilist.co",
      queryId(id)
    );
    return { media: data.data.Media };
  } catch (error) {
    let err = error as IErrorClause;
    return { error: err };
  }
};

export default fetchQueryId;
