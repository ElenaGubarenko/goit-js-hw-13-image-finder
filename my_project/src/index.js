import styles from './styles.css';
import ImagePage from './js_files/apiService';
import templateImgCard from './hbs_files/template_img_card.hbs';
import * as _debounce from 'lodash/debounce';
// import '~material-icons/css/material-icons.scss';

const galleryRef = document.querySelector('.gallery');
const newImagePage = new ImagePage();
const inputRef = document.querySelector('.search-form-input');
const targetRef = document.querySelector('.target');
let inputRequest = ''.trim();
const options = {
  treshold: 0.5,
};

const render = () => {
  const newFetch = newImagePage.fetchPhoto(`${inputRequest}`);
  newFetch.then(answer => {
    return galleryRef.insertAdjacentHTML('beforeend', templateImgCard(answer));
  });
};

const callback = (entries, observer) => {
  if (entries[0].isIntersecting) {
    newImagePage.increasePage();
    render();
  }
};

const obsereverFunc = () => {
  const observer = new IntersectionObserver(callback, options);
  observer.observe(targetRef);
};

const check = () => {
  galleryRef.innerHTML = '';
  inputRequest = inputRef.value;

  if (inputRequest.trim() === '') {
    galleryRef.innerHTML = '';
  }
  render();
  obsereverFunc();
};

const debouncedСheck = _debounce(check, 700);

inputRef.addEventListener('input', debouncedСheck);
