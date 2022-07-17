import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSearchResults = async () => {
    const { data } = await axios.get('https://bfhldevapigw.healthrx.co.in/labs/v1/admin/provider');
    console.log('api',data)
    return data;
};

const useSearchResults = () => useQuery('posts', fetchSearchResults);

export default useSearchResults;