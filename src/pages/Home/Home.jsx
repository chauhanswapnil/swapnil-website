import "./index.css";

import {Link} from "react-router-dom/"
export default function Home() {
  return (
    <div className="mainContainer">
      <h1 className="mainText">
        Hey, I'm Swapnil - A Software Engineer from London
      </h1>

{/*       <a
        target="_blank"
        rel="noreferrer"
        href="https://firebasestorage.googleapis.com/v0/b/swapnil-chauhan.appspot.com/o/Swapnil-Chauhan.pdf?alt=media&token=4cec1e01-c575-4f24-a6fa-822b5b809739"
        className="resume-btn resume-btn-layered offset square"
      >
        download resume
      </a> */}
      
      <div className="sections">
        <h2 className="headings">I write sometimes</h2>
        <ul>
          <li>
            <Link to="/blog/titanic-disaster-neural-network-using-tensorflow-and-google-colab-and-uploading-it-to-kaggle" style={{color:"inherit"}}>
            Titanic Disaster Neural Network using Tensorflow and Google Colab and uploading it to Kaggle.
            </Link>
            </li>
          <li>
          <Link to="/blog/guidelines-roadmap-and-resources-for-beginner-to-advanced-ios-app-development-using-swift" style={{color:"inherit"}}>
            Guidelines, Roadmap and Resources for beginner to advanced iOS app development using Swift
          </Link></li>
        </ul>
      </div>

      <h2 className="headings">
      <Link to="/playground" style={{color:"inherit"}}>Lox Playground</Link></h2>
      <p>Check out Lox playground which is an online repl for the interpreter I made in Java for Lox Language.</p>      
    </div>
  );
}
