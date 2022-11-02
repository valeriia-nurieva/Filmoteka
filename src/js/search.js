import FetchFilms from './FetchApi';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './create-markup';
import { refs } from './refs';
import { Notify } from 'notiflix';

const fetch = new FetchFilms();
const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);
const searchError = document.querySelector('.search-error');
const sliderTitle = document.querySelector('slider-title');
const pagPage = document.querySelector('.pagination');
const pagJs = document.querySelector('.pagJs');

 const paginationWrapper= document.querySelector('.js-pagination-wrapper')
 const paginationPrevButton= document.querySelector('.pagination-prev-button')
 const paginationNextButton= document.querySelector('.pagination-next-button')
 const paginationContainer= document.querySelector('.movies__pagination-container')
   

searchError.textContent = '';
export default async function onSearch(e) {
  e.preventDefault();
  fetch.searchQuery = e.currentTarget.elements.searchQuery.value.trim();
  try {
    if (!fetch.searchQuery) {
      searchError.textContent = 'Please enter your search data.';
    } else {
      const { results, total_results, page, total_pages } = await fetch.getFilmsByName();

      // pagination(page, total_pages);
      
      if (!results.length) {
        searchError.textContent =
          'Search result not successful. Enter the correct movie name and';
      } else {
        if (!total_results) {
          //  return searchError.textContent = 'Sorry, but your movie was not found';
        } else {
          // sliderTitle.classList.add('is-hidden');
          clearList();
          createMarkup(results);
          clickPag()
        }
      }
    }
  
  } catch (error) {
    searchError.textContent = 'Sorry, but your movie was not found'
  };
}

// function clearList() {
//   r.innerHTML = '';
//         searchError.textContent = '';

//   };

pagPage.addEventListener('click', clickPag)

 async function clickPag(CurrentPage) {
   CurrentPage = 1;

   const { results, total_results, page, total_pages } = await fetch.getFilmsByName();
console.log(CurrentPage === page);
   if (CurrentPage = page) {
     
     pagination(CurrentPage, total_pages);
     fetch.incrementPage()
     clearList()
     createMarkup(results);
}
  
}