import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createMarkup } from './js/create-markup';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/btn-back-to-top';
import pagination from './js/pagination';
import './js/modal-main';

const pagJs = document.querySelector('.pagJs');

import FetchFilms from './js/FetchApi';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const fetch = new FetchFilms();
const pagPage = document.querySelector('.pagination');



const loadingParams = {
  svgColor: '#FF6B08',
};

const tmdb = new TmdbApi();

initPage();

async function initPage() {
  try {
    Loading.pulse(loadingParams);
    const { results, total_results, page, total_pages } =
      await fetch.getTrendFilms();
    
    createMarkup(results);
    clickPagin()
  } catch (error) {
    console.log(error.message);
  } finally {
    Loading.remove();
  }
}


pagPage.addEventListener('click', clickPagin);
async function clickPagin() {
  let CurrentPage = 1;
 
  try {
    Loading.pulse(loadingParams);

    const { results, total_results, page, total_pages } =
      await fetch.getTrendFilms();

      pagJs.innerHTML = '';
       if ((CurrentPage = page)) {
         pagination(CurrentPage, total_pages);
      
       
         fetch.incrementPage();
         console.log(CurrentPage);
         console.log(pagPage);

         createMarkup(results);
       }
  } catch (error) {
    console.log(error.message);
  } finally {
    Loading.remove();
  }
  // clearList();
}

import onSearch from './js/search';
import changeColor from './js/svgBgc';

import test from './js/test';
import renderCard from './js/slider';