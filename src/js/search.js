import FetchFilms from './FetchApi';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './create-markup';
import { refs } from './refs';
import { Notify } from 'notiflix';
import { onPaginationClick } from './pagination';
const fetch = new FetchFilms();
const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);
const searchError = document.querySelector('.search-error');

searchError.textContent = '';

export default async function onSearch(e) {
  e.preventDefault();

  fetch.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  try {
    if (fetch.searchQuery === '') {
      searchError.textContent = 'Please enter your search data.';
    } else {
      const { results, total_results } = await fetch.getFilmsByName();

      if (fetch.query === 0) {
        setTimeout(
          (searchError.textContent =
            'Search result not successful. Enter the correct movie name and'),
          0
        );
      } else {
          if (total_results === 0) {
            setTimeout(
              (searchError.textContent =
                'Search result not successful. Enter the correct movie name and'),
              0
            );
          } else {
             clearList();

             createMarkup(results);
          }
       
        // onPaginationClick(total_pages);
      }
    }
  } catch (error) {
  
  }
}

function clearList() {
  refs.listHome.innerHTML = '';
  searchError.textContent = '';
}
