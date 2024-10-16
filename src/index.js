import { getImages } from '../services/API-service';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const error = document.querySelector('.error');
const alert = document.querySelector('.alert');
const endOfCollection = document.querySelector('.collectionEnd');

form.addEventListener('submit', onFormSubmit);
loadMore.addEventListener('click', onLoadMoreClick);

let value = '';
let limit = 15;
let page = 1;

function onFormSubmit(evt) {
  evt.preventDefault();

  value = evt.currentTarget.elements.searchQuery.value;
  if (!value) {
    alert.textContent = 'Enter something';
    setTimeout(() => {
      alert.textContent = '';
    }, 3000);
    return;
  }
  page = 1;
  getImages(value, page, limit)
    .then(({ hits, totalHits }) => {
      if (hits.length === 0) {
        loadMore.hidden = true;
        error.textContent =
          'Sorry, there are no images matching your search query. Please try again.';
        setTimeout(() => {
          error.textContent = '';
        }, 3000);
      }

      if (hits.length < totalHits) {
        loadMore.hidden = false;
      }
      clearMarkup();
      // console.log('Before formSubmit', page);
      renderGallery(hits);

      if (hits.length === totalHits && hits.length !== 0) {
        endOfCollection.textContent =
          "We're sorry, but you've reached the end of search results.";
      }
      page += 1;
      // console.log('onFormSubmit', page);
    })
    .catch(err => console.log(err))
    .finally(() => form.reset());
}

function onLoadMoreClick() {
  getImages(value, page, limit)
    .then(({ hits }) => {
      if (hits.length < limit) {
        loadMore.hidden = true;
        endOfCollection.textContent =
          "We're sorry, but you've reached the end of search results.";
      }
      page += 1;
      renderGallery(hits);
      // console.log('onLoad', page);
    })
    .catch(err => console.log(err));
}

function renderGallery(data) {
  const markup = data
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
        return `
  <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`;
      }
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  gallery.innerHTML = '';
  endOfCollection.textContent = '';
}
