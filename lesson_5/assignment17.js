// 1. Create a class `Cat` that logs the string `I'm a cat!` to the console whenever a new instance is created. Then instantiate a new instance of `Cat` and assign it to a `kitty` variable.

// 2. Using the code from the previous exercise, add a parameter to `constructor` that provides a name for the `Cat` object, and assign this parameter to a property called `name`. If no argument is provided, the `name` should default to `Kitty`. Then, replace the `I'm a cat!` message with a greeting the includes the provided name.

// 3. Using the code from the previous exercise, move the greeting from the `constructor` method to an instance method named `greet` that logs a greeting to the console when invoked. Additionally, define one more instance method named `rename` that renames a `Cat` instance when invoked.

// 4. Using the code from the previous question, write any code necessary so that the string `Hello! I'm a cat!` is logged to the console when `Cat.genericGreeting` is invoked.

// class Cat {
//   constructor(name = 'Kitty') {
//     this.name = name;
//   }

//   greet() {
//     console.log(`Hello! My name is ${this.name}!`);
//   }

//   rename(newName) {
//     this.name = newName;
//   }

//   static genericGreeting() {
//     console.log("Hello! I'm a cat!");
//   }
// }

// let kitty = new Cat();
// kitty.greet(); // Hello! My name is Kitty!
// kitty.rename('Sophie');
// kitty.greet(); // Hello! My name is Sophie!
// Cat.genericGreeting(); // Hello! I'm a cat!

// 5. Create a class `Rectangle`. The constructor should take 2 arguments which represent `width` and `length`, respectively. Implement the class so that the output from the example below is correct.


class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

// 6. Given the class from the previous problem, write a class called `Square` that inherits from `Rectangle`, and implement it to get the below output.

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25

// 7. Without calling the `Cat` constructor, create an object that looks and acts like a `Cat` instance that doesn't have a defined name.

// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//   speaks() {
//     return `${this.name} says meowwww.`;
//   }
// }

// let fakeCat = Object.create(Cat.prototype) // your implementation
// console.log(fakeCat instanceof Cat); // logs true
// console.log(fakeCat.hasOwnProperty('name')); // logs false
// console.log(fakeCat.speaks()); // logs undefined says meowwww.

// 8. Consider the following program:

// Update this code so that when you run it, you see the following output:
// My cat Pudding is 7 years old and has black and white fur.
// My cat Butterscotch is 10 years old and has tan and white fur.

// class Pet {
//   constructor(name, age) {
//     this.name = name;
//     this.age = age;
//   }
// }

// class Cat extends Pet {
//   constructor(name, age, color) {
//     super(name, age);
//     this.color = color;
//   }

//   info() {
//     return `My cat ${this.name} is ${this.age} and has ${this.color} fur.`;
//   }
// }

// let pudding = new Cat('Pudding', 7, 'black and white');
// let butterscotch = new Cat('Butterscotch', 10, 'tan and white');

// console.log(pudding.info());
// console.log(butterscotch.info());

// 9. Given a class `Animal` create two classes `Cat` and `Dog` that inherit from it.
// The `Cat` constructor should take 3 arguments, `name`, `age`, and `status`. Cats should always have a leg count of `4` and a species of `cat`. Also, the `introduce` method should be identical to the inherited one except, after the returned phrase, there should be a single space and the words `Meow meow!`. For example:
// The `Dog` constructor should take 4 arguments, `name`, `age`, `status`, and `master`. Dogs should always have a leg count of `4` and a species of `dog`. Dogs have the same `introduce` method as any other animal, but they have their own method called `greetMaster()`, which accepts no arguments and returns `Hello (master's name)! Woof, woof!`. 

class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }

  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat extends Animal {
  static legCount = 4;
  static species = 'cat';

  constructor(name, age, status) {
    super(name, age, Cat.legCount, Cat.species, status);
  }

  introduce() {
    return `${super.introduce()} Meow meow!`;
  }
}

