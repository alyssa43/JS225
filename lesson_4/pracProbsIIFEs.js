// 1. Will the code below execute?

// function() {
//   console.log("Sometimes, syntax isn't intuitive!");
// }();

// No, this code will not execute because we are attempting to have an unnamed function declaration, which is invalid syntax in JS.

// 2. Edit the code from problem one so it execute without error.

(function() {
  console.log("Sometimes, syntax isn't intuitive!");
})();

// 3. The code below throws an error:

// var sum = 0;
// var numbers;

// sum += 10;
// sum += 31;

// numbers = [1, 7, -3, 3];

// function sum(arr) {
//   return arr.reduce(function(sum, number) {
//     sum += number;
//     return sum;
//   }, 0);
// }

// sum += sum(numbers); // ?

// What kind of problem does this error highlight? Use an IIFE to address it, so that code runs without error.

// ANSWER: The problem with the above code is that because the `sum` function declaration gets hoisted to the top of the scope during the creation phase, then during the execution phase `sum` gets reassigned to a value of 0. That function is no longer referenced and then marked for GC and completely inaccessible. 

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function(arr) {
  return arr.reduce((sum, number) => {
    return sum += number;
  }, 0);
})(numbers);

// 4. Consider the output below:

// countdown(7);
// 7
// 6
// 5
// 4
// 3
// 2
// 1
// 0
// Done!

// Implement a function `countdown` that uses an IIFE to generate the desired output.

function countdown(count) {
  (function(n) {
    for (let i = n; i >= 0; i -= 1) {
      console.log(i);
    }

    console.log('Done!');
  })(count);
}

countdown(7);


// 5. Is the named function in this IIFE accessible in the global scope?

(function foo() {
  console.log('Bar');
})();

foo() // ?

// ANSWER: No, `foo` is NOT accessible in the global scope. Because the named function resides within a function expression it is out of scope in the global scope.

// 6. For an extra challenge, refactor the solution to problem 4 using recursion, bearing in mind that a named function created in an IIFE can be referenced inside of the IIFE.

function countdown(count) {
  (function recursiveSub(n) {
    console.log(n);
    return n === 0 ? console.log('Done!') : recursiveSub(n - 1);
  })(count);
}

countdown(7);