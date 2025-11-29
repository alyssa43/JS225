function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

let people = {
  collection: [],
  fullName: function(person) {
    console.log(`${person.firstName} ${person.lastName}`);
  },

  rollCall: function() {
    this.collection.forEach(this.fullName);
  },

  getIndex: function(person) {
    let index = -1;
    this.collection.forEach((comp, i) => {
      if (comp.firstName === person.firstName &&
          comp.lastName === person.lastName) {
            index = i;
          }
    });

    return index;
  },

  isInvalidPerson: function(person) {
    return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
  },

  add: function(person) {
    if (this.isInvalidPerson(person)) return;

    this.collection.push(person);
  },

  remove: function(person) {
    if (this.isInvalidPerson(person)) return;

    let index = this.getIndex(person);
    if (index === -1) return;

   this.collection.splice(index, 1);
  },

  get: function(person) {
    if (this.isInvalidPerson(person)) return;

    return this.collection[this.getIndex(person)];
  },

  update: function(person) {
    if (this.isInvalidPerson(person)) return;

    let exisistingPersonId = this.getIndex(person);
    if (exisistingPersonId === -1) {
      this.add(person);
    } else {
      this.collection[exisistingPersonId] = person;
    }
  },
}

let me = new Person('Alyssa', 'Easter');
let rich = new Person('Richard', 'Easter');
let avery = new Person('Avery', 'Easter');
let addy = new Person('Adalynn', 'Easter');
let lincoln = new Person('Lincoln', 'Easter');

console.log(people); // collection empty

people.add(me);
people.add(rich);
people.add(avery);
people.add(addy);
people.add(lincoln);

console.log(people); // collection filled