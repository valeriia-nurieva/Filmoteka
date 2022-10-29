import axios from 'axios';
import { refs } from './refs';

refs.modalCloseBtn.addEventListener('click', onCloseBtn);
refs.backdrop.addEventListener('click', onBackdropClick);

refs.card.addEventListener('click', onCardClick);
function getFilmID(id) {
  return axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=1d9e78535f6a01dcc41594da81e379a7&adult=false`
  );
}

function fetchMovie(id) {
  return getFilmID(id).then(response => {
    return response.data;
  });
}

function onCardClick(e) {
  e.preventDefault();

  fetchMovie(e.target.id)
    .then(createMarkup)
    .catch(error => {
      console.log(error);
    });

  refs.backdrop.classList.toggle('backdrop--is-hidden');
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
}) {
  const markup = `<div class="modal_flex">
          <img
            src="https://image.tmdb.org/t/p/w500${poster_path}"
            alt="Movie poster"
            class="modal_poster"
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
              <p class="modal_data-text">${vote_average}/${vote_count}</p>
              <p class="modal_data-text">${popularity}</p>
              <p class="modal_data-text">${original_title}</p>
              <p class="modal_data-text">${genres.map(genre => genre.name)}</p>
            </div>
          </div>
          <h3 class="modal_about-title">About</h3>
          <p class="modal_about-text">${overview}</p>
          <div class="modal_button-box">
            <button type="button" class="modal_button" data-watched>
              add to Watched
            </button>
            <button type="button" class="modal_button" data-queue>
              add to queue
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
}
