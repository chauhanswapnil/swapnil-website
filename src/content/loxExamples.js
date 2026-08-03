// Starter programs for the playground. All of these are plain Lox as
// described in Crafting Interpreters, so they run on the Java interpreter
// behind the playground without any extensions.

export const loxExamples = [
  {
    id: "hello",
    label: "Hello",
    description: "Printing and variables.",
    code: `// Welcome to the Lox playground.
// Everything here runs on the Java interpreter I wrote for Lox.

var name = "world";
print "Hello, " + name + "!";

var answer = 6 * 7;
print answer;`,
  },
  {
    id: "fizzbuzz",
    label: "FizzBuzz",
    description: "Loops and conditionals, with no modulo operator.",
    code: `// Lox has no '%', so count up to three and five
// and reset the counters instead.

var three = 0;
var five = 0;

for (var i = 1; i <= 20; i = i + 1) {
  three = three + 1;
  five = five + 1;

  if (three == 3 and five == 5) {
    print "FizzBuzz";
    three = 0;
    five = 0;
  } else if (three == 3) {
    print "Fizz";
    three = 0;
  } else if (five == 5) {
    print "Buzz";
    five = 0;
  } else {
    print i;
  }
}`,
  },
  {
    id: "fib",
    label: "Fibonacci",
    description: "Recursion and function calls.",
    code: `fun fib(n) {
  if (n < 2) return n;
  return fib(n - 2) + fib(n - 1);
}

for (var i = 0; i < 15; i = i + 1) {
  print fib(i);
}`,
  },
  {
    id: "closures",
    label: "Closures",
    description: "Functions that remember their scope.",
    code: `fun makeCounter() {
  var count = 0;

  fun increment() {
    count = count + 1;
    return count;
  }

  return increment;
}

var next = makeCounter();
print next(); // 1
print next(); // 2
print next(); // 3`,
  },
  {
    id: "classes",
    label: "Classes",
    description: "Objects, methods, and inheritance.",
    code: `class Animal {
  init(name) {
    this.name = name;
  }

  speak() {
    print this.name + " makes a sound.";
  }
}

class Dog < Animal {
  speak() {
    super.speak();
    print this.name + " barks.";
  }
}

Dog("Pickle").speak();`,
  },
];

export const defaultExample = loxExamples[0];
