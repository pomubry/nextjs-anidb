import axios from 'axios';
import query from './query';

const fetchQuery = async (page) => {
  let { data } = await axios.post('https://graphql.anilist.co', query(page));
  return data;
};

export default fetchQuery;
