import { refs } from './refs';
import { createLibraryMarkup } from './library/create-library-markup';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import FetchFilms from './FetchApi';

const fetch = new FetchFilms();
const LOCAL_STORAGE_KEY_WATCHED = 'watched';
const LOCAL_STORAGE_KEY_QUEUE = 'queue';
const saveDataWatched = JSON.parse(
  localStorage.getItem(LOCAL_STORAGE_KEY_WATCHED)
);
const saveDataQueue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_QUEUE));
const saveDataAll = saveDataWatched.concat(saveDataQueue);
const savedDataAllQniue = saveDataAll.filter(
  (data, index, array) => array.indexOf(data) === index
);
const loadingParams = {
  svgColor: '#FF6B08',
};

init();

refs.btnLibWatched.addEventListener('click', onWatchedClick);
refs.btnLibQueue.addEventListener('click', onQueueClick);

if (!savedDataAllQniue.length) {
  refs.blockEmptyLib.classList.remove('is-hidden');
}

function init() {
  if (saveDataAll) {
    try {
      Loading.pulse(loadingParams);
      savedDataAllQniue.map(id => {
        fetch.getFilmDetails(id).then(promise => {
          const markup = createLibraryMarkup(promise);
          refs.listLib.insertAdjacentHTML('beforeend', markup);
        });
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      Loading.remove();
    }
  }
}

function onWatchedClick() {
  if (saveDataAll) {
    refs.listLib.innerHTML = '';
    try {
      Loading.pulse(loadingParams);
      saveDataWatched.map(id => {
        fetch.getFilmDetails(id).then(promise => {
          const markup = createLibraryMarkup(promise);
          refs.listLib.insertAdjacentHTML('beforeend', markup);
        });
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      Loading.remove();
    }
  }
}

function onQueueClick() {
  if (saveDataAll) {
    refs.listLib.innerHTML = '';
    try {
      Loading.pulse(loadingParams);
      saveDataQueue.map(id => {
        fetch.getFilmDetails(id).then(promise => {
          const markup = createLibraryMarkup(promise);
          refs.listLib.insertAdjacentHTML('beforeend', markup);
        });
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      Loading.remove();
    }
  }
}
