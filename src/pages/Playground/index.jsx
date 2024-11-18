import Documentation from "../../components/Documentation";
import Editor from "../../components/Editor";
import LoxIntro from "../../components/LoxIntro";
import {Helmet} from "react-helmet";

export default function Playground() {
  return (
    <div>
      <Helmet>
        <title>{"Lox Playground | Swapnil Chauhan"}</title>
        <meta name="description" content={"Lox is a programming language by Bob Nystrom written for the book Crafting Interpreters. It is an excellent book that teaches how to build lexers, parsers and interpreters. After reading the book and having implemented the interpreter for Lox in Java, I decided to make a playground for it which runs the code on the Java Interpreter for Lox hosted on a server."} />
        <meta property="og:title" content={"Lox Playground | Swapnil Chauhan"} />
        <meta
          property="og:description"
          content={"Lox is a programming language by Bob Nystrom written for the book Crafting Interpreters. It is an excellent book that teaches how to build lexers, parsers and interpreters. After reading the book and having implemented the interpreter for Lox in Java, I decided to make a playground for it which runs the code on the Java Interpreter for Lox hosted on a server."}
        />
        <meta property="og:url" content={"https://swapnilchauhan.com/playground"} />
        <meta 
          name="Abstract" 
          content={"Swapnil Chauhan's Lox Interpreter Online Playground"}
        />
        <meta name="Author" content="Swapnil Chauhan" />
        <meta 
          name="subject" 
          content={"Swapnil Chauhan's Lox Interpreter Online Playground"}
        />
        <meta 
          name="page-topic" 
          content={"Swapnil Chauhan's Lox Interpreter Online Playground"}
        />
        <meta
          name="twitter:card"
          content={"Hello, I am Swapnil. Checkout the online playground for my Lox Interpreter"}
        />
        <meta
          name="twitter:title"
          content={"Lox Playground | Swapnil Chauhan"}
        />
        <meta
          name="twitter:description"
          content={"Lox is a programming language by Bob Nystrom written for the book Crafting Interpreters. It is an excellent book that teaches how to build lexers, parsers and interpreters. After reading the book and having implemented the interpreter for Lox in Java, I decided to make a playground for it which runs the code on the Java Interpreter for Lox hosted on a server."}
        />
        <link rel="canonical" href="https://swapnilchauhan.com/playground" />
      </Helmet>
      <LoxIntro />
      <Editor />
      <Documentation />
    </div>
  );
}
