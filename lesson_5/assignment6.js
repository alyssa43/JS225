// 1. What naming convention separates constructor functions from other functions? 

// ANSWER: Constructor functions typically begin with a capital letter, although this is not required. It is a convention to let the intent be known that it is to be used as a constructor function.

// 2. What will the code below output? Why?

// function Lizard() {
//   this.scamper = function() {
//     console.log("I'm scampering!");
//   };
// }

// let lizzy = Lizard();
// lizzy.scamper(); // ?

// ANSWER: This code will result in a `TypeError`. What is happening here is that because we invoke the `Lizard` constructor function as a typical function (`Lizard()`), instead of with using the `new` keyword, the `Lizard` function runs and doesn't return anything, which means it's return value is `undefined`. We then save this return value into the variable `lizzy`. So, when we try to access the `scamper` property of `lizzy` we get a `TypeError` because we cannot read properties of `undefined`. It is also important to note that when we invoked the `Lizard` function as a typically function, there was no execution context set, so `this` inside the function definition references the global object (or `undefined` in strict mode), which then creates a `scamper` property on the global object, which is not we intended to do.

// 3. Alter the code in problem 2 so that it produces the desired output.

function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // I'm scampering!