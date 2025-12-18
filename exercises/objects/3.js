function objectsEqual(obj1, obj2) {
  const obj1Keys = Object.keys(obj1);
  const obj2Keys = Object.keys(obj2);
  if (obj1Keys.length !== obj2Keys.length) return false;

  for (let i = 0; i < obj1Keys.length; i += 1) {
    const key = obj1Keys[i];
    if (!obj2.hasOwnProperty(key)) return false;
    if (obj1[key] !== obj2[key]) return false;
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'})); // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'})); // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'})); // true
console.log(objectsEqual({}, {})); // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1})); // false