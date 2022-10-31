
const ButtonSvg = document.querySelector('.Divbgc');
const sun = document.querySelector('.icon__sun');
const moon = document.querySelector('.icon__moon');
const body = document.querySelector('.colorJs');
const h2 = document.querySelectorAll('.colorJS');

console.log(h2);
ButtonSvg.addEventListener('click', changeColor);
sun.classList.add('is-hidden');
ButtonSvg.classList.add('ChangeColor');

let DARK = 'DARK';
let LIGHT = 'LIGHT';
        // localStorage.setItem(LIGHT, addBgc);
        //   localStorage.setItem(LIGHT, removeBgc);

export default function changeColor() {
    if (body.classList.contains('color')) {
        localStorage.setItem(LIGHT, body.style.backgroundColor = '#FFF');
           localStorage.removeItem(
             DARK,
             (body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)')
           );
  addBgc();
    } else {
          localStorage.removeItem(LIGHT,  body.style.backgroundColor = '#FFF');
          localStorage.setItem(
            DARK,
            (body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)')
          );
      removeBgc();

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
console.log(!localStorage.getItem(DARK));
function dark() {
  if (!localStorage.getItem(DARK)) {
      return;
    } 
    localStorage.getItem(DARK);
    removeBgc();
};

light();

function light() {
  if (!localStorage.getItem(LIGHT)) {
    return;
    }addBgc();
    localStorage.getItem(LIGHT);
};
