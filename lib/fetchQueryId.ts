import axios from "axios";
import { IErrorClause } from "./interface";
import { IQueryId } from "./IQueryId";
import queryId from "./queryIdts";

const fetchQueryId = async (id: number) => {
  try {
    const { data } = await axios.post<IQueryId>(
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
