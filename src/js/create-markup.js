const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
import { genres } from './json/genres';
import { refs } from './refs';

export function createMarkup(array) {
  const markup = array
    .map(({ poster_path, title, genre_ids, id, release_date }) => {

      let nameOfGenre = [];
      genres.map(genre => {
        if (genre_ids.includes(genre.id)) {
          nameOfGenre.push(genre.name);
          if (nameOfGenre.length > 3) {
            const changedArr = nameOfGenre.slice(0, 2);
            changedArr.push('Other');
            nameOfGenre = changedArr;
          }
        }
      });
      const genresStr = nameOfGenre.join(', ');

      const date = release_date.slice(0, 4);
      
      return `<li class="grid__item film-card">
        <a href="#" data-id="${id}" class="list">
          <div class="film-card__thumb">
            <img
              class="film-card__img"
              src="${BASE_IMG_URL}${poster_path}"
              alt="Movie poster"
              loading="lazy"
              id=${id}
            />
          </div>
        </a>
        <h2 class="film-card__header">${title}</h2>
        <p class="film-card__genres">${genresStr}</p>
        <span class="film-card__year">${date}</span>
      </li>`;
    })
    .join('');
  refs.listHome.insertAdjacentHTML('beforeend', markup);
}
