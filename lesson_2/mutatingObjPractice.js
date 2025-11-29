// // 1.  What will the code below output to the console?

// let message = 'Hello from the global scope!';

// function func(message) {
//   message = 'Hello from the function scope!';
//   console.log(message);
// }

// func(message); // Hello from the function scope!
// console.log(message); // Hello from the global scope!

// // We see this output because we declare a globally scoped `message` variable, which we then pass in as the argument to the `func` function invoacation. Because the `func` function definition has a parameter called `message` we have created a second `message` variable, however this `message` variable is scoped to the `func` function. This creates variable shadowing and means that if we wanted to reassign the globally scoped `message` variable we would be unable to be JS is only able to access the function scoped `message` variable from within the `func` function definition. We then reassign the function scoped `messgae` varialbe to reference the string `'Hello from the function scope!'`, which is then logged to the console on the next line. Then, we we return to the global scope when we refernce `message` JS uses the globally scoped `message` variable which still has the value of `'Hello from the global scope!'`

// // 2. What will the code below log to the console? What does this output demonstrate in relation to the output of problem one?

// let myObj = { message: 'Greetings from the global scope!' };

// function func(obj) {
//   obj.message = 'Greetings from the function scope!';
//   console.log(obj.message);
// }

// func(myObj); // Greetings from the function scope!

// console.log(myObj.message); // Greetings from the function scope!

// // This output demonstrates how arguments are passed in JS. When the argument passed into a function invocation has a value of a refernce to an object, the parameter associated with that argument recieves a value of a refernces to that same object. This means when we pass the `myObj` variable as the argument to the `func` function invocation, the `obj` parameter is initially assigned the value of the reference to the location of the `myObj` object. So, once we get within the `func` function definition the `obj` function variable and globally scoped `myObj` are currently referencing the same object in memory. So, when we reassign the `message` property of that object, the globally scoped `myObj` variable sees the same changes because they reference the same object.

// // 3. What will the code below log to the console?

// let message = 'Hello from the global scope!';

// function func() {
//   message = 'Hello from the function scope!';
//   console.log(message);
// }

// func(); // Hello from the function scope!
// console.log(message); // Hello from the function scope!

// // We see this output because we have 1 `message` variable in this example. We declare and initialize it in the global scope and assign it the value of the string `'Hello from the global scope!'`. However, when we invoke the `func` function because we do not declare a new variable (using `let`, `var`, or `const`) we are actually reassigning the globally scoped `message` variable.

// // 4. What will the code log to the console?

// let a = 10;
// let obj = {
//   a
// }

// let newObj = obj;
// newObj.a += 10;

// console.log(obj.a === a); // false
// console.log(newObj.a === obj.a); // true

// // In this example we use the object property shorthand to cerate the object literal `obj`. JS allows us to use this concise object property assignment by using a variable (`a`) to create a property with the same name and the value that is referenced by that variable. This essentially gives us the object literal `{ a: 10 }`. We then create a new variable called `newObj` that is assigned the value of `obj`. Becasue the value of the `obj` variable is a reference to the object in memory, when we assign `newObj` to `obj` we are assigning its value to also be a reference to the same object in memory. Meaning the `obj` and `newObj` are referencing the same object in memory. We then increment the value of `a` from `newObj` and reassign the value of `a` to that value, which is `20`. And, because `newObj` and `obj` reference the same object in memory, they both see this change. Also, the globally scoped `a` variable hasn't been reassigned at any point so it still has a value of `10` which is why it is NOT equal to the `a` property of `obj`. And, as previously stated, because `newObj` and `obj` reference the same object in memory, of course their `a` properties will return true when testing their equality. In fact, if we were to test the equality of both objects (`newObj === obj`) that too, would return true.

// // 5. Consider the code below:

// let animal = {
//   name: 'Pumbaa',
//   species: 'Phacochoerus africanus',
// };

// let menagerie = {
//   warthog: animal,
// };

// animal = {
//   name: 'Timon',
//   species: 'Suricata suricatta',
// };

// menagerie.meerkat = animal;

// menagerie.warthog === animal; // false
// menagerie.meerkat === animal; // true

// // If objects are mutable, why does the second to last line return false?

// // In this example we start by creating a globally scoped variable called `animal` whose value is a reference to an object literal. We then create another globally scoped variable called `menagerie` with one property called `warthog` that has a value of the reference to the `animal` ojbect literal we previously created. We then reassign the globally scoped `animal` variable we previously created to now have a new value of a reference to a new object literal. By reassigning the globally scoped `animal` variable we have not mutated the `animal` variable--it just points to a new object in memory now. However, the `warthog` property of the `menagerie` object still holds the same reference to the previous `animal` object. Then we create a new property in the `menagerie` object called `meerkat` and assign it to reference the current value of `animal`, which as previously stated has been reassigned to a new object in memory. This means that the `meerkate` property has a value of a reference to the same object that the reassigned `animal` variable also has. This demonstrates the difference between reassignment and mutation of objects, and specifically how non-primitive variables values are references to an object in memory.
