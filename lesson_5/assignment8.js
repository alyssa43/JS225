// 1. What will the code below log to the console?

// let foo = {};
// let bar = Object.create(foo);

// foo.a = 1;

// console.log(bar.a);

// ANSWER: This code will log 1

// 2. What will the code below log to the console?

let foo = {};
let bar = Object.create(foo);

foo.a = 1;
bar.a = 2;
console.log(bar.a);

// ANSWER: This code will log 2

// 3. Given the code below, do we know for certain that on the last line we are ultimately referencing a property owned by boo? How can we test that `far` is not delegating to `boo`?

let boo = {};
boo.myProp = 1;

let far = Object.create(boo);

// lots of code

far.myProp; // 1

// ANSWER: No, we do not know for certain the the `myProp` property is owned by `boo`. It is possible that `far` overwrote the `myProp` property somewhere in the code. If we want to determine if `myProp` belongs to `far`, we can use `hasOwnProperty` to determine this:

console.log(far.hasOwnProperty('myProp')); // false