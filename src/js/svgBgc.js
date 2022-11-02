const ButtonSvg = document.querySelector('.Divbgc');
const sun = document.querySelector('.icon__sun');
const moon = document.querySelector('.icon__moon');
const body = document.querySelector('.colorJs');

ButtonSvg.addEventListener('click', changeColor);
sun.classList.add('is-hidden');
ButtonSvg.classList.add('ChangeColor');
import { Loading } from 'notiflix/build/notiflix-loading-aio';
let DARK = 'DARK';
let LIGHT = 'LIGHT';
// localStorage.setItem(LIGHT, addBgc);
//   localStorage.setItem(LIGHT, removeBgc);
const loadingParams = {
  svgColor: '#FF6B08',
};
export default function changeColor() {
  if (body.classList.contains('color')) {
     Loading.pulse(loadingParams);
    localStorage.setItem(LIGHT, (body.style.backgroundColor = '#FFF'));
    localStorage.removeItem(
      DARK,
      (body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)')
    );
    addBgc();
     Loading.remove();
  } else {
     Loading.pulse(loadingParams);
    localStorage.removeItem(LIGHT, (body.style.backgroundColor = '#FFF'));
    localStorage.setItem(
      DARK,
      (body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)')
    );
    removeBgc();
     Loading.remove();
  }
}
function addBgc() {
  body.style.backgroundColor = '#FFF';
  body.classList.remove('color');
  sun.classList.add('is-hidden');
  moon.classList.remove('is-hidden');
}

function removeBgc() {
  body.classList.add('color');
  sun.classList.remove('is-hidden');
  moon.classList.add('is-hidden');
  body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)';
}

dark();

function dark() {
  if (!localStorage.getItem(DARK)) {
    return;
  }
  localStorage.getItem(DARK);
  removeBgc();
}

light();

function light() {
  if (!localStorage.getItem(LIGHT)) {
    return;
  }
  addBgc();
  localStorage.getItem(LIGHT);
}