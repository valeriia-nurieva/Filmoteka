const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

export function createLibraryMarkup({
  genres,
  poster_path,
  title,
  release_date,
}) {
  return `<li class="grid__item film-card ">
        <a href="#" class="list">
          <div class="film-card__thumb">
            <img
              class="film-card__img"
              src="${BASE_IMG_URL}${poster_path}"
              alt="Movie poster"
              loading="lazy"
            />
          </div>
          <h2 class="film-card__header">${title}</h2>
        </a>
        <p class="film-card__genres name='name'>${genres.map(value => {
          value.name;
        })}</p>
        <span class="film-card__year">${release_date}</span>
      </li>`;
}
