import './js/render-library';
import './js/btn-back-to-top';
import './js/create-library-markup';
import './js/modal-main';

const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');

function onWatched() {
    watchedBtn.classList.add('js-active');
    queueBtn.classList.remove('js-active');
}
function onQueueBtn() {
    queueBtn.classList.add('js-active');
    watchedBtn.classList.remove('js-active');
}

watchedBtn.addEventListener('click', onWatched);
queueBtn.addEventListener('click', onQueueBtn);
const body = document.querySelector('.page');


function addBgc() {
        body.style.backgroundColor = '#FFF';
        body.classList.remove('color');
}

function removeBgc() {
    body.classList.add('color');
    body.style.backgroundColor = 'rgba(0, 0, 0, 0.74)';
}
let DARK = 'DARK';
let LIGHT = 'LIGHT';
dark();

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

