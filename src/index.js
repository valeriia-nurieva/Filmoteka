import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createMarkup } from './js/create-markup';

import './js/btn-back-to-top';

import './js/modal-main';

import FetchFilms from './js/FetchApi';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
const fetch = new FetchFilms();

// const ButtonSvg = document.querySelector('.Divbgc');
// const sun = document.querySelector('.icon__sun');
// const moon = document.querySelector('.icon__moon');
// const body = document.querySelector('.colorJs');
// // console.log(svg);

// ButtonSvg.addEventListener('click', changeColor);
// sun.classList.add('is-hidden');
// //  body.classList.remove('color')
// console.log();
// function changeColor() {
//   if (body.classList.contains('color')) {
//     body.classList.remove('color');
//     sun.classList.add('is-hidden');
//     moon.classList.remove('is-hidden');
//   } else {
//     body.classList.add('color');
//     sun.classList.remove('is-hidden');
//     moon.classList.add('is-hidden');
//   }
// }

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
