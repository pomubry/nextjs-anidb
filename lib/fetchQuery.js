import axios from 'axios';
import query from './query';

const fetchQuery = async (page, season, seasonYear) => {
  let { data } = await axios.post(
    'https://graphql.anilist.co',
    query(page, season, seasonYear)
  );

  return data;
};

export default fetchQuery;
