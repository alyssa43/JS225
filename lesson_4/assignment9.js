// 1. It the following code, when can JS garbage collect each of the following arrays? [1], [2], and [1, 2]

let a = [1];

function add(b) {
  a = a.concat(b);
}

function run() {
  let c = [2];
  let d = add(c);
}

run();

// ANSWER: We can GC [1] after line 6 executes. Since this line reassigns the `a` variable, `a` no longer references [1], nor do any other variables in this program. We can GC [2] after the `run` function returns. Since [2] is only assigned to the `c` varible, [2] is no longer needed after `run` returns. We can GC [1, 2] only after the program ends. Since `a` is a global variable, the reference to [1, 2] doesn't go away until JS discards the `a` variable, and that only occurs when the program terminates.

// 2. In the following code, when can JS garbage collect the value ["Steve", "Edie"] ?

function makeHello(names) {
  return function() {
    console.log("Hello, " + names[0] + " and " + names[2] + "!");
  };
}

let helloSteveAndEdie = makeHello(["Steve", "Edie"]);

// ANSWER: We can GC ["Steve", "Edie"] only after the program ends, specifically after JS GCs the function references by `helloSteveAndEdie`. Since `helloSteveAndEdie` references a function that holds the array in its closure, JS cannot GC it until it doesn't reference anything else in the program, but it currently references `names` in the `helloSteveAndEdie` variable that references the function returned by `makeHello`. If we wanted to dereference the closure created by `helloSteveAndEdie`, we would have to reassign `helloSteveAndEdie` to `null`.