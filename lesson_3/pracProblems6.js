// Use Chrome Snippets for this assignment

// 1. What will the code below output?

// function foo() {
//   return this;
// }

// let context = foo();
// console.log(context);

// ANSWER: window

//2. What will the code in the previous question output in strict mode??

// ANSWER: undefined

// 3. What will the code below output? Explain the difference, if any, between this output and that of problem 1.

let obj = {
  foo() {
    return this;
  },
};

let context = obj.foo();
console.log(context);

// ANSWER: This will output the `obj` object. The reason for this difference is that we are invoking the `foo` method from within the `obj` object. This means the execution context for the `foo` method invocation is the `obj` object, and hence what `this` references in this example.

// 4. What will the code below output?

var message = 'Hello from the global scope!';

function deliverMessage() {
  console.log(this.message);
}

deliverMessage(); // Hello from the global scope

let bar = {
  message: 'Hello from the function scope!',
};

bar.deliverMessage = deliverMessage;
bar.deliverMessage(); // Hello from the function scope!

// ANSWER: The reason for these different outputs is because of *how* they are being invoked. In the first `deliverMessage` invocation, the execution context is the global object, which is why when JS searches the global object for a `message` property it find the variable created on the first line (because `var` variables create a property on the global object--or in this case the `Window` object.) In the second `deliverMessage` invocation, we are actually invoking it as a method of the `bar` object. This means the execution context for this invocation is `bar` and thus, `this` references the `bar` object.

// 5. What will the code below output? What would happen if we replaced `var` on line 1 with `let`? Can you explain why the output changes?

var a = 10;
let b = 10;
let c = {
  a: -10,
  b: -10,
};

function add() {
  return this.a + b;
}

c.add = add;

console.log(add()); // 20
console.log(c.add()); // 0

// ANSWER: In this example we invoke `add` two times. On the first invocation we are invoking the function and the execution context is the global object. So, when JS resolves `this.a` from the global object execution context it searches the `Window` object for a property named `a` (which it has because we created that on the first line by using the `var` keyword to declare that variable), and thus, the return value for `this.a` is 10. We then use regular variable scoping rules to resolve the `b` variable which was declared on the second line of our code, with a value of `10`. Hence `20` is returned. On the second invocation we are invoking the `add` method from within the `c` object which means the execution context is the `c` object. So, when JS resolves `this.a` it searches within the `c` object for a property named `a`, which is finds and has a value of `-10`. And, same as the previous invocation, `b` is resolved using normal variable scoping rules where `10` is the value found, and hence `0` is the returned value by the method invocation.
// If we replaced line 1 ` var` with `let`, we wouldn't have created an `a` property on the global object, so when JS searches for an `a` property on the global object it would not be found and `undefined` would be returned. Then when we add `undefined` with `10` we would get `NaN`. The second invocation wouldn't change.

// 6. The problems above all feature implicit function execution context. What methods have we learned so far that let us explicitly specify what a function's execution context should be?

// ANSWER: `call` and `apply`

// 7. In the code below, use `call` to invoke `bar.add` as a method but with `foo` as the execution context. What will this return?

let foo = {
  a: 1,
  b: 2,
};

let bar = {
  a: 'abc',
  b: 'def',
  add() {
    return this.a + this.b;
  },
};

// ANSWER: 
bar.add.call(foo); // 3

// 8. Given the code and desired output shown below, should you use `call` or `apply` to supply explicitl context and the arguments to `outputList`? This is, which method makes the most sense to use? Implement a solution using your preferred method such that the desired output is logged, and explain your choice.

let fruitsObj = {
  list: ['Apple', 'Banana', 'Grapefruit', 'Pineapple', 'Orange'],
  title: 'A Collection of Fruit',
};

function outputList() {
  console.log(this.title + ':');

  let args = [].slice.call(arguments);

  args.forEach(function(elem) {
    console.log(elem);
  });
}

// ANSWER:
outputList.apply(fruitsObj, fruitsObj.list)

// // I chose tp use `apply` since the second argument passed in was an array.

// 9. For an extra challenge, consider this line of code from the previous problem:

let args = [].slice.call(arguments);

// Insdie of JS functions, `arguments` is an object that holds all of the arguments passed to the function. Bearing in mind that the function author wants to iterate over the arguments later in the method using an `Array` method, why do you think he or she is invoking `call`?

// ANSWER: 
// Because the `arguments` object is an "array-like" structure, however it is not an `Array`, so `forEach` would not work to iterate over it. So by using `call` in conjuction with `slice` it creates an array from the `arguments` object that is an actual array and can use `Array` methods on. 
// However, this syntax is not the syntax I would use to accomplish this. I would, instead, use modern JS and define the parameters using the rest syntax so that JS creates an `Array` of all arguments passed in upon invocation:

function outputList(...args) {
  console.log(this.title + ':');
  args.forEach(arg => console.log(arg));
}
