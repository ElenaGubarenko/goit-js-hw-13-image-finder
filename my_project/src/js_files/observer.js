// export default class Observer {
//   constructor() {
//     this.targetRef = document.querySelector('.target');
//     this.options = {
//       treshold: 0.5,
//     };
//     this.entries = entries;
//   }

//   callback = (entries, observer) => {
//     if (entries[0].isIntersecting) {
//       newImagePage.increasePage();
//       render();
//     }
//   };

//   observe() {
//     const observer = new IntersectionObserver(
//       callback(entries, observer),
//       this.options,
//     );
//     observer.observe(this.targetRef);
//   }
// }
