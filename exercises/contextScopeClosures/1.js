// Read the following code carefully. What do you think is logged on line 9? Try to answer the question before you run the code.

const person = {
  firstName: 'Rick',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
};

console.log(person.fullName);

// ANSWER: This code will log `NaN` to the console. This happens because we are using `this` outside of a function, which will always reference the global object. And, because we don't have a `firstName` or `lastName` property on the global object, the `fullName` property is evaluating `undefined + undefined`, which as we can see returns `NaN`.