// import './css/styles.css';
import './sass/main.scss';
import PixabayApiService from './js/pixabay-api';
import LoadMoreBtn from './js/components/load-more-btn';
import createPhotosMurkup from './js/create-photos-murkup';
// import axios from 'axios';
import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const formRef = document.querySelector('.search-form');
const cardContainer = document.querySelector('.gallery');
const totalHits = 500;
let lightbox = new SimpleLightbox('.gallery a');

// let lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// написать функцию которая ходит на api за фотками. сделать класс
// написать функцию рендера разметки карточек
// подключить либу axios
// написать класс кнопки загрузить еще
// добавить нотификашки
// использовать asinc await

const pixabayApiService = new PixabayApiService();
let smoothScroll = false;
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

formRef.addEventListener('submit', onSearchSubmit);
loadMoreBtn.refs.button.addEventListener('click', fetchPhotos);

function onSearchSubmit(e) {
  e.preventDefault();
  pixabayApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (pixabayApiService.query === '') {
    loadMoreBtn.hide();
    clearPhotosContainer();
    return Notify.info('Введите что-то :)');
  }

  pixabayApiService.resetPage();
  clearPhotosContainer();

  fetchPhotos();
}

function fetchPhotos(e) {
  loadMoreBtn.hide();

  pixabayApiService
    .fetchPhotos()
    .then(photos => {
      renderPhotoCards(photos.data.hits);
      callLightBoxGallery();
      findTotalHits(photos.data.totalHits);
      loadMoreBtn.show();
      isEmptyPhotoArray(photos.data.hits);
      isEndPhotoArray();
    })
    .catch(error => {
      console.log('error');
    });
}

function renderPhotoCards(photos) {
  cardContainer.insertAdjacentHTML('beforeend', createPhotosMurkup(photos));
}

function clearPhotosContainer() {
  cardContainer.innerHTML = '';
}

function isEmptyPhotoArray(array) {
  if (array.length === 0) {
    loadMoreBtn.hide();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }
}

function isEndPhotoArray() {
  if (cardContainer.children.length >= totalHits) {
    loadMoreBtn.hide();
    Notify.failure("We're sorry, but you've reached the end of search results.");
  }
  if (cardContainer.children.length > 40) {
    addSmoothScroll();
  }
}

function findTotalHits(totalHits) {
  if (totalHits > 0) {
    return Notify.info(`Hooray! We found ${totalHits} images.`);
  }
}

function callLightBoxGallery() {
  let lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
}

function addSmoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
