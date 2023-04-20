import ReactMarkdown from 'react-markdown'

import styles from "./index.module.css";
import titanic from "../../blogmd/titanic.md";
import beginios from "../../blogmd/beginios.md";
import languages from "../../blogmd/languages.md";
import { useEffect, useState } from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {oneLight} from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useParams } from 'react-router-dom';

const blogs = 
  {
    "titanic-disaster-neural-network-using-tensorflow-and-google-colab-and-uploading-it-to-kaggle": 
    {
      "medium_link": "", 
      md_file: titanic
    },
    "guidelines-roadmap-and-resources-for-beginner-to-advanced-ios-app-development-using-swift": {
      "medium_link": "", 
      md_file: beginios
    },
    "how-programming-languages-make-sense-of-language": {
      "medium_link": "",
      md_file: languages
    }
  }

function getFile(fromTitle) {
  if (blogs[fromTitle])
    return blogs[fromTitle].md_file
}

export default function BlogContent(props) {

  const filename = getFile(useParams().title)
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

  const getBlog = () => {
    if (md === "") {
      return <h1>Invalid blog title!</h1>
    }
    return <ReactMarkdown
    children={md}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            {...props}
            children={String(children).replace(/\n$/, '')}
            style={oneLight}
            language={match[1]}
            PreTag="div"
          />
        ) : (
          <code {...props} className={className}>
            {children}
          </code>
      )
    }
  }}
/>
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.blogContainer}>
        {loading ? <h1>Loading...</h1> : getBlog() }
      </div>
    </div>
  );
}
