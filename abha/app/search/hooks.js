import {useQuery} from 'react-query';
import axios from 'axios';

// const fetchSearchResults = async () => {
//     const { data } = await axios.get('https://bfhldevapigw.healthrx.co.in/labs/v1/admin/provider');
//     return data;
// };

export const fetchSearchResultsQuery = async data => {
  return axios.post(
    'https://bfhldevapigw.healthrx.co.in/uhi-intelligent-search/send-suggestion',
    data,
  );
};
export const fetchSelectedResultsQuery = async data => {
  return axios.post(
    'https://bfhldevapigw.healthrx.co.in/uhi-intelligent-search/send-request',
    data,
  );
};

// const useSearchResults = () => useQuery('posts', ()=>fetchSearchResultsQuery());

// export default fetchSearchResultsQuery;
