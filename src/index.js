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
    const { results, page, total_pages } =
      await fetch.getTrendFilms();
    pagination(page, total_pages);
    createMarkup(results);
  } catch (error) {
    console.log(error.message);
  } finally {
    Loading.remove();
  }
}

const paginationBox = document.querySelector('.pagination');
paginationBox.addEventListener('click', handlerPagination);

async function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return
  }
  if (evt.target.textContent === "🡸") {
   
    return;
  }
  if (evt.target.textContent === "🡺") {
   
    return;
  }
  if (evt.target.textContent === "...") {
    return
  }
  let pages = evt.target.textContent
      console.log(pages);
  fetch.pages = pages;
  console.log('fetch.pages', fetch.pages);
    const { results, total_results, page, total_pages } =
    await fetch.getTrendFilms();
  pagination(page, total_pages);
  console.log(results);
  refs.listHome.innerHTML = ''; 
  createMarkup(results);
}

// pagPage.addEventListener('click', clickPagin);
// async function clickPagin() {
//   let CurrentPage = 1;
 
//   try {
//     Loading.pulse(loadingParams);

//     const { results, total_results, page, total_pages } =
//       await fetch.getTrendFilms();

//       pagJs.innerHTML = '';
//        if ((CurrentPage = page)) {
//          pagination(CurrentPage, total_pages);
      
       
//          fetch.incrementPage();
//          console.log(CurrentPage);
//          console.log(pagPage);

//          createMarkup(results);
//        }
//   } catch (error) {
//     console.log(error.message);
//   } finally {
//     Loading.remove();
//   }
//   // clearList();
// }

import onSearch from './js/search';
import changeColor from './js/svgBgc';

import test from './js/test';
import renderCard from './js/slider';