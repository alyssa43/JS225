// 1. Write a function named `makeMultpleLister` that, when invoked and passed a number, returns a function that logs every positive integer multiple of that number less than 100. Usage looks like this:

// > let lister = makeMultipleLister(13);
// > lister();
// 13
// 26
// 39
// 52
// 65
// 78
// 91

// function makeMultipleLister(num) {
//   return function () {
//     for (let i = num; i < 100; i += num) {
//       console.log(i);
//     }
//   }
// }

// let lister = makeMultipleLister(13)
// lister();

// 2. Write a program that uses two functions, `add` and `subtract`, to manipulate a running total value. When you invoke either function with a number, it should add or subtract that number from the running total and log the new total to the console. Usage looks like this:

// > add(1);
// 1
// > add(42);
// 43
// > subtract(39);
// 4
// > add(6);
// 10

// let total = 0;

// function add(num) {
//   total += num;
//   console.log(total);
// }

// function subtract(num) {
//   total -= num;
//   console.log(total);
// }

// add(1)
// add(42)
// subtract(39)
// add(6)

// 3. Given the following code:

// function startup() {
//   let status = 'ready';
//   return function() {
//     console.log('The system is ready.');
//   };
// }

// let ready = startup();
// let systemStatus = ?

// Is there a way to set the value of `systemStatus` to the value of the inner variable `status` without changing `startup` in any way? If so, how?

// No, we cannt access the value of `systemStatus` outside of the `startup` function because it contained within the closure created when it is invoked.

