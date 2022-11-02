import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createMarkup } from './js/create-markup';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';
import './js/btn-back-to-top';
import pagination from './js/pagination';
import './js/modal-main';
import FetchFilms from './js/FetchApi';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const fetch = new FetchFilms();
const sectionPagination = document.querySelector('.section-pagination_search');
const loadingParams = {
  svgColor: '#FF6B08',
};

const tmdb = new TmdbApi();

initPage();

async function initPage() {
  try {
    Loading.pulse(loadingParams);
    const { results, page, total_pages } = await fetch.getTrendFilms();
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
    return;
  }
  if (evt.target.textContent === '🡸') {
    return;
  }
  if (evt.target.textContent === '🡺') {
    return;
  }
  if (evt.target.textContent === '...') {
    return;
  }
  let pages = evt.target.textContent;

  fetch.pages = pages;

  const { results, total_results, page, total_pages } =
    await fetch.getTrendFilms();
  pagination(page, total_pages);
  refs.listHome.innerHTML = '';
    sectionPagination.classList.add('is-hidden');
  window.scrollTo({ top: 216, behavior: 'smooth' });
  createMarkup(results);
}

import onSearch from './js/search';
import changeColor from './js/svgBgc';

import test from './js/test';
import renderCard from './js/slider';
