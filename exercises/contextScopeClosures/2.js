// The method `franchise.allMovies` is supposed to return the following array:

// [
//   'How to Train Your Dragon 1',
//   'How to Train Your Dragon 2',
//   'How to Train Your Dragon 3'
// ]

// Explain why this method will not return the desired object. Try fixing this problem by taking advantage of JS lexical scoping rules.

// const franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies() {
//     return [1, 2, 3].map(function(number) {
//       return `${this.name} ${number}`;
//     });
//   },
// };

// ANSWER: This method will not return the desired object because within the `allMovies` function when we call `map` and pass in an anonymous callback function the reference of `this` changes from the `franchise` object to the global object. To fix this we can create a local variable in the `allMovies` function to reference `this` (which will be the `franchise` object), and then use that variable within the anonymous callback function passed to `map`, like so:

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    const self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};

// OR, we could simply use an arrow function like so:

// const franchise = {
//   name: 'How to Train Your Dragon',
//   allMovies() {
//     return [1, 2, 3].map(num => `${this.name} ${num}`);
//   },
// };

// This is because the value of `this` when using an arrow function is the current value of `this` in the defining function.