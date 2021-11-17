import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/?key=24239830-4925f78f241d3381731e9c8cb';

export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhotos() {
    const url = `${BASE_URL}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&page=${this.page}`;
    this.page += 1;
    return axios.get(url);

    // const resolve = await fetch(url);
    // const data = await resolve.json();
    // return data;
    // }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}
