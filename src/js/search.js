import FetchFilms from './FetchApi';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { createMarkup } from './create-markup';
import { refs } from './refs';
import { Notify } from 'notiflix';

const fetch = new FetchFilms();
const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);

// body.style.backgroundColor = 'red';

console.log(fetch);
export default async function onSearch(e) {
  e.preventDefault();

  fetch.searchQuery = e.currentTarget.elements.searchQuery.value.trim();

  //   console.log(results);
  //   console.log(results);

  try {
    if (fetch.searchQuery === '') {
      Notify.failure('Please enter your search data.');
    } else {
      const { results, total_pages } = await fetch.getFilmsByName();

      console.log(total_pages);
      if (results.length === 0) {
        setTimeout(
          Notify.info(
            'Sorry, there are no images matching your search query. Please try again.'
          ),
          0
        );
      } else {
        refs.listHome.innerHTML = '';

        createMarkup(results);
      }
    }
  } catch (error) {
    Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function clearList() {
  refs.listHome.innerHTML = '';
}
