import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '28351451-92068ca5a052609c75a292b60';

export function fetchImages(q, page) {
  const parametrs = new URLSearchParams({
    key: API_KEY,
    q,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
  });
  return fetch(`${BASE_URL}${parametrs}`).then(response => {
    return response.json();
  });
}
