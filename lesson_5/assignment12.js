// 1. What does the following code log to the console?

// let a = 1;
// let foo;
// let obj;

// function Foo() {
//   this.a = 2;
//   this.bar = function() {
//     console.log(this.a);
//   };
//   this.bar();
// }

// foo = new Foo(); // Create new instance of Foo and outputs 2

// foo.bar(); // 2
// Foo(); // calling Foo as a typical function creates properties on the global object and outputs 2

// obj = {};
// Foo.call(obj); // Invoking Foo using `call` and setting context to `obj` creates properties on the `obj` object and outputs 2
// obj.bar(); // 2

// console.log(this.a); // 2 (to run in file `this.a` needs to be `global.a`)

// 2. What does the following code log to the console?

// let RECTANGLE = {
//   area () {
//     return this.width * this.height;
//   },
//   perimeter() {
//     return 2 * (this.width + this.height);
//   },
// };

// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area = RECTANGLE.area();
//   this.perimeter = RECTANGLE.perimeter();
// }

// let rect1 = new Rectangle(2, 3);
// console.log(rect1.area);
// console.log(rect1.perimeter);

// ANSWER: We we call `RECTANGLE.area()` from within the `Rectangle` constructor function the context would be the `RECTANGLE` object, which does not have `width` or `height` properties. So when we attempt to access those properties we get a return value of `undefined`. Then we are attempting to multiply `undefined * undefined` which results in `NaN`, and that is the value that is returned by `area`. The same thing happens within the `perimeter` method and this means that both the `area` and `perimeter` properties of `rect1` will both be `NaN`.

// How do you fix this problem?

// We can use `call` to set the context explicitly like so:

let RECTANGLE = {
  area () {
    return this.width * this.height;
  },
  perimeter() {
    return 2 * (this.width + this.height);
  },
};

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
  this.area = RECTANGLE.area.call(this);
  this.perimeter = RECTANGLE.perimeter.call(this);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area);
console.log(rect1.perimeter);

// 3. Write a constructor function `Circle`, that takes a `radius` as an argument. You should be able to call an `area` method on the created objects to get the circle's area. Test your implementation with the following code:

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
}

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // 28.27
console.log(b.area().toFixed(2)); // 50.27

// 4. What will the following code log out and why?

// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword());

// ANSWER: This code will log `true`. Here we create a new instance of `Ninja` when we call `new Ninja()` and save that object into the `ninja` variable. From there we create a new property of the `Ninja` function prototype called `swingSword`, this means that all objects created from the `Ninja` constructor function will now have access to this method via their object prototype. So, when we invoke `swingSword` on `ninja` JS first looks within the `ninja` object where it does not find it. From there it looks in the object prototype, which is `Ninja.prototype` we it is found. Then we access the `swung` property for the `ninja` object (which was assigned `true` when we created it), and then that value is returned and output to the console.

// 5. What will the following code log out and why?

// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype = {
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());

// ANSWER: This code will raise a `TypeError` because JavaScript could not find a `swingSword` method within the `ninja` object or in it's prototype chain. What happened is, when we created the new instance of `Ninja` (`ninja`) it's object prototype referenced the `Ninja.prototype`. However, on the next lines we actually reassign `Ninja.prototype` to a completely new object, which means the `Ninja` function prototype is now different than it was originally. But, the `ninja`s object prototype never did get reassigned, it is still referencing the original `Ninja.prototype`, so it doesn't have access to the `swingSword` method.

// 6. Implement the method described in the comments below:

// let ninjaA;
// let ninjaB;
// function Ninja() {
//   this.swung = false;
// }

// ninjaA = new Ninja();
// ninjaB = new Ninja();

// // Add a swing method to the Ninja prototype which returns the calling object and modifies swung

// Ninja.prototype.swing = function () {
//   this.swung = true;
//   return this;
// }
// console.log(ninjaA.swung)
// console.log(ninjaA.swing().swung); // true
// console.log(ninjaB.swing().swung); // true

// 7. In this problem, we'll ask you to create a new instance of an object, without having direct access to the constructor function:

let ninjaA = (function() {
  function Ninja(){};
  return new Ninja();
})();

// create a ninjaB object
let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));

console.log(ninjaB.constructor === ninjaA.constructor)