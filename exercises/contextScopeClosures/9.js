// const greeter = (function(name, greeting) {
//   return {
//     message: `${greeting} ${name}!`,
//     sayGreetings() {
//       console.log(this.message);
//     },
//   };
// })('Naveed', 'Hello');

// OR:

const greeter = (function() {
  const name = 'Naveed';
  const greeting = 'Hello';

  return {
    message: `${greeting} ${name}!`,
    sayGreetings() {
      console.log(this.message);
    },
  };
})();

greeter.sayGreetings();


// LS Solution:
// const greeter = {
//   message: (() => {
//     const name = 'Naveed';
//     const greeting = 'Hello';

//     return `${greeting} ${name}!`;
//   })(),

//   sayGreetings() {
//     console.log(this.message);
//   }
// };