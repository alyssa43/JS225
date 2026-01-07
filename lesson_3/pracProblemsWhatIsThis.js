// Use Chrome Snippets for this assignment

// 1. What does `this` point to in the code below?

// function whatIsMyContext() {
//   return this;
// }

// ANSWER: We won't know the context of a function until execution time. Thus, we don't know what the context is here.

// 2. What does `this` point to in the code below?

// function whatIsMyContext() {
//   return this;
// }

// whatIsMyContext();

// ANSWER: Function calls set the execution context to the implicit global object, or global context for short. When we use the global object implicitly to call a function, we call it with the global context. Functions called inside a browser environment use the `window` object as the implicit global context, so `this` is the `window` object inside the function. In strict mode, however, the global context is the value `undefined`.

// 3. What does `this` point to in the code below?

// function foo() {
//   function bar() {
//     function baz() {
//       console.log(this);
//     }

//     baz();
//   }

//   bar();
// }

// foo();

// ANSWER: `this` is the global object in a function invocation, so when we invoke the `foo` function the execution context is the implicit global object, and since we are using Chrome Snippets the global object is the `window` object. Since `foo` only contains nested function declarations and invocations of those functions, the context remains the global object for all of the function invocations.

// 4. What does `this` point to in the code below?

// let obj = {
//   count: 2,
//   method() {
//     return this.count;
//   },
// };

// obj.method();

// ANSWER: `this` is the `obj` object in this example. Because we call `method` on the object `obj`, `this` is the `obj` object.

// 5. In strict mode, what does the following program log to the console?

// function foo() {
//   console.log(this.a);
// }

// let a = 2;
// foo();

// ANSWER: In strict mode this would raise a `TypeError` because `this` would be referencing `undefined` and we cannot access a property of `undefined`.

// 6. What does the following program log to the console?

// let a = 1;

// function bar() {
//   console.log(this.a);
// }

// let obj = {
//   a: 2,
//   foo: bar,
// };

// obj.foo();

// ANSWER: This code will log `2`, because we call the `foo` method with its context set to `obj` since the execution context for any method invoked without an explicit context provided is the calling object.

// 7. What does the following code log to the console?

// let foo = {
//   a: 1,
//   bar() {
//     console.log(this.baz());
//   },

//   baz() {
//     return this;
//   },
// };

// foo.bar(); // foo
// let qux = foo.bar;
// qux(); // TypeError

// ANSWER: This code will log the `foo` object and then raise a `TypeError`. The first output is from invoking `foo.bar()`. Because we explicitly call `bar` with the `foo` object, the execution context for that method invocation is the `foo` object. So within `bar`, `this` references `foo`, which we then use to invoke the `baz` method, which then returns the calling object, `foo`. The `TypeError` is raised when we extract the `bar` method outside of the `foo` object and in the global scope and save into a variable called `qux`. We then invoke `qux` without an explicit execution context, which means the context will be the global object `window`. So, within `bar`, we attempt to call `baz` on the calling object, but `window` doesn't have a `baz` method, which raises the `TypeError`.