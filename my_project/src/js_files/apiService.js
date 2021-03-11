const BASE_URL =
  'https://pixabay.com/api/?key=20622592-50ccb321bb66e8f51c2ed20b3&image_type=photo&orientation=horizontal&per_page=12';

export default class ImagePage {
  constructor() {
    this.page = 1;
  }

  fetchPhoto(request) {
    fetch(`${BASE_URL}&page=${this.page}&q=${request}`)
      .then(response => {
        return response.json();
      })
      .then(answer => {
        answer.hits.map(el => {
          return el;
        });
      })
      .catch(error => {
        console.log('Error');
      });
  }

  increasePage() {
    this.page += 1;
  }

  decreasePage() {
    this.page -= 1;
  }

  dropPage() {
    this.page = 1;
  }
}
