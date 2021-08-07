import React from "react";

const styles = {
  link: {
    textDecoration: "none"
  },
  wrapper: {
    marginRight: 10,
    display: "inline",
    border: "1px solid black"
  }
};

const LinkToRepo = _ => (
  <button style={styles.wrapper}>
    <a
      href="https://github.com/SurenAt93/monaco-react"
      rel="noopener noreferrer"
      target="_blank"
      style={styles.link}
    >
      Go to GitHub - @monaco-editor/react
    </a>
  </button>
);

export default LinkToRepo;
