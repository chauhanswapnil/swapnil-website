import ReactMarkdown from 'react-markdown'

import styles from "./index.module.css";
import titanic from "../../blogmd/titanic.md";
import beginios from "../../blogmd/beginios.md";
import procrastination from "../../blogmd/procrastination.md";
import dns_resolver_part_1 from "../../blogmd/recursive-dns-resolver-part-1.md";
import { useEffect, useState } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneDark} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useParams } from 'react-router-dom';
import {Helmet} from "react-helmet";

const blogs = 
  {
    "titanic-disaster-neural-network-using-tensorflow-and-google-colab-and-uploading-it-to-kaggle": 
    {
      "medium_link": "", 
      md_file: titanic,
      "title": "Titanic Disaster Neural Network using Tensorflow and Google Colab and uploading it to Kaggle.",
      "description": "Setting up Kaggle with Google Colab and uploading the predictions directly from the notebook. In this tutorial we will be making a Deep Learning binary classification neural network model using Tensorflow and train it on the Titanic Disaster Dataset from Kaggle Competitions. We will also look at how to connect Google Colab with Kaggle so that you can do things like..."
    },
    "guidelines-roadmap-and-resources-for-beginner-to-advanced-ios-app-development-using-swift": {
      "medium_link": "", 
      md_file: beginios,
      "title": "Guidelines, Roadmap and Resources for beginner to advanced iOS app development using Swift",
      "description": "By 2021 the mobile app market revenue is expected to be $693 billion. Now would be as good of a time as any to get into developing apps by yourself. With the increasing number of things we can do from our mobile devices the job market for app developers is growing rapidly and will continue to grow in the foreseeable future. The ongoing Covid-19 pandemic has..."
    },
    "procrastination-and-the-fear-of-not-being-good-enough": {
      "medium_link": "", 
      md_file: procrastination,
      "title": "Procrastination and the Fear of Not Being 'Good Enough'",
      "description": "I want to read and write more. That thought has echoed in my mind for the past two years. Yet, as you can see from my sparse blog posts, I haven’t done much of either. While I do read articles here and there, it’s far less than I should. And writing? Well, it’s been even longer since I put pen to paper—or fingers to keyboard in my case..."
    },
    "recursive-dns-resolver-part-1" : {
      "medium_link": "", 
      md_file: dns_resolver_part_1,
      "title": "Pickel DNS - A Recursive DNS Resolver in Rust (Part 1)",
      "description": "What is DNS? DNS or Domain Name System is a mapping of human-readable domain names to machine IP addresses. DNS works by having servers that does DNS lookups or DNS resolving which essentially means looking up the IP from a server that knows about it. In resolving a domain name from when a user types [google.com](http://google.com/) in their browser to the browser loading that page, there are 4 DNS servers involved..."
    },
  }

function getBlogDict(fromTitle) {
  if (blogs[fromTitle])
    return blogs[fromTitle]
}

function getFilename(fromTitle) {
  if (blogs[fromTitle])
    return blogs[fromTitle].md_file
}


export default function BlogContent(props) {
  const blog_dict = getBlogDict(useParams().title)
  const full_url = "https://swapnilchauhan.com/blog/" + useParams().title
  const filename = getFilename(useParams().title);

  useEffect(() => {
    if (filename) {
      fetch(filename)
        .then((txt) => {
          return txt.text();
        })
        .then((mt) => {
          setMd(mt)
          setLoading(false)
        });
    } else {
      setMd("")
      setLoading(false)
    }
  },[filename])

  const [md, setMd] = useState("")
  const [loading, setLoading] = useState(true)

  const getHelmet = () => {
    if (blog_dict === undefined) {
      return <></>
    }
    return (
      <Helmet>
        <title>{blog_dict.title}</title>
        <meta name="description" content={blog_dict.description} />
        <meta property="og:title" content={blog_dict.title +  " | Swapnil Chauhan"} />
        <meta
          property="og:description"
          content={blog_dict.description}
        />
        <meta property="og:url" content={full_url} />
        <meta 
          name="Abstract" 
          content={"Swapnil Chauhan's blog on " + blog_dict.title}
        />
        <meta name="Author" content="Swapnil Chauhan" />
        <meta 
          name="subject" 
          content={"Swapnil Chauhan's blog on " + blog_dict.title}
        />
        <meta 
          name="page-topic" 
          content={"Swapnil Chauhan's blog on " + blog_dict.title}
        />
        <meta
          name="twitter:card"
          content={"Hello, I am Swapnil. Check out my blog: " + blog_dict.title}
        />
        <meta
          name="twitter:title"
          content={blog_dict.title + " | Swapnil Chauhan"}
        />
        <meta
          name="twitter:description"
          content={blog_dict.description}
        />
        <link rel="canonical" href={full_url} />
      </Helmet>
    )
  }

  const getBlog = () => {
    if (md === "") {
      return <h1>Invalid blog title!</h1>
    }

    return (
      <ReactMarkdown
        children={md}
        components={{
          p({ node, children, ...props }) {
            // Check if the paragraph contains a non-breaking space
            const hasNbsp = children.some((child) => {
              if (typeof child === 'string' && child.includes('\u00A0')) {
                return true;
              }
              return false;
            });
            // Apply custom styles if &nbsp; is present
            const customStyle = hasNbsp ? { margin: '0' } : {};
            return (
              <p style={customStyle} {...props}>
                {children}
              </p>
            );
          },
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                children={String(children).replace(/\n$/, '')}
                style={oneDark}
                language={match[1]}
                PreTag="div"
              />
            ) : (
              <code {...props} className={className}>
                {children}
              </code>
            );
          },
          a({ node, children, ...props }) {
          return (
            <a className={styles.blogLink} {...props}>
              {children}
            </a>
          );
        },
        }}
      />
    );
  };

  return (
    <div className={styles.mainContainer}>
      {getHelmet()}
      <div className={styles.blogContainer}>
        {loading ? <h1>Loading...</h1> : getBlog() }
      </div>
    </div>
  );
}
