const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    return this.price - discount;
  },
};

console.log(item.discount(20)); // 40
console.log(item.discount(50)); // 25
console.log(item.discount(25)); // 37.5

// The issue with this code is with the line in the `discount` method that says `this.price -= discount`. It was reassigning the `price` property with each invocation of the discount method, so the values were always decrementing with each invocation. To fix this I just removed that line and returned the value of subtracting the `discount` from the value of the `price` property.