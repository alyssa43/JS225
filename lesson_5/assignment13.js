// 1. Follow the steps below:

// A. Create an object called `shape` that has a `getType` method.
// B. Define a `Triangle` constructor function whose prototype is `shape`. Objects created with `Triangle` should have four own properties: `a`, `b`, `c` (representing the sides of a triangle), and `type`.


let shape = {
  getType() {
    return this.constructor.name;
  },
};

function Triangle(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = this.getType;
}

Triangle.prototype = shape;
Triangle.prototype.constructor = Triangle;

Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};

let t = new Triangle(3, 4, 5);
console.log(t.constructor); // [Function: Triangle]
console.log(shape.isPrototypeOf(t)); // true
console.log(t.getPerimeter()); // 12
console.log(t.getType()); // Triangle

// 2. Update the following code so that, instead of logging the values, each statement logs the name of the constructor to which it belongs.

console.log("Hello".constructor.name); // String
console.log([1, 2, 3].constructor.name); // Array
console.log({name: 'Srdjan'}.constructor.name); // Object

// 3. Since a constructor is just a function, it can be called without the `new` operator, and this can lead to unexpected results and errors especially for inexperienced programmers.

// Write a constructor function that can be used with or without the `new` operator, and return the same result in either form. Use the code below to check your solution:

function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.first = first;
  this.last = last;
  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name); // Jane Doe
console.log(user1.name); // John Doe
console.log(user2.name); // John Doe

// 4. Create a function that can create an object with a given object as its prototype, without using `Object.create`.

// function createObject(obj) {
//   function OBJ() {}
//   OBJ.prototype = obj;
//   return new OBJ();
// }

// let foo = {
//   a: 1,
// };

// let bar = createObject(foo);
// console.log(foo.isPrototypeOf(bar)); // true

// 5. Similar to the problem above, without using `Object.create`, create a `begetObject` method that you can call on any object to create an object inherited from it:

let foo = {
  a: 1,
};

Object.prototype.begetObject = function() {
  function OBJ() {}
  OBJ.prototype = this;
  return new OBJ();
}

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar)); // true

// 6. Create a function `neww`, so that it works like the `new` operator. For this practice problem, you may use `Object.create`.

function neww(constructor, args) {
  // return new constructor(...args); // My solution
  // LS solution:
  let object = Object.create(constructor.prototype);
  let result = constructor.apply(object, args);

  return typeof result === 'object' ? result : object;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log(`Hello, ${this.firstName} ${this.lastName}`);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting(); // Hello, John Doe
console.log(john.constructor); // Person