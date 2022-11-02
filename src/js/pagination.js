
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

  if (currentPage > 1) {
    markup += '<li class="pagination-button arrow-left"></li>'
  }
  if (currentPage > 1) {
    markup += '<li class="pagination-button first-button">1</li>'
  }
  if (currentPage > 4) {
    markup += '<li class="pagination-button">...</li>'
  }
  if (currentPage > 3) {
    markup += `<li class="pagination-button">${beforeTwoPage}</li>`
  }
  if (currentPage > 2) {
    markup += `<li class="pagination-button">${beforePage}</li>`
  }
  markup += `<li class="pagination-button pagination--current"><b>${currentPage}</b></li>`

  if (allPages - 1 > currentPage) {
    markup += `<li class="pagination-button">${afterPage}</li>`
  }

  if (allPages - 2 > currentPage) {
    markup += `<li class="pagination-button">${afterTwoPage}</li>`
  }


  if (allPages - 3 > currentPage) {
    markup += `<li class="dots">...</li>`
  }

  if (allPages > currentPage) {
    markup += `<li class="pagination-button last-button">${allPages}</li>`
    markup += `<li class="pagination-button arrow-right"></li>`
  }

  paginationBox.innerHTML = markup;
}

paginationBox.addEventListener('click', handlerPagination);

function handlerPagination(evt) {
  if (evt.target.nodeName !== 'LI') {
    return;
  }
  if (evt.target.textContent === " ") {
   
    return;
  }
  if (evt.target.textContent === " ") {
   
    return;
  }
  if (evt.target.textContent === "...") {
    return
  }
  const page = evt.target.textContent
  console.log(page);
}

