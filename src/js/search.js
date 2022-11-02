import FetchFilms from './FetchApi';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './create-markup';
import { refs } from './refs';
import { Notify } from 'notiflix';
import pagination from './paginationSearch';

const fetch = new FetchFilms();

const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);
const searchError = document.querySelector('.search-error');
const sliderTitle = document.querySelector('slider-title');
const pagPage = document.querySelector('.paginationSearch');
const pagJs = document.querySelector('.pagJs');
const sectionPagination = document.querySelector('.section-pagination');
const sectionPaginationSearch = document.querySelector(
  '.section-pagination_search'
);

console.log(pagPage);

 searchError.textContent = '';
export default async function onSearch(e) {
  e.preventDefault();
  fetch.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  // console.log(e.currentTarget.elements.searchQuery.value);
  try {
    if (!fetch.searchQuery) {
      searchError.textContent = 'Please enter your search data.';
    } else {
      const { results, total_results, page, total_pages } =
        await fetch.getFilmsByName();

      pagination(page, total_pages);

      if (!results.length) {
        searchError.textContent =
          'Search result not successful. Enter the correct movie name and';
      } else {
        if (!total_results) {
          return (searchError.textContent =
            'Sorry, but your movie was not found');
        } else {
          if (sectionPaginationSearch.classList.contains('is-hidden')) {
            sectionPaginationSearch.classList.remove('is-hidden');
          }
          // sliderTitle.classList.add('is-hidden');

          clearList();
          sectionPagination.classList.add('is-hidden');
          createMarkup(results);
          pagination(page, total_pages);

          searchError.textContent = 'movies found';
          searchError.style.color = '#00ff00';
        }
      }
    }
  } catch (error) {
    searchError.textContent = 'Sorry, but your movie was not found';
  }
}

function clearList() {
  pagJs.innerHTML = '';
  searchError.textContent = '';
}

pagPage.addEventListener('click', handlerPagination);

async function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  if (evt.target.textContent === '🡸') {
    return (fetch.pages -= 1);
  }
  if (evt.target.textContent === '🡺') {
    return (fetch.pages += 1);
  }
  if (evt.target.textContent === '...') {
    return;
  }
  let pages = evt.target.textContent;

  fetch.pages = pages;

  const { results, total_results, page, total_pages } =
    await fetch.getFilmsByName();
  pagination(page, total_pages);
  refs.listHome.innerHTML = '';
  window.scrollTo({ top: 216, behavior: 'smooth' });
  createMarkup(results);
}
