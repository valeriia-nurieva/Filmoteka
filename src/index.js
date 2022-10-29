import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createMarkup } from './js/create-markup';
import  { addBackToTop } from './js/btn-back-to-top'

import { Loading } from 'notiflix/build/notiflix-loading-aio';
const loadingParams = {
    svgColor: '#FF6B08',
};

const tmdb = new TmdbApi();

initPage();

async function initPage() {
    try {
        Loading.pulse(loadingParams);
      const {results} = await tmdb.getTrendingMovies();
      console.log(results);
      const markup = createMarkup(results);
      refs.listHome.insertAdjacentHTML('beforeend', markup);
  } catch (error) {
    console.log(error.message);
  } finally {
      Loading.remove();
  }
}

