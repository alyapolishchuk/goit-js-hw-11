import Notiflix from 'notiflix';
import fetchImages from './JS/api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const wrapper = document.querySelector('.gallery');
const target = document.querySelector('.target-guard');

// --------------------------------------------------------- //
const options = {
  root: null,
  rootMargin: '400px',
  threshold: 1.0,
};
const observer = new IntersectionObserver(generateImages, options);

form.addEventListener('submit', onSubmit);

let page = 1;
let searchOnInput = '';
// --------------------------------------------------------- //

function onSubmit(event) {
  event.preventDefault();
  searchOnInput = event.target.searchQuery.value;

  wrapper.innerHTML = '';
  observer.unobserve(target);

  if (!searchOnInput) {
    Notiflix.Notify.failure('Please, search any picture!');
    return;
  }
  fetchImages(searchOnInput, page).then(response => {
    if (!response.data.total) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else {
      createMarkup(response.data.hits);
      observer.observe(target);
    }
    Notiflix.Notify.success(`Hooray! We found ${response.data.total} images.`);
  });
}

// --------------------------------------------------------- //

function createMarkup(arr) {
  const imageList = arr
    .map(item => {
      return `
    <div class="photo-card"> 
      <a href="${item.largeImageURL}">
        <img  src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
      </a>
      <div class="info">
        <p class="info-item">
          <b>Likes: ${item.likes}</b>
        </p>
        <p class="info-item">
          <b>Views: ${item.views}</b>
        </p>
        <p class="info-item">
          <b>Comments: ${item.comments}</b>
        </p>
        <p class="info-item">
          <b>Downloads: ${item.downloads}</b>
        </p>
      </div>
    </div>`;
    })
    .join('');

  wrapper.insertAdjacentHTML('beforeend', imageList);

  const lightbox = new SimpleLightbox('.gallery a', {
    /* options */
  });
}

// --------------------------------------------------------- //

function generateImages(entries) {
  entries.forEach(entrie => {
    if (entrie.isIntersecting) {
      page += 1;
      fetchImages(searchOnInput, page).then(response => {
        if (response.data.hits.length === 0) {
          Notiflix.Notify.failure(
            `We're sorry, but you've reached the end of search results.`
          );
          return;
        }
        createMarkup(response.data.hits);
      });
    }
  });
}