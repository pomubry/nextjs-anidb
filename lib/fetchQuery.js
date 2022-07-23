import axios from "axios";
import queryMethod from "./query";

const fetchQuery = async (queries) => {
  try {
    const { query, variables, validatedQueries } = queryMethod(queries);
    let { data } = await axios.post("https://graphql.anilist.co", {
      query,
      variables,
    });
    const { pageInfo, media } = data.data.Page;
    return { pageInfo, media, validatedQueries };
  } catch (error) {
    console.error("Error in fetchQuery:", error);
    return { error: error.message };
  }
};

export default fetchQuery;
