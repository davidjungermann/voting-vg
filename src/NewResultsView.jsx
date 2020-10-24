import React, { useState, useEffect } from "react";
import nextId from "react-id-generator";
const Excel = require("exceljs");

export default function NewResultsView(props) {
  const [codeWorkbook, setCodeWorkbook] = useState(null);
  const [voteWorkbook, setVoteWorkbook] = useState(null);
  const [resultValid, setResultValid] = useState(null);
  const [voteLengthCorrect, setVoteLengthCorrect] = useState(null);
  const [votingResult, setVotingResult] = useState([]);
  const [finalResult, setFinalResult] = useState([]);
  const [resultVisible, setResultVisible] = useState(false);
  const [voteLength, setVoteLength] = useState(0);
  const [voteLengthResult, setVoteLengthResult] = useState(null);
  const [resultButtonVisible, setResultButtonVisible] = useState(null);

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
  };

  const initVoteFile = () => {
    var workbook = new Excel.Workbook();
    const voteFile = props.voteFile;
    voteFile.arrayBuffer().then((buffer) => {
      workbook.xlsx.load(buffer);
    });
    setVoteWorkbook(workbook);
  };

  const getVotingCodes = () => {
    let codes = [];
    const workbook = codeWorkbook;
    workbook
      .getWorksheet()
      .getColumn("B")
      .eachCell((content) => codes.push(content.text));
    return codes.slice(1);
  };

  const getReferenceCodes = () => {
    let referenceCodes = [];
    const workbook = voteWorkbook;
    workbook
      .getWorksheet()
      .getColumn("A")
      .eachCell((content) => referenceCodes.push(content.text));
    return referenceCodes;
  };

  const compareVoteLength = () => {
    var nonVoters = [];
    let codes = getVotingCodes();
    let referenceCodes = getReferenceCodes();
    if (referenceCodes.length > codes.length) {
      setResultValid(false);
      setVoteLengthCorrect(false);
      let difference = referenceCodes.filter((x) => !codes.includes(x));
      difference.forEach((code) => {
        nonVoters.push("Registrerad, men har ej röstat: " + code);
      });
    } else if (referenceCodes.length < codes.length) {
      setVoteLengthCorrect(false);
    } else {
      setResultValid(true);
    }
    return nonVoters;
  };

  const compareVotingCodes = () => {
    let previousVoters = [];
    let codes = getVotingCodes();
    let referenceCodes = getReferenceCodes();
    var result = [];
    var invalidCodes = [];

    codes.forEach((code) => {
      if (referenceCodes.includes(code)) {
        previousVoters.push(code);
        result.push("Giltig röst: " + code);
        referenceCodes = referenceCodes.filter((x) => x !== code);
      } else if (previousVoters.includes(code)) {
        invalidCodes.push("Ogiltig röst, har röstat mer än 1 gång: " + code);
        setResultValid(false);
      } else {
        invalidCodes.push("Ogiltig röst, ej registrerad: " + code);
        setResultValid(false);
      }
    });
    if (invalidCodes.length === 0) {
      setResultValid(true);
    }
    return [result, invalidCodes];
  };

  const getElections = () => {
    var columnHeaders = {};
    const workbook = voteWorkbook;
    workbook
      .getWorksheet()
      .getRow(1)
      .eachCell((content) => {
        if (content.text !== "Tidstämpel" && content.text !== "Valkod") {
          columnHeaders[content.text] = [];
        }
      });
    return columnHeaders;
  };

  const getVotes = () => {
    const workbook = voteWorkbook;
    let worksheet = workbook.getWorksheet();
    let electionVotes = getElections();
    for (let i = 3; i <= worksheet.actualColumnCount; i++) {
      worksheet.getColumn(i).eachCell((cell) => {
        for (let prop in electionVotes) {
          if (cell.text.startsWith(prop)) {
            let votes = electionVotes[prop];
            votes.push(cell.text);
            electionVotes[prop] = votes;
          }
        }
      });
    }
    for (let prop in electionVotes) {
      electionVotes[prop].shift();
    }
    return electionVotes;
  };

  const countVotes = () => {
    const votes = getVotes();
    const results = {};
    for (let prop in votes) {
      votes[prop].forEach((vote) => {
        vote = vote.split(",");
        vote.forEach((vote) => {
          vote = vote.trim();
          if (vote.endsWith("*")) {
            vote = vote.replace(/\*/g, "");
          }
          results[vote] = results[vote] + 1 || 1;
        });
      });
    }
    return results;
  };

  // --------------------------------------------------------------------------------------------------------------------------------------- //

  const onNewVoteCount = (event) => {
    event.preventDefault();
    setCodeWorkbook(null);
    setVoteWorkbook(null);
    setResultValid(null);
    setVoteLengthCorrect(null);
    props.setSubmitted(false);
  };

  const calculateResults = () => {
    var result = countVotes();
    var votingResult = [];
    compareVotingCodes().forEach((array) =>
      array.forEach((vote) => votingResult.push(vote))
    );
    var objArray = Object.entries(result);
    var finalResult = [];

    objArray.forEach(([key, value]) => {
      if (value === 1) {
        var s = " röst";
      } else {
        s = " röster";
      }
      finalResult.push(key + ": " + value + s);
    });
    setVotingResult(votingResult);
    setFinalResult(finalResult);
    setResultVisible(true);
    setResultButtonVisible(false);
    setVoteLength(getReferenceCodes().length);
    setVoteLengthResult(compareVoteLength());
  };

  const resultButton = () => {
    return (
      <div className="col text-center">
        <button
          type="button"
          className="btn btn-success m-4 btn-lg"
          onClick={calculateResults}
        >
          Visa valresultat
        </button>
      </div>
    );
  };

  const resultList = () => {
    if (resultValid && voteLengthCorrect) {
      return (
        <div className="container w-75">
          <h1>
            <b>Resultat</b>
          </h1>
          <ul className="list-group">
            {finalResult.map((result) => (
              <li key={nextId()} className="list-group-item">
                {" "}
                {<h3> {result}</h3>}
              </li>
            ))}
          </ul>
          <br></br>
          <br></br>
          <br></br>
          <h1>
            <b>Röstvalidering</b>
          </h1>
          <br></br>
          <h3>
            <b>Antal röstande: {votingResult.length}</b>
          </h3>
          <h3>
            <b>Röstlängd: {voteLength}</b>
          </h3>
          <br></br>
          <ul className="list-group">
            {votingResult.map((result) => (
              <li key={nextId()} className="list-group-item">
                {" "}
                {<h3> {result}</h3>}
              </li>
            ))}
          </ul>

          <div className="col text-center">
            <button
              type="button"
              className="btn btn-success m-4 btn-lg"
              onClick={onNewVoteCount}
            >
              Genomför en ny röstning
            </button>
          </div>
        </div>
      );
    } else if (resultValid && !voteLengthCorrect) {
      return (
        <div className="container w-75">
          <h5>
            <b>
              Röstningen är inte giltig. Röstlängd och antalet röster stämmer
              överensstämmer inte.
            </b>
          </h5>
          <br></br>
          <ul className="list-group">
            {voteLengthResult.map((result) => (
              <li key={nextId()} className="list-group-item">
                {" "}
                {<h3> {result}</h3>}
              </li>
            ))}
          </ul>
          <li className="list-group-item">
            <h5>Antal röstande: {votingResult.length}</h5>
            <h5>Röstlängd: {voteLength}</h5>
          </li>
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-success m-4 btn-lg"
              onClick={onNewVoteCount}
            >
              Genomför en ny röstning
            </button>
          </div>
        </div>
      );
    } else if (!resultValid && voteLengthCorrect) {
      return (
        <div className="container w-75">
          <h5>
            <b>
              Röstningen är inte giltig. Ta bort ogiltiga röster ur Excel-arket
              och ladda upp igen:{" "}
            </b>
          </h5>
          <br></br>
          <ul className="list-group">
            {votingResult.map((result) => (
              <li key={nextId()} className="list-group-item">
                {" "}
                {<h3> {result}</h3>}
              </li>
            ))}
          </ul>
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-success m-4 btn-lg"
              onClick={onNewVoteCount}
            >
              Genomför en ny röstning
            </button>
          </div>
        </div>
      );
    } else if (!resultValid && !voteLengthCorrect) {
      return (
        <div className="container w-75">
          <h5>
            <b>
              Röstningen är inte giltig. Ta bort ogiltiga röster ur Excel-arket
              och ladda upp igen:{" "}
            </b>
          </h5>
          <br></br>
          <ul className="list-group">
            {votingResult.map((result) => (
              <li key={nextId()} className="list-group-item">
                {" "}
                {<h3> {result}</h3>}
              </li>
            ))}
          </ul>
          <br></br>
          <ul className="list-group">
            {voteLengthResult.map((result) => (
              <li key={nextId()} className="list-group-item">
                {" "}
                {<h3> {result}</h3>}
              </li>
            ))}
          </ul>
          <br></br>
          <h5>
            <b>
              Röstningen är inte giltig. Röstlängd och antalet röster stämmer
              överensstämmer inte.
            </b>
          </h5>
          <br></br>
          <li className="list-group-item">
            <h5>Antal röstande: {votingResult.length}</h5>
            <h5>Röstlängd: {voteLength}</h5>
          </li>
          <div className="col text-center">
            <button
              type="button"
              className="btn btn-success m-4 btn-lg"
              onClick={onNewVoteCount}
            >
              Genomför en ny röstning
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container w-50">
      {resultVisible ? resultList() : null}
      <div className="row"></div>
      {resultButtonVisible ? resultButton() : null}
    </div>
  );
}
