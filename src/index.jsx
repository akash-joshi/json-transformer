// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import ReactJson from "react-json-view";
import { useLocalStorage } from "react-use";

import Editor from "@monaco-editor/react";
import { ClockLoader as Loader } from "react-spinners";

import posts from "./posts.json";

function App() {
  const [theme] = useState("light");
  const [language] = useState("javascript");

  const [inputData, setInputData] = useLocalStorage(
    "input",
    JSON.stringify(posts)
  );
  const [codeData, setCodeData] = useLocalStorage(
    "code",
    `const outputData = inputData.filter(post => post.userId === 10);
    
outputData;`
  );
  const [outputData, setOutputData] = useState("output", "");

  function handleInputChange(event) {
    const { value } = event.target;
    console.log("here is the current input value:", value);
    setInputData(value);
  }

  function handleEditorChange(value) {
    console.log("here is the current code value:", value);
    setCodeData(value);
  }

  const evalCode = () => {
    try {
      const output = eval(`const inputData = ${inputData};
  ${codeData}
  `);
      setOutputData(output);
    } catch (error) {
      setOutputData(error);
    }
  };

  useEffect(() => {
    evalCode();
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        height: "100vh",
      }}
    >
      <textarea value={inputData} onChange={handleInputChange} />

      <Editor
        height="calc(100% - 19px)" // By default, it fully fits with its parent
        theme={theme}
        language={language}
        loading={<Loader />}
        defaultValue={codeData}
        onChange={handleEditorChange}
      />

      <div>
        <button onClick={evalCode}>Generate</button>
        {outputData && Object.keys(outputData)?.length ? (
          <ReactJson src={outputData} />
        ) : (
          <textarea disabled value={outputData} />
        )}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
