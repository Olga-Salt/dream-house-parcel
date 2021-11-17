import './css/styles.css';
import PixabayApiService from './js/pixabay-api';
import LoadMoreBtn from './js/components/load-more-btn';
import createPhotosMurkup from './js/create-photos-murkup';
import axios from 'axios';
import { Notify } from 'notiflix';

const formRef = document.querySelector('.search-form');
const cardContainer = document.querySelector('.gallery');

// создать функцию которая ходит на api за фотками. сделать класс
// написать функцию рендера разметки карточек
// подключить либу axios
// написать класс кнопки загрузить еще
// добавить нотификашки

const pixabayApiService = new PixabayApiService();

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
    return Notify.info('Введите что-то :)');
  }

  loadMoreBtn.show();
  pixabayApiService.resetPage();
  clearPhotosContainer();

  fetchPhotos();
}

function fetchPhotos() {
  loadMoreBtn.disable();

  pixabayApiService
    .fetchPhotos()
    .then(photos => {
      renderPhotoCards(photos.data.hits);
      loadMoreBtn.enable();
    })
    .catch(error => {
      console.log('error');
    });
}

function renderPhotoCards(photos) {
  console.log(photos);
  if (photos.length === 0) {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }
  cardContainer.insertAdjacentHTML('beforeend', createPhotosMurkup(photos));
}

function clearPhotosContainer() {
  cardContainer.innerHTML = '';
}
