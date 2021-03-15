import styles from './styles.css';
import ImagePage from './js_files/apiService';
import templateImgCard from './hbs_files/template_img_card.hbs';
import * as _debounce from 'lodash/debounce';
// import templateModalImg from './hbs_files/template_modal_img.hbs';

const galleryRef = document.querySelector('.gallery');
const newImagePage = new ImagePage();
const inputRef = document.querySelector('.search-form-input');
const targetRef = document.querySelector('.target');
const lightboxContentRef = document.querySelector('.lightbox-content');
const lightboxOverlayRef = document.querySelector('.lightbox-overlay');
const lightboxRef = document.querySelector('.lightbox');
const buttonUpRef = document.querySelector('.button-up');
const modalCloseRef = document.querySelector('.modal-close');
let inputRequest = '';

const fetchData = () => {
  const newFetch = newImagePage.fetchPhoto(`${inputRequest}`);
  return newFetch;
};

const renderData = () => {
  return fetchData().then(answer => {
    galleryRef.insertAdjacentHTML('beforeend', templateImgCard(answer));
  });
};

const check = () => {
  inputRequest = inputRef.value;
  if (inputRequest.trim() === '') {
    newImagePage.dropPage();
    galleryRef.innerHTML = '';
  } else renderData();
};

const options = {
  treshold: 0.5,
};

const callback = (entries, observer) => {
  if (entries[0].isIntersecting) {
    newImagePage.increasePage();
    check();
  }
};

const obsereverFunc = () => {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(targetRef);
};

const openModal = event => {
  console.dir(event);
  const dataSourse = event.target.dataset.sourse;
  const alt = event.target.alt;
  if (event.target.src) {
    lightboxRef.classList.toggle('is-open');
    lightboxContentRef.innerHTML = `<img class="big-img" src="${dataSourse}" alt="${alt}"/>`;
  }
};

const modalCloseByEsc = event => {
  if (event.code !== 'Escape') return;
  lightboxRef.classList.remove('is-open');
};

const closeModal = event => {
  lightboxRef.classList.toggle('is-open');
};

const goUp = () => {
  window.scrollTo({
    top: 0,
    right: 0,
    behavior: 'smooth',
  });
};

obsereverFunc();

const debouncedСheck = _debounce(check, 700);

inputRef.addEventListener('input', debouncedСheck);
galleryRef.addEventListener('click', openModal);
window.addEventListener('keyup', modalCloseByEsc);
lightboxOverlayRef.addEventListener('click', closeModal);
buttonUpRef.addEventListener('click', goUp);
modalCloseRef.addEventListener('click', closeModal);
