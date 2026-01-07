// While working through these practice problems, assume that the code runs within a web page.

// 1. What does `this` point to in the code below, and what does the method return?

// let myObject = {
//   count: 1,
//   myChildObject: {
//     myMethod() {
//       return this.count;
//     },
//   },
// };

// myObject.myChildObject.myMethod();

// ANSWER: This code will return `undefined` because `this` is pointing to `myChildObject` and the `myChildObject` doesn't have a `count` prooperty so when we attempt to access it we get `undefined`.

// 2. In the previous problem, how would you change the context, or the value of `this`, to `myObject`?

// let myObject = {
//   count: 1,
//   myChildObject: {
//     myMethod() {
//       return this.count;
//     },
//   },
// };

// console.log(myObject.myChildObject.myMethod.call(myObject));

// 3. What does the following code log to the console?

// let person = {
//   firstName: 'Peter',
//   lastName: 'Parker',
//   fullName() {
//     console.log(`${this.firstName} ${this.lastName} is the Amazing Spiderman!`);
//   },
// };

// let whoIsSpiderman = person.fullName.bind(person);
// whoIsSpiderman();

// This code will log `Peter Parker is the Amazing Spiderman!`. This is because we used `bind` to hard bind the `person` object as the context when we invoke the `whoIsSpiderman` function.

// 4. What does the following code log to the console?

// let computer = {
//   price: 30000,
//   shipping: 2000,
//   total() {
//     let tax = 3000;
//     let self = this; // add this line to fix
//     function specialDisount() {
//       if (self.price > 20000) {
//         return 1000;
//       } else {
//         return 0;
//       }
//     }

//     return this.price + this.shipping + tax - specialDisount();
//   }
// };

// console.log(computer.total());

// ANSWER: This code will log `35000`.

function helloFactory() {
  return function(name) {
    console.log(`Hi, ${name}`);
  };
}

helloFactory()('Alyssa');

let hello = helloFactory();
hello('Alyssa');