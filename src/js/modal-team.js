import { teamItems } from './team-card';
import { refs } from './refs';
import symbol from '../images/symbol-defs.svg';

function createMarkup(teamItems) {
  return teamItems
    .map(({ img, name, role, git }) => {
      return `<div class="team-card">
      <img src="${img}" alt="${name}" class="team-image" width="150" height="150">
      <p class="team-name">${name}</p>
      <p class="team-role">${role}</p>
      <a href="${git}" target="_blank" class="team-git">
        <svg class="team-git__icon" width="24" height="24">
          <use href="${symbol}#git-hub"></use>
        </svg>
      </a>
    </div>`;
    })
    .join('');
}
