// 1. Use the method we learned about to assign `foo` below to a new Object with `prot` as its prototype.

// let prot = {};

// let foo = Object.create(prot);

// 2. Use `getPrototypeOf` to demonstrate the prototypal relationship between `prot` and `foo`.

// console.log(Object.getPrototypeOf(foo) === prot); // true

// 3. Use `isPrototypeOf` to demonstrate the prototypal relationship between `prot` and `foo`.

// console.log(prot.isPrototypeOf(foo)); // true

// 4. What will the last two lines of the code below return? Why?

let prot = {};

let foo = Object.create(prot);

prot.isPrototypeOf(foo); 
// This returns true. This is because we used `Object.create` when creating `foo` to assign it's object prototype to `prot`.

Object.prototype.isPrototypeOf(foo);
// This returns true. This is because (mostly) all objects in JavaScript have `Object.prototype` in their prototype chain. 