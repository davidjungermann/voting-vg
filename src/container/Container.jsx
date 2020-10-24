import React, { useState } from "react";
import FileSelector from "../fileselector/FileSelector.jsx";
import ResultsView from "../ResultsView.jsx";
import "./Container.css";

export default function Container() {
  const [submitted, setSubmitted] = useState(false);
  const [voteCodeFile, setVoteCodeFile] = useState(null);
  const [voteFile, setVoteFile] = useState(null);

  return (
    <div className="container-root">
      <div className="jumbotron text-center">
        <h1 className="display-4">Rösträknare </h1>
        <p className="lead">Västgöta Nation</p>
      </div>
      {submitted ? (
        <ResultsView
          setSubmitted={setSubmitted}
          voteCodeFile={voteCodeFile}
          voteFile={voteFile}
        ></ResultsView>
        
      ) : (
        <FileSelector
          setSubmitted={setSubmitted}
          setVoteCodeFile={setVoteCodeFile}
          setVoteFile={setVoteFile}
        ></FileSelector>
      )}
    </div>
  );
}
