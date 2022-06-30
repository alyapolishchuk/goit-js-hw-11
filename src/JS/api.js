import axios from 'axios';

export default function fetchImages(value, page) {
  return axios({
    url: `https://pixabay.com/api/`,
    params: {
      key: '28351451-92068ca5a052609c75a292b60',
      q: value,
      orientation: 'horizontal',
      image_type: 'photo',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  });
}