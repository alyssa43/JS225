// 1. Write a function named `greet` that takes two arguments and logs a greeting:

function greet(greeting, name) {
  console.log(`${greeting[0].toUpperCase()}${greeting.slice(1)}, ${name}!`);
}

// Expected Output:
greet('howdy', 'Joe'); // Howdy, Joe!
greet('good morning', 'Sue'); // Good morning, Sue!

// 2. Use the `partial` function shown in the assignment and your solution to problem 1 to create `sayHello` and `sayHi` functions that work like this (expected output):

function partial(primary, arg1) {
  return function(arg2) {
    return primary(arg1, arg2);
  };
}

let sayHello = partial(greet, 'hello');
let sayHi = partial(greet, 'hi');

// Expected Output:
sayHello('Brandon'); // Hello, Brandon!
sayHi('Sarah'); // Hi, Sarah!