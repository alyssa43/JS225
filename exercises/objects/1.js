// The reason we get an error instead of the appropriate message is because we are trying to reference the `morning`/afternoon`/`evening` and `name` properties of the `helloVictor` object when we invoke the `greet` method without prefixing them with `this`
// We need to explicitly tell JS that these are properties from within the object that called the method, so that it can properly find the values to interpolate into the output string.

function createGreeter(name) {
  return {
    name,
    morning: 'Good Morning',
    afternoon: 'Good Afternoon',
    evening: 'Good Evening',
    greet(timeOfDay) {
      let msg = '';
      switch (timeOfDay) {
        case 'morning':
          msg += `${this.morning} ${this.name}`;
          break;
        case 'afternoon':
          msg += `${this.afternoon} ${this.name}`;
          break;
        case 'evening':
          msg += `${this.evening} ${this.name}`;
          break;
      }
      console.log(msg);
    },
  };
}

const helloVictor = createGreeter('Victor');
helloVictor.greet('morning');