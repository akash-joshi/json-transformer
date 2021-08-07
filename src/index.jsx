// @monaco-editor/react is Monaco editor wrapper for easy/one-line integration with React
// applications without need of webpack (or other module bundler)
// configuration files.

import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import ReactJson from "react-json-view";
import { useLocalStorage } from "react-use";

import Editor from "@monaco-editor/react";
import { ClockLoader as Loader } from "react-spinners";

import LinkToRepo from "./LinkToRepo";
import examples from "./examples";

function App() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("javascript");

  const [inputData, setInputData] = useLocalStorage("input", "");
  const [codeData, setCodeData] = useLocalStorage("code", "");
  const [outputData, setOutputData] = useState("output", "");

  function toggleTheme() {
    setTheme(theme === "light" ? "vs-dark" : "light");
  }

  function toggleLanguage() {
    setLanguage(language === "javascript" ? "python" : "javascript");
  }

  function handleInputChange(event) {
    const { value } = event.target;
    console.log("here is the current input value:", value);
    setInputData(value);
  }

  function handleEditorChange(value, event) {
    console.log("here is the current code value:", value);
    setCodeData(value);
  }

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
        <button
          onClick={() => {
            try {
              const output = eval(`const inputData = ${inputData};
          ${codeData}
          `);
              setOutputData(output);
            } catch (error) {
              setOutputData(error);
            }
          }}
        >
          Generate
        </button>
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
