import { Col, Row } from "react-bootstrap";
import ProjectCard from "../../components/ProjectCard";
import styles from "./index.module.css";
const data = [
  {
    title: "Lox Programming Language Interpreter",
    description:
      "Implemented a tree-walk interpreter for a dynamically typed object-oriented programming language (Lox) using Java,applying advanced object-oriented design principles for code reuse and efficiency. Developed features for the Lox programming language interpreter, including variable creation, loops, arithmetic operations, functions, and classes. Built an interpreter with error handling that provides a complete abstraction layer on top of Java.",
  },

  {
    title: "iLaaka Society Management",
    description:
      "Developed an iOS app with Swift for the efficient management of residential society activities in Mumbai. Implemented MVC architecture in the App and followed best practices. Used APIs like UIKit, ARKit, Core Animation, GCD Multi threading, Networking and more Quickly and Efficiently tracked and debugged issues in real-time to ensure smooth user experience. Prioritised incoming bugs, reproduced issues and determined correct resolvers according to the priority of problems. Working in 5 societies and had over 300 users.",
  },
  {
    title: "Replon",
    description:
      "Developed an iOS app with Swift for the efficient management of residential society activities in Mumbai. Implemented MVC architecture in the App and followed best practices. Used APIs like UIKit, ARKit, Core Animation, GCD Multi threading, Networking and more Quickly and Efficiently tracked and debugged issues in real-time to ensure smooth user experience. Prioritised incoming bugs, reproduced issues and determined correct resolvers according to the priority of problems. Working in 5 societies and had over 300 users.",
  },
  {
    title: "Reltec",
    description:
      "Developed an iOS app with Swift for the efficient management of residential society activities in Mumbai. Implemented MVC architecture in the App and followed best practices. Used APIs like UIKit, ARKit, Core Animation, GCD Multi threading, Networking and more Quickly and Efficiently tracked and debugged issues in real-time to ensure smooth user experience. Prioritised incoming bugs, reproduced issues and determined correct resolvers according to the priority of problems. Working in 5 societies and had over 300 users.",
  },
];

export default function Projects() {
  return (
    <div className={styles.projectPageContainer}>
      <h1>This page is under construction 🛠️.</h1>
      <Row>
        {data.map((project) => {
          return (
            <Col lg={6} sm={12} mt={3} style={{ marginBottom: "2rem" }}>
              <ProjectCard project={project} />
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
