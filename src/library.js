import { refs } from './js/refs';
import { TmdbApi } from './js/TMDB-api';
import { createLibraryMarkup } from './js/create-library-markup';

import FetchFilms from './js/FetchApi';
const fetch = new FetchFilms();
const LOCAL_STORAGE_KEY = 'film-id';

const tmdb = new TmdbApi();
inid();
function inid() {
  const saveData = localStorage.getItem('watched');
  if (saveData) {
    try {
      const parseData = JSON.parse(saveData);

      const result = parseData.map(id => {
        const result = fetch.getFilmDetails(id).then(promise => {
          console.log(promise);

          const markup = createLibraryMarkup(promise);
          refs.listLib.insertAdjacentHTML('beforeend', markup);
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  }
}
