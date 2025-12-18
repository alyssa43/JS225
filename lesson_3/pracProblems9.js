// // 1. What method can we use to permanently bind a function to a particular execution context?

// // ANSWER: We can use the `Function` method `bind` to permanently bind a function to an execution context.

// // 2. What will the code below log to the console?

// let obj = {
//   message: 'JavaScript',
// };

// function foo() {
//   console.log(this.message);
// }

// foo.bind(obj);

// // ANSWER: This code will not log anything to the console. Here we have invoked `bind` which creates a new function with the permanently changed execution context. However, that function never gets invoked, and therefore never logs anything to the console.

// // 3. What will the code below output?

// let obj = {
//   a: 2,
//   b: 3,
// };

// function foo() {
//   return this.a + this.b;
// }

// let bar = foo.bind(obj);

// console.log(bar());

// // ANSWER: This code will output: 5

// // 4. What will the code below log to the console?

// let positiveMentality = {
//   message: 'JavaScript makes sense!',
// };

// let negativeMentality = {
//   message: 'JavaScript makes no sense!',
// };

// function foo() {
//   console.log(this.message);
// }

// let bar = foo.bind(positiveMentality);

// negativeMentality.logMessage = bar;
// negativeMentality.logMessage();

// // ANSWER: This code will output: JavaScript makes sense!
// // This is because we use `bind` to permanently bind the `positiveMentality` object as the context whenever `bar` is invoked. So, even whe we assign `bar` as a property of the `negativeMentality` object, the execution context will still always be the `positiveMentality` object.

// // 5. What will the code below output?

// let obj = {
//   a: 'Amazebulous!',
// };

// let otherObj = {
//   a: "That's not a real word!",
// };

// function foo() {
//   console.log(this.a);
// }

// let bar = foo.bind(obj);

// bar.call(otherObj);

// // ANSWER: The code will log: `Amazebulous!`
// // Similarly to the previous question, this is because we use `bind` to permanently bind the `obj` object as the context whenever `bar` is invoked. So, even though we use `call` to try and change the context to `otherObj` we are unsuccessful because `bind` permanently binds the context.
