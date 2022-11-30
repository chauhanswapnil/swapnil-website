import { Row, Col } from "react-bootstrap";
import DocsEditor from "../DocsEditor";

import styles from "./index.module.css";

const docs = [
  {
    heading: "General",
    desc: "Lox's syntax is a member of the C family. It is a dynamically typed language. Braces { } denotes a block of code and // is used for comments.",
    code: `{
  // Hi these
  // are comments
  // in Lox
}`,
  },
  {
    heading: "Variables",
    desc: "Lox supports booleans, numbers, strings and nil. Variables can be declared with the 'var' keyword.",
    code: `var a = "Hello!"; //String
var b = 123; // Integer
var c = 45.5; // Decimal
var d = true; // Boolean
var e = nil; // nil`,
  },
  {
    heading: "Arithmetic",
    desc: "Lox supports the following basic arithmetic operators.",
    code: `var a = 10;
var b = 5;

var add = a + b; // 15
var sub = a - b; // 5
var mul = a * b; // 50
var div = a / b; // 2`,
  },
  {
    heading: "Conditional",
    desc: "Lox supports if-else-if ladders.",
    code: `var a = 10;
var b = 5;

if ( a > b ) {
  print "a is greater";
} else if ( b > a) {
  print "b is greater";
} else {
  print "a and b are equal.";
}`,
  },
  {
    heading: "Loops",
    desc: "Lox supports for loops and while loops.",
    code: `for (var i = 1; i <= 10; i=i+1) {
  print i;
}

var j = 0;
while (j<=10) {
  print j;
  j = j + 1;
}`,
  },
  {
    heading: "Functions",
    desc: "You can create functions with the 'fun' keyword.",
    code: `fun calculateTip(amount,tipPercent) {
  return (tipPercent/100 * amount);
}

var amount = 175;
var tipPercent = 10;

print calculateTip(amount,tipPercent); //17.5
`,
  },
  {
    heading: "Classes",
    desc: "You can create classes with the 'class' keyword and initilaize them with the 'innit' method. 'this' keyword is used to refer to the current object",
    code: `class Person {
  init(name, age) {
    this.name = name;
    this.age = age;
  }
  greeting() {
    print "Hi, I am " + this.name;
  }
}

var person = Person("Swapnil", 24);
person.greeting();`,
  },
  {
    heading: "Inheritance",
    desc: "Lox supports single inheritance. When you declare a class, you can specify a class that it inherits from using '<' operator.",
    code: `class Person {
  init(name, age) {
    this.name = name;
    this.age = age;
  }
  greeting() {
    print "Hi, I am " + this.name;
  }
}

class Student < Person {
  init(name, age, studentId) {
    super.init(name, age);
    this.studentId = studentId;
  }
  greetProfessor(prof) {
    print "Hi Professor " + prof + ", I am " + this.name;
  }
}
var student = Student("Swapnil", 24, 12345);
student.greeting();
student.greetProfessor("Max");`,
  },
];

export default function Documentation() {
  return (
    <div className={styles.documentationContainer}>
      <h2 className={styles.docsHeading}>Documentation</h2>
      <Row>
        {docs.map((doc) => {
          return (
            <Col lg={6} sm={12} style={{ marginBottom: "2rem" }}>
              <h5 className={styles.docsSubHeading}>{doc.heading}</h5>
              <p className={styles.docsDesc}>{doc.desc}</p>
              <DocsEditor code={doc.code} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
