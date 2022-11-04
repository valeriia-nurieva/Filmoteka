import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = 'd9d1e4a74b16060862fb47c08a2dac20';
const BASE_URL = 'https://api.themoviedb.org/3/';

export default class FetchFilms {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
  }

  /////Тренди
  async getTrendFilms() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,

      language: 'en-US',
      page: this.page,
      include_adult: true, /// контент для дорослих и тд
    });
    const { data } = await axios.get(
      `${BASE_URL}trending/movie/day?${searchParams}`
    );

    return data;
  }

  async getSetFilms() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,

      language: 'en-US',
      page: this.page,
      include_adult: true, /// контент для дорослих и тд
    });
    const { data } = await axios.get(
      `${BASE_URL}/movie/popular?${searchParams}`
    );

    return data;
  }
  /////пошук фильма
  async getFilmsByName() {
    const searchParams = new URLSearchParams({
      api_key: API_KEY,
      query: this.searchQuery,
      language: 'en-US',
      page: this.page,
      include_adult: false, /// контент для дорослих и тд
    });
    const { data } = await axios.get(`${BASE_URL}search/movie?${searchParams}`);
    return data;
  }
  ////Посилання на документацію для запиту повної інформації про кінофільм для сторінки кінофільму:
  async getFilmDetails(id) {
    try {
       const searchParams = new URLSearchParams({
         api_key: API_KEY,
         
         language: 'en-US',
         page: this.page,
         include_adult: true, /// контент для дорослих и тд
       });
      const url = `${BASE_URL}movie/${id}?${searchParams}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      Notiflix.Notify.failure('Oops, an error occurred');
    }
  }
  ////Посилання на документацію для запиту повної інформації про можливий трейлер на YouTube:
  async getFilmVideo(id) {
    try {
       const searchParams = new URLSearchParams({
         api_key: API_KEY,

         language: 'en-US',
         page: this.page,
         include_adult: true, /// контент для дорослих и тд
       });
      const url = `${BASE_URL}movie/${id}/videos?${searchParams}`;
      const { data } = await axios.get(url);
      return data;
    } catch (error) {
      Notiflix.Notify.failure('Oops, an error occurred');
    }
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  get query() {
    return this.searchQuery;
  }
  set pages(newQuery) {
    this.page = newQuery;
  }

  get pages() {
    return this.page;
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }
}
