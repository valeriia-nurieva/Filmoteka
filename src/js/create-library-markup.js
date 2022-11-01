const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';

export function createLibraryMarkup({
  genres,
  poster_path,
  title,
  release_date,
  id
}) {
  let genresArr = [];
  genres.map((genre) =>
    genresArr.push(genre.name));
  if (genresArr.length > 3) {
    const changedArr = genresArr.slice(0, 2);
    changedArr.push('Other');
    genresArr = changedArr;
  }
  const genresStr = genresArr.join(', ');
  const year = release_date.slice(0, 4);
  return `<li class="grid__item film-card ">
        <a href="#" data-id="${id}" class="list">
          <div class="film-card__thumb">
            <img
              class="film-card__img"
              src="${BASE_IMG_URL}${poster_path}"
              onerror="this.onerror=null;this.src='https://i.ibb.co/4ThsTsv/poster-coming-soon.jpg'"
              alt="Movie poster"
              loading="lazy"
              id=${id}
            />
          </div>
          <h2 class="film-card__header">${title}</h2>
        </a>
        <p class="film-card__genres">${genresStr}</p>
        <span class="film-card__year">${year}</span>
      </li>`;
}
