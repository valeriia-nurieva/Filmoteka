import FetchFilms from './FetchApi';

import { createMarkup } from './create-markup';
import { refs } from './refs';

const fetch = new FetchFilms();
const onSearchForm = document.querySelector('#search-form');
onSearchForm.addEventListener('submit', onSearch);

export default async function onSearch(e) {
  e.preventDefault();

  fetch.searchQuery = e.currentTarget.elements.searchQuery.value;

  const { results } = await fetch.getFilmsByName();
//   console.log(results);
//   console.log(results);
  refs.listHome.innerHTML = '';
  createMarkup(results);
}
