import  FetchFilms  from './FetchApi';
// import { onSearch } from './search';
import { createMarkup } from './create-markup';
const fetch = new FetchFilms();

// const inputRef = document.querySelector('.inputsearch');
// const btn1Ref = document.querySelector('[data-index="1"]');
// const btn2Ref = document.querySelector('[data-index="2"]');
// const btn3Ref = document.querySelector('[data-index="3"]');
// const btn4Ref = document.querySelector('[data-index="4"]');
// const btn5Ref = document.querySelector('[data-index="5"]');
// const firstPageRef = document.querySelector('.first-button');
// const lastPageRef = document.querySelector('.last-button');
// const paginationRef = document.querySelector('.pagination-container');
// const rightArrowRef = document.querySelector('.arrow-right');
// const leftArrowRef = document.querySelector('.arrow-left');
// const prevDotsRef = document.querySelector('#previous');
// const afterDotsRef = document.querySelector('#after');

// paginationRef.addEventListener('click', onPaginationClick);

// let currentPage = 1;

// let btns = document.querySelectorAll('.pagination-button');

// prevDotsRef.hidden = true;
// leftArrowRef.hidden = true;
// firstPageRef.hidden = true;

// function onPaginationClick(event) {
//   if (event.target.tagName === 'BUTTON') {
//     if (Number(event.target.textContent)) {
//       currentPage = Number(event.target.textContent);
//     }

//     prevDotsRef.hidden = true;
//     afterDotsRef.hidden = true;

//     if (event.target.classList.contains('pagination-button')) {
//       btns.forEach(el => el.classList.remove('pagination--current'));
//       event.target.classList.add('pagination--current');
//     }

//     if (event.target.classList.contains('arrow-right') && currentPage < 1000) {
//       btns.forEach(el => el.classList.remove('pagination--current'));
//       btn1Ref.classList.add('pagination--current');
//       btn1Ref.textContent = Number(btn1Ref.textContent) + 5;
//       btn2Ref.textContent = Number(btn2Ref.textContent) + 5;
//       btn3Ref.textContent = Number(btn3Ref.textContent) + 5;
//       btn4Ref.textContent = Number(btn4Ref.textContent) + 5;
//       btn5Ref.textContent = Number(btn5Ref.textContent) + 5;
//       currentPage = btn1Ref.textContent;
//     }

//     if (event.target.classList.contains('arrow-left') && currentPage >= 5) {
//       btns.forEach(el => el.classList.remove('pagination--current'));
//       btn1Ref.textContent = Number(btn1Ref.textContent) - 5;
//       btn2Ref.textContent = Number(btn2Ref.textContent) - 5;
//       btn3Ref.textContent = Number(btn3Ref.textContent) - 5;
//       btn4Ref.textContent = Number(btn4Ref.textContent) - 5;
//       btn5Ref.textContent = Number(btn5Ref.textContent) - 5;
//       btn5Ref.classList.add('pagination--current');
//       currentPage = btn5Ref.textContent;
//     }

//     if (event.target.classList.contains('first-button')) {
//       btns.forEach(el => el.classList.remove('pagination--current'));
//       btn1Ref.textContent = 1;
//       btn2Ref.textContent = 2;
//       btn3Ref.textContent = 3;
//       btn4Ref.textContent = 4;
//       btn5Ref.textContent = 5;
//       btn1Ref.classList.add('pagination--current');
//       currentPage = btn1Ref.textContent;
//       leftArrowRef.hidden = true;
//       prevDotsRef.hidden = true;
//       firstPageRef.hidden = true;
//     }

//     if (event.target.classList.contains('last-button')) {
//       btns.forEach(el => el.classList.remove('pagination--current'));
//       btn1Ref.textContent = Number(lastPageRef.textContent) - 4;
//       btn2Ref.textContent = Number(lastPageRef.textContent) - 3;
//       btn3Ref.textContent = Number(lastPageRef.textContent) - 2;
//       btn4Ref.textContent = Number(lastPageRef.textContent) - 1;
//       btn5Ref.textContent = lastPageRef.textContent;
//       btn5Ref.classList.add('pagination--current');
//       currentPage = btn5Ref.textContent;
//       rightArrowRef.hidden = true;
//       afterDotsRef.hidden = true;
//       lastPageRef.hidden = true;
//     }

//     if (Number(currentPage) > 5) {
//       leftArrowRef.hidden = false;
//       prevDotsRef.hidden = false;
//       firstPageRef.hidden = false;
//     } else {
//       leftArrowRef.hidden = true;
//       prevDotsRef.hidden = true;
//       firstPageRef.hidden = true;
//     }

//     if (Number(currentPage) < 996) {
//       rightArrowRef.hidden = false;
//       afterDotsRef.hidden = false;
//       lastPageRef.hidden = false;
//     }


//     if (inputRef.value !== '') {
//         onSearch(inputRef.value, page);
//     } else {
//         FetchFilms();
//     }
//   }
// }

const paginationBox = document.querySelector('.pagination')

let globalCurrentpage = 0;

/**
 * Create pagination
 * @param {Number} currentPage - current page for search
 * @param {Number} allPages  - all pages for search
 * @return {String} markup - markup for pagination
 */
export default function pagination(currentPage, allPages) {
  let markup = ''
  let beforeTwoPage = currentPage - 2;
  let beforePage = currentPage - 1;
  let afterPage = currentPage + 1;
  let afterTwoPage = currentPage + 2;
  globalCurrentpage = currentPage;
console.log(globalCurrentpage);
  if (currentPage > 1) {
    markup += '<li>&#129144;</li>'
  }
  if (currentPage > 1) {
    markup += '<li>1</li>'
  }
  if (currentPage > 4) {
    markup += '<li>...</li>'
  }
  if (currentPage > 3) {
    markup += `<li>${beforeTwoPage}</li>`
  }
  if (currentPage > 2) {
    markup += `<li>${beforePage}</li>`
  }
  markup += `<li><b>${currentPage}</b></li>`

  if (allPages - 1 > currentPage) {
    markup += `<li>${afterPage}</li>`
  }

  if (allPages - 2 > currentPage) {
    markup += `<li>${afterTwoPage}</li>`
  }


  if (allPages - 3 > currentPage) {
    markup += `<li>...</li>`
  }

  if (allPages > currentPage) {
    markup += `<li>${allPages}</li>`
    markup += `<li>&#129146;</li>`
  }

  paginationBox.innerHTML = markup;
}

paginationBox.addEventListener('click', handlerPagination);

function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return
  }
  if (evt.target.textContent === "🡸") {
   
    return;
  }
  if (evt.target.textContent === "🡺") {
   
    return;
  }
  if (evt.target.textContent === "...") {
    return
  }
  let pages = evt.target.textContent
      console.log(pages);

}
