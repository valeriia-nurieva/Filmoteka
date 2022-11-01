import { glide, config } from './test';
const BASE_IMG_URL = 'https://image.tmdb.org/t/p/original';
import FetchFilms from './FetchApi';
import Glide from '@glidejs/glide';
const fetch = new FetchFilms();
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import './modal-main';

const slider = document.querySelector('.swiper-wrapper');
console.log(slider);

renderCard();
export default async function renderCard() {
  const { results, total_results } = await fetch.getSetFilms();
  addElFilms(results);
  console.log(results);
  console.log(total_results);
}

fetch.incrementPage();
function addElFilms(results) {
  slider.innerHTML = '';

  const markup = `
    <div class="glide">
          <div class="glide__track" data-glide-el="track">
              <ul class="glide__slides" id="glide__slides"></ul>
          </div>
          <div class="glide__arrows" data-glide-el="controls">
          <button class="glide__arrow glide__arrow--left" data-glide-dir="<">&#5130;</button>
         <button class="glide__arrow glide__arrow--right" data-glide-dir=">">&#5125;</button>
        </div>
      </div>`;

  slider.insertAdjacentHTML('beforeend', markup);

  const slidesContainer = document.querySelector('.glide__slides');
  let arrFilmTrends = [];
  results.forEach(el => {
    let image = createElement('img', {
      class: 'cards__image-poster',
      src: `https://image.tmdb.org/t/p/w500${el.poster_path}`,
      onerror: `this.onerror=null;this.src='https://i.ibb.co/4ThsTsv/poster-coming-soon.jpg'`,
      alt: 'film__poster',
      id: el.id,
    });

    let li = createElement(
      'li',
      {
        class: 'glide__slide glide__slide--main',
        id: `${el.id}`,
      },
      image
    );
    arrFilmTrends.push(li);
  });

  slidesContainer.append(...arrFilmTrends);
  changeStyleArrow();
  glide.destroy();
  let glid = new Glide('.glide', config);
  glid.mount();

  simpleLightbox();
}

export const createElement = (nodeName, options, children) => {
  const nodeElement = document.createElement(nodeName);
  const { class: nodeClass, dataset, ...restOptions } = options;

  if (nodeClass) {
    const classList = nodeClass.split(' '); // ['title', 'description']
    nodeElement.classList.add(...classList);
  }

  if (children) {
    const nodeChildren = Array.isArray(children) ? children : [children];
    nodeElement.append(...nodeChildren);
  }

  if (dataset) {
    Object.entries(dataset).forEach(dataAttr => {
      const [dataKey, dataValue] = dataAttr;
      nodeElement.setAttribute(`data-${dataKey}`, dataValue);
    });
  }

  Object.keys(restOptions).forEach(optionKey => {
    nodeElement[optionKey] = restOptions[optionKey];
  });

  return nodeElement;
};

function simpleLightbox() {
  let lightbox = new SimpleLightbox('.glide__slide', {
    captions: false,
    captionDelay: 250,
    enableKeyboard: true,
    doubleTapZoom: 5,
  });
  lightbox.refresh();
}

//after render slider, change arrow style function

function changeStyleArrow() {
  const refs = {
    left: document.querySelector('.glide__arrow--left'),
    right: document.querySelector('.glide__arrow--right'),
    current: document.querySelectorAll('.glide__arrow'),
  };

  refs.current.forEach(el => {
    el.style.cssText = `
          outline: none;
          box-shadow: none;
          border-radius: 50%;
          padding: 4px 7px;
          background-color: rgba(0, 0, 0, 0.4);
        `;
  });

  refs.left.style.left = '3px';
  refs.right.style.right = '4px';
}

// click slider el open modal
