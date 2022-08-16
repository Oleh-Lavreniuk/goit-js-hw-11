import axios from 'axios';
export { fetchImages };

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29268456-6bc69d63a2108bddafd6e85b4';
const FILTER_RESPONSE =
  'image_type=photo&orientation=horizontal&safesearch=true';

const fetchImages = async (query, page, perPage) => {
  const response = await axios.get(
    `?key=${API_KEY}&q=${query}&page=${page}&per_page=${perPage}&${FILTER_RESPONSE}`
  ).data;

  return response;
};
