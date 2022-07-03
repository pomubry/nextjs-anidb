import axios from "axios";
import query from "./query";

const fetchQuery = async (page, season, seasonYear) => {
  try {
    let { data } = await axios.post(
      "https://graphql.anilist.co",
      query(page, season, seasonYear)
    );
    const { pageInfo, media } = data.data.Page;
    return { pageInfo, media };
  } catch (error) {
    return { error: true };
  }
};

export default fetchQuery;
