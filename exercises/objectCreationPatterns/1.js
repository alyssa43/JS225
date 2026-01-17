// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

// My Solution:
// Object.prototype.ancestors = function() {
//   const ancestors = [];
//   let current = Object.getPrototypeOf(this);

//   while (current && current.hasOwnProperty('name')) {
//     ancestors.push(current.name);
//     current = Object.getPrototypeOf(current);
//   }

//   ancestors.push('Object.prototype');
//   return ancestors;
// };

// LS Solution:
Object.prototype.ancestors = function() {
  const ancestor = Object.getPrototypeOf(this);

  if (ancestor && ancestor.hasOwnProperty('name')) {
    return [ancestor.name].concat(ancestor.ancestors());
  }

  return ['Object.prototype'];
}

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']