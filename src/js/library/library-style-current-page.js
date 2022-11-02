import { refs } from '../refs';

refs.btnLibWatched.addEventListener('click', onWatched);
refs.btnLibQueue.addEventListener('click', onQueueBtn);

function onWatched() {
    refs.btnLibWatched.classList.add('js-active');
    refs.btnLibQueue.classList.remove('js-active');
}
function onQueueBtn() {
    refs.btnLibQueue.classList.add('js-active');
    refs.btnLibWatched.classList.remove('js-active');
}