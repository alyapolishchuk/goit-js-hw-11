import Notiflix from 'notiflix';
import axios from 'axios';

export default function fetchImages(value, page) {
  return axios({
    url: `https://pixabay.com/api/`,
    params: {
      key: '28348938-0384dcc8789dbce7d9ed883a2',
      q: value,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });
}