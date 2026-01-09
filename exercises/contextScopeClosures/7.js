// Read the following code carefully. Will the JS GC mechanism garbage collect the array assigned to the variable `array` after the function `pushIt` is called on line 13?

function makeArrays() {
  let array = [];

  return () => {
    array.push('');
    return array;
  };
}

const pushIt = makeArrays();
pushIt();
// more code

// ANSWER: No, the array will not be eligible for GC since the function stored in `pushIt` still has a reference to it via the closure. If we wanted to "derefence" `pushIt` and break that closure, we could reassign `pushIt` to `null`.