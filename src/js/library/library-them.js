import { refs } from '../refs';

let DARK = 'DARK';
let LIGHT = 'LIGHT';

dark();
light();

function dark() {
  if (!localStorage.getItem(DARK)) {
    return;
  }
  localStorage.getItem(DARK);
  removeBgc();
}

function light() {
  if (!localStorage.getItem(LIGHT)) {
    return;
  }
  addBgc();
  localStorage.getItem(LIGHT);
}

function addBgc() {
  refs.body.style.backgroundColor = '#FFF';
  refs.body.classList.remove('color');
}

function removeBgc() {
  refs.body.classList.add('color');
  refs.body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)';
}