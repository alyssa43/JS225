// 1: Our desired output for the code below is: `Christopher Turk is a Surgeon`. What will the code output, and what explains the difference, if any, between the actual and desired outputs?

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return `${this.firstName} ${this.lastName} is a ${this.occupation}.`;
//   },
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription); // undefined undefined is a undefined.

// ANSWER: The reason we are seeing this is because we are "extracting" the `getDescription` method from the `turk` object and passing that function as the argument to the `logReturnVal`. At this point, this returned function is no longer "bound" to the `turk` object. Then, from within the `logReturnVal` function we call this passed in function. Because we call it without an explicit context, it means the context is the global object.

// 2. Alter `logReturnVal` such that it takes an additional `context` argument, and use one of the methods we've learned in this lesson to invoke `func` inside of `logReturnVal` with `context` as its function execution context. Alter the invocation of `logReturnVal` and supply `turk` as the context argument.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return `${this.firstName} ${this.lastName} is a ${this.occupation}.`;
//   },
// };

// function logReturnVal(func, context) {
//   let returnVal = func.call(context);
//   console.log(returnVal);
// }

// logReturnVal(turk.getDescription, turk);

// 3. Suppose that we want to extract `getDescription` from `turk`, but always have it execute with `turk` as context. Use one of the methods we've learned in the last lesson to assign such a permanently bound funciton to a new variable, `getTurkDescription`.

// let turk = {
//   firstName: 'Christopher',
//   lastName: 'Turk',
//   occupation: 'Surgeon',
//   getDescription() {
//     return `${this.firstName} ${this.lastName} is a ${this.occupation}.`;
//   },
// };

// function logReturnVal(func) {
//   let returnVal = func();
//   console.log(returnVal);
// }

// let getTurkDescription = turk.getDescription.bind(turk)
// logReturnVal(getTurkDescription);

// 4. Consider the code below, and our desired output:

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ' ' + title);
//     });
//   },
// };

// TESgames.listGames();

// Desired output:
// The Elder Scrolls Arena
// The Elder Scrolls Daggerfall
// The Elder Scrolls Morrowind
// The Elder Scrolls Oblivion
// The Elder Scrolls Skyrim

// Will this code log our desired output? Why or why not?

// ANSWER: No, this will not log our desired output. This is because of how we pass the function argument to the `forEach` invocation. When we pass in the anonymous function as the callback to `forEach`, that function loses the context of `this`, that it was previously. So, now from within the anonymous function `this` is the global object.

// 5. Use an arrow function so that the code logs our desired output.

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(title => console.log(this.seriesTitle + ' ' + title));
//   },
// };

// TESgames.listGames();

// 6. Use the `let self = this` fix to alter `TESgames.listGames` such that it logs our desired output to the console.

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     let self = this;
//     this.titles.forEach(function(title) {
//       console.log(self.seriesTitle + ' ' + title);
//     });
//   },
// };

// TESgames.listGames();

// 7. If we don't want to rely on `let self = this`, `forEach` provides us with an alternative means of supplying execution sontext to the inner function. Use this means to achieve our desired output.

// let TESgames = {
//   titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
//   seriesTitle: 'The Elder Scrolls',
//   listGames() {
//     this.titles.forEach(function(title) {
//       console.log(this.seriesTitle + ' ' + title);
//     }, this);
//   },
// };

// TESgames.listGames();

// 8. Consider the code below:

// let foo = {
//   a: 0,
//   incrementA() {
//     function increment() {
//       this.a += 1;
//     }

//     increment();
//   },
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();

// What will the value of `foo.a` be after this code has executed?

// ANSWER: `foo.a` will still have a value of `0` after this code has been executed. This is because we lose context after we nest another function within the `incrementA` method. This means `this` is no longer the `foo` object but instead it is now the global object. 

// 9. Use one of the methods we learned in this lesson to invoke `increment` with explicit context such that `foo.a` is incremented with each invocation of `incrementA`.

// let foo = {
//   a: 0,
//   incrementA() {
//     let self = this;
//     function increment() {
//       self.a += 1;
//     }

//     increment();
//   },
// };

// foo.incrementA();
// foo.incrementA();
// foo.incrementA();
// console.log(foo.a)

// 10. We decide that we want each invocation of `foo.incrementA` to increment `foo.a` by `3`, rather than `1`, and alter our code accordingly:

let foo = {
  a: 0,
  incrementA() {
    let increment = function() {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  },
};


// Calling `apply` three times seems repetitive, though. Use `bind` to permanently set `foo` as `increment`s execution context.




