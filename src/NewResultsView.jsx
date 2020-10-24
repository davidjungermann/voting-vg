import React, { useState, useEffect } from "react";
import FirebaseInstance from "./FirebaseInstance";
import nextId from "react-id-generator";
const Excel = require("exceljs");

export default function NewResultsView(props) {
  const [codeWorkbook, setCodeWorkbook] = useState(null);
  const [voteWorkbook, setVoteWorkbook] = useState(null);

  useEffect(() => {
    initCodeFile();
    initVoteFile();
  }, []);

  const initCodeFile = () => {
    var workbook = new Excel.Workbook();
    const voteCodeFile = props.voteCodeFile;

    voteCodeFile.arrayBuffer().then((buffer) => {
      workbook.xlsx.load(buffer);
    });
    setCodeWorkbook(workbook);
    console.log(workbook);
  };

  const initVoteFile = () => {
    var workbook = new Excel.Workbook();
    const voteFile = props.voteFile;
    voteFile.arrayBuffer().then((buffer) => {
      workbook.xlsx.load(buffer);
    });
    setVoteWorkbook(workbook);
    console.log(workbook);
  };

  return <div>Hej!</div>;
}
