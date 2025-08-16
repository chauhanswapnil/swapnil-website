import "./index.css";

import BlogPreview from "../../components/BlogPreview";
import {Link} from "react-router-dom/"
export default function Home() {
  return (
    <div className="mainContainer">
      <div className="contentContainer">
        {/* <h1 className="mainText">
          Hey, I'm Swapnil - A Software Engineer from London
        </h1>
        */
        }
        <p className="secondaryText">
          I’m a backend software engineer with a deep love for programming languages. You could say I’m on a never-ending quest to find the perfect syntax—or at least the one that sparks the most joy! Whether it’s the memory safety of Rust or the simplicity of Go, I’m always eager to dive into something new and add another language to my growing collection.
        </p>

  {/*       <a
          target="_blank"
          rel="noreferrer"
          href="https://firebasestorage.googleapis.com/v0/b/swapnil-chauhan.appspot.com/o/Swapnil-Chauhan.pdf?alt=media&token=4cec1e01-c575-4f24-a6fa-822b5b809739"
          className="resume-btn resume-btn-layered offset square"
        >
          download resume
        </a> */}
        <div className="loxContainer">
        <h2 className="headings">
        <Link to="/playground" style={{color:"inherit"}}>Lox Playground</Link></h2>
        <p>Check out Lox playground which is an online repl for the interpreter I made in Java for Lox Language.</p>      
        </div>


        <div className="sections">
          <h2 className="headings">I write sometimes</h2>
          <BlogPreview 
            date="August 16, 2025"
            title="Plateauing"
            previewText={`It’s strange how time seems to slip through your fingers the older you get. When I look back, it feels like yesterday when I was graduating with my bachelor’s degree, packing my bags to move to the UK, finishing my master’s, and finally landing my first job. That job was such a milestone, I can still remember the adrenaline of getting the offer, the sense of relief after so many months of grinding, and the excitement of opening...`} 
            linkText="/blog/plateauing"
          />

          <BlogPreview 
            date="November 11, 2024"
            title="Pickel DNS - A Recursive DNS Resolver in Rust (Part 1)"
            previewText={`What is DNS?\nDNS or Domain Name System is a mapping of human-readable domain names to machine IP addresses. DNS works by having servers that does DNS lookups or DNS resolving which essentially means looking up the IP from a server that knows about it.\nIn resolving a domain name from when a user types [google.com](http://google.com/) in their browser to the browser loading that page, there are 4 DNS servers involved...`} 
            linkText="/blog/recursive-dns-resolver-part-1"
          />

          <BlogPreview 
            date="October 19, 2024" 
            title="Procrastination and the Fear of Not Being 'Good Enough'"
            previewText={`> "I want to read and write more."\n\nThat thought has echoed in my mind for the past two years. Yet, as you can see from my sparse blog posts, I haven’t done much of either. While I do read articles here and there, it’s far less than I should. And writing? Well, it’s been even longer since I put pen to paper—or fingers to keyboard in my case...`} 
            linkText="/blog/procrastination-and-the-fear-of-not-being-good-enough"
          />

          <BlogPreview 
            date="June 26, 2021"
            title="Titanic Disaster Neural Network using Tensorflow and Google Colab and uploading it to Kaggle."
            previewText={`Setting up Kaggle with Google Colab and uploading the predictions directly from the notebook.\n\n In this tutorial we will be making a Deep Learning binary classification neural network model using Tensorflow and train it on the Titanic Disaster Dataset from Kaggle Competitions. We will also look at how to connect Google Colab with Kaggle so that you can do things like...`}
            linkText="/blog/titanic-disaster-neural-network-using-tensorflow-and-google-colab-and-uploading-it-to-kaggle"/>

          <BlogPreview
            date="June 22, 2020"
            title="Guidelines, Roadmap and Resources for beginner to advanced iOS app development using Swift"
            previewText={`By 2021 the mobile app market revenue is expected to be $693 billion. Now would be as good of a time as any to get into developing apps by yourself. With the increasing number of things we can do from our mobile devices the job market for app developers is growing rapidly and will continue to grow in the foreseeable future. The ongoing Covid-19 pandemic has...`}
            linkText="/blog/guidelines-roadmap-and-resources-for-beginner-to-advanced-ios-app-development-using-swift"/>
          {/*
          <ul>
            <li>
              <Link to="/blog/titanic-disaster-neural-network-using-tensorflow-and-google-colab-and-uploading-it-to-kaggle" style={{color:"inherit"}}>
              Titanic Disaster Neural Network using Tensorflow and Google Colab and uploading it to Kaggle.
              </Link>
              </li>
            <li>
            <Link to="/blog/guidelines-roadmap-and-resources-for-beginner-to-advanced-ios-app-development-using-swift" style={{color:"inherit"}}>
              
            </Link></li>
          </ul>*/}
        </div>

      </div>
    </div>
  );
}
