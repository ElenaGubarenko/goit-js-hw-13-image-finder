import styles from './styles.css';
import ImagePage from './js_files/apiService';
import templateImgCard from './hbs_files/template_img_card.hbs';
import * as _debounce from 'lodash/debounce';
// import templateModalImg from './hbs_files/template_modal_img.hbs';

const galleryRef = document.querySelector('.gallery');
const newImagePage = new ImagePage();
const inputRef = document.querySelector('.search-form-input');
const targetRef = document.querySelector('.target');
const lightboxRef = document.querySelector('.lightbox-content');
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
  return fetchData().then(answer => {
    answer.map(element => {
      console.log(`fetched ${element.webformatURL}`);
      console.log(`evented ${event.target.src}`);
    });
  });
  // .then(console.log);

  // if (event.target.src) {
  // }
  // console.dir(event.target);
};

obsereverFunc();

const debouncedСheck = _debounce(check, 700);

inputRef.addEventListener('input', debouncedСheck);
galleryRef.addEventListener('click', openModal);
