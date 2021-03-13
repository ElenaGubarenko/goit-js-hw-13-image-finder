const BASE_URL =
  'https://pixabay.com/api/?key=20622592-50ccb321bb66e8f51c2ed20b3&image_type=photo&orientation=horizontal&per_page=3';

export default class ImagePage {
  constructor() {
    this.page = 1;
  }

  fetchPhoto(request) {
    return fetch(`${BASE_URL}&page=${this.page}&q=${request}`)
      .then(response => {
        return response.json();
      })
      .then(answer => {
        return answer.hits;
      })
      .catch(error => {
        console.log('Error');
      });
  }

  increasePage() {
    return (this.page += 1);
  }

  decreasePage() {
    return (this.page -= 1);
  }

  dropPage() {
    this.page = 1;
  }
}
