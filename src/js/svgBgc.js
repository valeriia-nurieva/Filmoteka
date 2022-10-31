
const ButtonSvg = document.querySelector('.Divbgc');
const sun = document.querySelector('.icon__sun');
const moon = document.querySelector('.icon__moon');
const body = document.querySelector('.colorJs');
const h2 = document.querySelectorAll('.colorJS');

console.log(h2);
ButtonSvg.addEventListener('click', changeColor);
sun.classList.add('is-hidden');
ButtonSvg.classList.add('ChangeColor');

import { themeChange } from 'theme-change';
themeChange();

console.log();
export default function changeColor() {
    if (body.classList.contains('color')) {

    body.classList.remove('color');
    sun.classList.add('is-hidden');
    moon.classList.remove('is-hidden');
  } else {

    body.classList.add('color');
    sun.classList.remove('is-hidden');
    moon.classList.add('is-hidden');
  }
}
