import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createMarkup } from './js/create-markup';

import { Loading } from 'notiflix/build/notiflix-loading-aio';
const loadingParams = {
  svgColor: '#FF6B08',
};

const tmdb = new TmdbApi();

initPage();

async function initPage() {
  try {
    Loading.pulse(loadingParams);
    const { results } = await tmdb.getTrendingMovies();
    console.log(results);
     const markup= createMarkup(results);
    refs.listHome.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error.message);
  } finally {
    Loading.remove();
  }
}

import FetchFilms from './js/fetchAPI';
// import { createMarkup } from './js/create-markup';
const onSearchForm = document.querySelector('#search-form');
// const filmListHome = document.querySelector('.film-list-home-js');
onSearchForm.addEventListener('submit', onSearch);
const fetch = new FetchFilms();

// console.log(onSearchForm);
async function onSearch(e) {
  e.preventDefault();
  // console.log(e.currentTarget.elements.searchQuery.value);
  fetch.searchQuery = e.currentTarget.elements.searchQuery.value;

  const {results} = await fetch.getFilmsByName();
  console.log(results);
   const markup = createMarkup(results);
   refs.listHome.insertAdjacentHTML('beforeend', markup);
//  





  // refs.listHome.innerHTML = '';

  createMarkup(results);


}
