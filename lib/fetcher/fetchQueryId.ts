import axios from "axios";
import errorLogger from "./errorLogger";
import { FetchQueryIdReturn } from "../interface/interface";
import { IQueryId } from "../interface/IQueryId";
import queryId from "../query/queryId";

const fetchQueryId = async (id: number): Promise<FetchQueryIdReturn> => {
  try {
    const { data } = await axios.post<IQueryId>(
      "https://graphql.anilist.co",
      queryId(id)
    );
    return { media: data.data.Media, error: false };
  } catch (error) {
    errorLogger(error);
    return { error: true };
  }
};

export default fetchQueryId;
