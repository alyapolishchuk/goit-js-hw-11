const gallery = document.querySelector('.gallery');

export function createMarkup(array) {
  const markup = array
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) => {
        return `<div class="gallery__item">
                  <div class="img">
                  <a class="gallery__link" href="${largeImageURL}">
                    <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy"/>
                    </a>
                    <div class="item-description">
                      <p class="description">
                        <b>Likes :</b> ${likes}
                      </p>
                      <p class="description">
                        <b>Views :</b> ${views}
                      </p>
                      <p class="description">
                        <b>Comments :</b>${comments}
                      </p>
                      <p class="description">
                        <b>Downloads :</b> ${downloads}
                      </p>
                    </div>
               </div>
            </div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('afterbegin', markup);
}

// <div class="photo-card">
//   <img src="" alt="" loading="lazy" />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>;