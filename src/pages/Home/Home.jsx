import "./index.css";

import me from "../../images/me.jpg";

export default function Home() {
  return (
    <div className="mainContainer">
      <h1 className="mainText">
        Hey, I'm Swapnil - A Software Engineer from London
        {/* <br />
        who loves to build products. */}
      </h1>
      <h2 className="secondaryText">
        <br /> <br />
        {/* <a className="email" href="mailto:swapnilchauhan999@gmail.com">
          swapnilchauhan999@gmail.com
        </a> */}
      </h2>

      <a
        target="_blank"
        rel="noreferrer"
        href="https://firebasestorage.googleapis.com/v0/b/swapnil-chauhan.appspot.com/o/Swapnil-Chauhan.pdf?alt=media&token=4cec1e01-c575-4f24-a6fa-822b5b809739"
        className="resume-btn resume-btn-layered offset square"
      >
        download resume
      </a>

      {/* <h2 className="knowMeHeading">Get to know me.</h2> */}
      {/* <div className="knowMeContainer">
        <div>
          <p className="knowMeText">
            I have recently graduated from my Masters in Computer Science program at the Queen Mary University of London. I have been
            programming in a variety of languages since I was in 6th grade. My passion for programming and motivation is fuelled by the
            prospect of making things which would be used by people around the world. <br />
            <br />I worked as a Data Science Project Intern at Teragence Ltd, London to improve their existing naïve signal estimator
            algorithms to smart AI/ML- based estimation workflow. I am using technologies like QGIS, Python (Data Analysis libraries like
            Numpy, Pandas, PyTorch, etc), Docker, Kubernetes and ReactJS. <br />
            <br />I previously worked in a startup as a Software Engineer, using technologies like Swift, Python, NodeJS, ReactJS, Git,
            Amazon Web Services, SQL, Firebase and Linux. Some of the projects I worked on are aarjaychairs.com, the Before Visit app, and
            Momma's Kitchen app. Aside from professional work, I am also motivated to work on personal projects. Some of the projects
            include a few iOS Apps that I have published, contributions to Stack Overflow, a portfolio website and a Raspberry PI home NAS
            server that I have deployed. I also constantly participate in a variety of online coding competitions like Google Kickstart,
            Google CodeJam, CodeChef, Hackerrank, Leetcode and HackerEarth to improve my coding and problem-solving skills. My will to work
            hard and my passion for technology will ensure that if given the opportunity, I will exceed all expectations. Looking forward to
            hearing back from you.
          </p>
        </div>
        <div>
          <img src={me} alt="Swapnil" className="meImage" />
        </div>
      </div> */}
    </div>
  );
}