class Dog extends Animal {
  static legCount = 4;
  static species = 'dog';

  constructor(name, age, status, master) {
    super(name, age, Dog.legCount, Dog.species, status);
    this.master = master;
  }

  greetMaster() {
    return `Hello, ${this.master}! Woof, woof!`;
  }
}

let cat = new Cat("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

let dog = new Dog('Fido', 4, 'happy', 'Joe');
console.log(dog.introduce());
console.log(dog.greetMaster());

// 10. Consider the following classes:
// Refactor these classes so they all use a common superclass, and inherit behavior as needed.

class Vehicle {
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }

  getWheels() {
    return this.constructor.wheels;
  }

  info() {
    return `${this.make} ${this.model}`;
  }
}

class Car extends Vehicle {
  static wheels = 4;

  constructor(make, model) {
    super(make, model)
  }
}

class Motorcycle extends Vehicle {
  static wheels = 2;

  constructor(make, model) {
    super(make, model)
  }
}

class Truck extends Vehicle {
  static wheels = 6;

  constructor(make, model, payload) {
    super(make, model)
    this.payload = payload;
  }
}

let jeep = new Car('Jeep', 'Compass');
console.log(jeep.getWheels())
console.log(jeep.info());

let harley = new Motorcycle('Harley Davidson', 'Street Glide');
console.log(harley.getWheels());
console.log(harley.info());

// 11. What will the following code log?

class Something {
  constructor() {
    this.data = 'Hello';
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return 'ByeBye';
  }
}

let thing = new Something();
console.log(Something.dupData()); // ByeBye
console.log(thing.dupData()); // HelloHello

// 12. Rewrite the two following object types to use the `class` keyword, instead of direct prototype manipulation. `Person` exposes a method `greeting`, which when called returns a greeting text. `Shouter` is a subtype of `Person`, and is a bit loud, so whatever he says is uppercased.

class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    return `Hello, I'm ${this.name}. It's very nice to meet you.`;
  }
}

class Shouter extends Person {
  greeting() {
    return super.greeting().toUpperCase();
  }
}

let person = new Person("Jane");
let shouter = new Shouter("Bob");

console.log(person.greeting()); // Hello, I'm Jane. It's very nice to meet you.
console.log(shouter.greeting()); // HELLO, I'M BOB. IT'S VERY NICE TO MEET YOU.

// 13. Consider the following code:
// Write the classes and methods that will be necessary to make this code run, and log the following output:

class Pet {
  constructor(animal, name) {
    this.animal = animal;
    this.name = name;
  }

  info() {
    return `a ${this.animal} named ${this.name}`;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  adoptPet(pet) {
    this.pets.push(pet);
  }

  printPets() {
    this.pets.forEach(pet => {
      console.log(pet.info());
    });
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.owners = [];
  }

  adopt(owner, pet) {
    owner.adoptPet(pet);
    if (!this.owners.includes(owner)) this.owners.push(owner);
  }

  printAdoptions() {
    this.owners.forEach(owner => {
      console.log(`${owner.name} has adopted the following pets:`);
      owner.printPets();
      console.log('');
    });
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// P Hanson has adopted the following pets:
// a cat named Butterscotch
// a cat named Pudding
// a bearded dragon named Darwin

// B Holmes has adopted the following pets:
// a dog named Molly
// a parakeet named Sweetie Pie
// a dog named Kennedy
// a fish named Chester

// P Hanson has 3 adopted pets.
// B Holmes has 4 adopted pets.

// 14. Behold this incomplete class for constructing boxed banners.
// Complete this class so that the test cases shown below work as intended. You are free to add any properties you need. You may assume that the input will always fit in your terminal window.

class Banner {
  constructor(message) {
    this.message = message;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+-${'-'.repeat(this.message.length)}-+`;
  }

  emptyLine() {
    return `| ${' '.repeat(this.message.length)} |`;
  }

  messageLine() {
    return `| ${this.message} |`;
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();

// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+