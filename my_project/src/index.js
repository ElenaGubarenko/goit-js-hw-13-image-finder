import ImagePage from './js_files/apiService';
import templateImgCard from './hbs_files/template_img_card.hbs';

const newImagePage = new ImagePage();
const a = newImagePage.fetchPhoto('cat');
console.log(a);
// const imgCard = templateImgCard();
