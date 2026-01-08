// 1. Use partial function application to implement a function, `makeSub`, that returns a function that subtracts `5` from the argument passed to the return function.

function subtract(a, b) {
  return a - b;
}

function makeSub() {
  // implement this function using partial function application
  return function(a) {
    return subtract(a, 5);
  };
}

const sub5 = makeSub();

console.log(sub5(10)); // 5
console.log(sub5(20)); // 15

// 2. This code is a bit limited however, because we can only subtract by `5`. Implement the `makeSubN` function below so that we can supply any value we want to be subtracted from `a`, and get a new function that will always subtract this value.

function makeSubN(n) {
  // implement this function using partial function application
  return function(a) {
    return subtract(a, n);
  };
}

const sub4 = makeSubN(4);
const sub7 = makeSubN(7);

console.log(sub4(10)); // 6
console.log(sub4(20)); // 16
console.log(sub7(10)); // 3
console.log(sub4(20)); // 13

// 3. Although the solution above is more flexible, we now want to be able to supply any operation, not just subtraction. Implement `makePartialFunc` below.

function makePartialFunc(func, b) {
  // implement this function...
  return function(a) {
    return func(a, b);
  };
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let multiplyBy5 = makePartialFunc(multiply, 5);
let dividBy2 = makePartialFunc(divide, 2);

console.log(multiplyBy5(100)); // 500
console.log(dividBy2(100)); // 50

// 4. In our previous solution, `multiplyBy5` retains access to `func` and `b` long after `makePartialFunc` has finished execution. What makes this possible?

// ANSWER: `multiplyBy5` retains access to `func` and `b` long after `makePartialFunc` has finished execution because of closures. When we invoke `makePartialFunc` and pass in the `multiply` function and `5` as the arguments, those values, now referenced by `func` and `b`, are "enveloped" into the closure when the function is returned and saved into the `multiplyBy5` variable.

// 5. Consider the code below:

let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(student => console.log(student));
}

function makeMathRollCall() {
  // implement this function...
  return function(students) {
    return rollCall('Math', students);
  };
}

let mathRollCall = makeMathRollCall();
mathRollCall(subjects['Math']);
// => Math:
// => Fatima
// => Gary
// => Susan

// Implement `makeMathRollCall` such that it returns a partially applied `rollCall` function, with the `subject` as `'Math'`.