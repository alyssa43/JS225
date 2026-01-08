// 1. Create a `makeLogger` function that takes a number as an argument and returns a function. When we invoke the returned function with a second number, it should count up or down from the firsrt number to the second number, logging each number to the console:

// Desired Output:

// > let countlog = makeCounterLogger(5);
// > countlog(8);
// 5
// 6
// 7
// 8

// > countlog(2);
// 5
// 4
// 3
// 2

// function makeCounterLogger(start) {
//   return function(end) {
//     if (start > end) {
//       for (let i = start; i >= end; i -= 1) {
//         console.log(i);
//       }
//     } else {
//       for (let i = start; i <= end; i += 1) {
//         console.log(i);
//       }
//     }
//   };
// }

// let countlog = makeCounterLogger(5)
// countlog(8);
// countlog(2);

// 2. We'll build a simple todo list program using the techniques we've seen in this assignment. Write a `makeList` function that returns a new function that implements a todo list. The returned funciton should have the following behavior:

// - When called with an arugment that is not already on the list, it adds that argument to the list.
// - When called with an argument that is already on the list, it removes the element from the list.
// - When called without arguments, it logs all items on the list. If the list is empty, it logs an appropriate message.

// Desired output:
// > let list = makeList();
// > list();
// The list is empty.
// > list('make breakfast');
// make breakfast added!
// > list('read book');
// read book added!
// > list();
// make breakfast
// read book
// > list('make breakfast');
// make breakfast removed!
// > list();
// read book

function makeList() {
  let list = [];
  return function(item) {
    if (item === undefined) {
      logList(list);
    } else if (!list.includes(item)) {
      list.push(item);
      console.log(`${item} added!`);
    } else {
      list = list.filter(i => i !== item);
      console.log(`${item} removed!`)
    }
  }
}

function logList(list) {
  if (list.length === 0) {
    console.log('The list is empty.');
  } else {
    list.forEach(item => console.log(item));
  };
}

let list = makeList();
list();
list('make breakfast');
list('read book')
list();
list('make breakfast')
list();