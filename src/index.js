import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createMarkup } from './js/create-markup';

import './js/btn-back-to-top';

import './js/modal-main';
import FetchFilms from './js/FetchApi';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const fetch = new FetchFilms();



console.log();
const loadingParams = {
    svgColor: '#FF6B08',
};

const tmdb = new TmdbApi();

initPage();

async function initPage() {
    try {
        Loading.pulse(loadingParams);
      const { results } = await fetch.getTrendFilms();
  
      createMarkup(results);
      
     
  } catch (error) {
    console.log(error.message);
  } finally {
      Loading.remove();
  }
}



import onSearch from './js/search';