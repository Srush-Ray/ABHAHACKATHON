import {useQuery} from 'react-query';
import axios from 'axios';

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
