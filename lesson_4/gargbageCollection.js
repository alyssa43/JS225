// 1. Is JS a garbage-collected language, and if so, what does this entail?

// ANSWER: Yes, JS uses garbage collection to manage memory. The JS runtimes automatically handles this for the developer. When new objects and primitive values are created JS runtime gets memory from the system. When the program no longer needs (or references) those values JS marks the memory as eligible for GC.

// 2. Consider the code below:

let myNum = 1;

function foo() {
  let myArr = ['this is an array'];
  // what is eligible for GC here?
}

foo();

// What is eligible for GC here?

// more code

// Are either of the values `1` or `['this is an array']` eligible for garbage collection on line 11? What about line 16?

// ANSWER: Neither value is eligible for GC on line 11. Since variables that contain numbers are stored on the stack, the value `1` is never eligible for GC. The array is also not eligible for GC since it is still references by the `myArr` variable. `['this is an array']` is eligible for GC on line 16. Since `myArr` is function-scoped, the variable's reference to `['this is an array']` is broken after the function finishes running.

// 3. Consider the code below:

function makeGreeting() {
  let foo = { greeting: 'hello' };
  return function(name) {
    foo.name = name;
    return foo;
  };
}

let greeting = makeGreeting();

// is the object eligible for GC here?

// more code

// Is the object created and assigned to `foo` on line 27 eligible for GC on line 36?

// ANSWER: No, the object is not eligible for GC. Because the function returned by `makeGreeting` that is now the value of `greeting` needs access to the `foo` variable means that it is included in it's closure. This way when `greeting` is invoked it is able to access (and return) the object referenced by `foo`.