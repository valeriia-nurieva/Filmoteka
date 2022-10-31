import './js/render-library';
import './js/btn-back-to-top';

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


