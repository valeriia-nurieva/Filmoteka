import * as basicLightbox from 'basiclightbox';
import { refs } from './refs';
import Api from './FetchApi';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { createLibraryMarkup } from './create-library-markup';

const loadingParams = {
  svgColor: '#FF6B08',
};

let watchedMovies = [];
let queueMovies = [];

refs.modalCloseBtn.addEventListener('click', onCloseBtn);
refs.backdrop.addEventListener('click', onBackdropClick);
refs.listHome.addEventListener('click', onCardClick);

const api = new Api();

function fetchMovie(id) {
  return api.getFilmDetails(id).then(response => {
    return response;
  });
}

function fetchVideo(id) {
  return api.getFilmVideo(id).then(response => {
    return response;
  });
}
function onCardClick(e) {
  e.preventDefault();

  if (e.target.nodeName !== 'IMG') {
    return;
  }

  fetchMovie(e.target.id)
    .then(Loading.pulse(loadingParams))
    .then(createMarkup)
    .then(() => {
      const btn = document.querySelector('.btn-trailer');
      btn.addEventListener('click', youTube);
      function youTube() {
        fetchVideo(e.target.id)
          .then(data => {
            if (data.results.length === 0) {
              return;
            }
            let key = data.results[0].key;
            return key;
          })
          .then(key => renderTrailer(key));
      }

      function renderTrailer(key) {
        const instance = basicLightbox.create(`
    <iframe src="https://www.youtube.com/embed/${key}" width="560" height="315" autoplay=1&mute=1&controls=1 ></iframe>
`);
        instance.show();
      }

      const btnWatched = document.querySelector('.btn-watched');
      const btnQueue = document.querySelector('.btn-queue');
      btnWatched.addEventListener('click', onBtnWatched);
      btnQueue.addEventListener('click', onBtnQueue);

      const getWatchedMovies = localStorage.getItem('watched');
      if (getWatchedMovies) {
        const getWatchedMoviesParsed = JSON.parse(getWatchedMovies);
        if (getWatchedMoviesParsed.includes(e.target.id)) {
          btnWatched.textContent = 'remove from watched';
        }
      }

      const getQueueMovies = localStorage.getItem('queue');
      if (getQueueMovies) {
        const getQueueMoviesParsed = JSON.parse(getQueueMovies);
        if (getQueueMoviesParsed.includes(e.target.id)) {
          btnQueue.textContent = 'remove from queue';
        }
      }

      function onBtnWatched() {
        if (btnWatched.textContent.includes('add')) {
          btnWatched.textContent = 'remove from watched';
          const savedWatched = localStorage.getItem('watched');
          if (savedWatched) {
            watchedMovies = JSON.parse(savedWatched);
          }
          watchedMovies.push(e.target.id);

          const watchedMoviesJson = JSON.stringify(watchedMovies);
          localStorage.setItem('watched', watchedMoviesJson);
        } else {
          btnWatched.textContent = 'add to watched';
          const savedWatchedMovies = localStorage.getItem('watched');
          const savedWatchedMoviesData = JSON.parse(savedWatchedMovies);
          const index = savedWatchedMoviesData.findIndex(
            movie => movie === e.target.id
          );
          savedWatchedMoviesData.splice(index, 1);
          const savedWatchedMoviesParsed = JSON.stringify(
            savedWatchedMoviesData
          );
          localStorage.setItem('watched', savedWatchedMoviesParsed);
          const savedQueueMovies = localStorage.getItem('queue');
          const savedQueueMoviesData = JSON.parse(savedQueueMovies);
          const allMovies = [
            ...savedWatchedMoviesData,
            ...savedQueueMoviesData,
          ];
          const allUniqeMovies = allMovies.filter(
            (data, index, array) => array.indexOf(data) === index
          );
          refs.listLib.innerHTML = '';
          allUniqeMovies.map(idNumber => {
            fetchMovie(idNumber).then(response => {
              const markup = createLibraryMarkup(response);
              refs.listLib.insertAdjacentHTML('beforeend', markup);
            });
          });
        }
      }
      function onBtnQueue() {
        if (btnQueue.textContent.includes('add')) {
          btnQueue.textContent = 'remove from queue';
          const savedQueue = localStorage.getItem('queue');
          if (savedQueue) {
            queueMovies = JSON.parse(savedQueue);
          }
          queueMovies.push(e.target.id);
          const queueMoviesJson = JSON.stringify(queueMovies);
          localStorage.setItem('queue', queueMoviesJson);
        } else {
          btnQueue.textContent = 'add to queue';
          const savedQueueMovies = localStorage.getItem('queue');
          const savedQueueMoviesData = JSON.parse(savedQueueMovies);
          const index = savedQueueMoviesData.findIndex(
            movie => movie === e.target.id
          );
          savedQueueMoviesData.splice(index, 1);
          const savedWatchedMoviesParsed = JSON.stringify(savedQueueMoviesData);
          localStorage.setItem('queue', savedWatchedMoviesParsed);
          const savedWatchedMovies = localStorage.getItem('watched');
          const savedWatchedMoviesData = JSON.parse(savedWatchedMovies);
          const allMovies = [
            ...savedWatchedMoviesData,
            ...savedQueueMoviesData,
          ];
          const allUniqeMovies = allMovies.filter(
            (data, index, array) => array.indexOf(data) === index
          );
          refs.listLib.innerHTML = '';
          allUniqeMovies.map(idNumber => {
            fetchMovie(idNumber).then(response => {
              const markup = createLibraryMarkup(response);
              refs.listLib.insertAdjacentHTML('beforeend', markup);
            });
          });
        }
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(Loading.remove());

  refs.backdrop.classList.toggle('backdrop--is-hidden');
  document.body.classList.toggle('overflow-hidden');
  window.addEventListener('keydown', onEscClick);
}

function createMarkup({
  title,
  vote_average,
  vote_count,
  popularity,
  original_title,
  genres,
  overview,
  poster_path,
  id,
}) {
  const markup = `<div class="modal_flex">
            <img
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            onerror="this.onerror=null;this.src='https://i.ibb.co/4ThsTsv/poster-coming-soon.jpg'"
            alt="Movie poster"
            class="modal_poster"
            width="375"
            height="478"
          />
        </div>
        <div class="modal_flex">
          <h2 class="modal_movie-title">${title}</h2>
          <div class="modal_data-flex">
            <div class="modal_data-box">
              <h3 class="modal_movie-data">Vote / Votes</h3>
              <h3 class="modal_movie-data">Popularity</h3>
              <h3 class="modal_movie-data">Original Title</h3>
              <h3 class="modal_movie-data">Genre</h3>
            </div>
            <div class="modal_data-text-box">
             <p class="modal_data-text"><span class="modal_text-span">${vote_average.toFixed(
               1
             )}</span>/${vote_count}</p>
              <p class="modal_data-text">${popularity.toFixed(1)}</p>
              <p class="modal_data-text">${original_title}</p>
              <p class="modal_data-text">${genres.map(genre => genre.name)}</p>
            </div>
          </div>
          <h3 class="modal_about-title">About</h3>
          <p class="modal_about-text">${overview}</p>
          <div class="modal_button-box">
            <button type="button" class="modal_button btn-watched">
              add to Watched
            </button>
            <button type="button" class="modal_button btn-queue">
              add to queue
            </button>
            <button type="button" class="modal_button btn-trailer" id=${id}>
              watch trailer
            </button>
          </div>
        </div>`;

  refs.createData.insertAdjacentHTML('beforeend', markup);
}

function onCloseBtn() {
  closeModal();
  clearHtml();
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
    clearHtml();
  }
}

function onEscClick(e) {
  if (e.code === 'Escape') {
    closeModal();
    clearHtml();
  }
  window.removeEventListener('keydown', onEscClick);
}

function clearHtml() {
  refs.createData.innerHTML = '';
}

function closeModal() {
  refs.backdrop.classList.toggle('backdrop--is-hidden');
  document.body.classList.toggle('overflow-hidden');
}
