import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import FirebaseInstance from "./FirebaseInstance";
import nextId from "react-id-generator";
const Excel = require('exceljs');

class VoteView extends React.Component {

    constructor(props) {
        super(props);
        this.firebase = new FirebaseInstance().firebase;
        this.codeWorkbook = null;
        this.voteWorkbook = null;
        this.state = { votingResult: [], finalResults: [], resultsVisible: false, resultButtonVisible: true, isResultValid: true }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.codeWorkbook = this.initCodeFile();
        this.voteWorkbook = this.initVoteFile();
    }

    initVoteFile() {
        var workbook = new Excel.Workbook();
        const storageRef = this.firebase.storage().ref();
        storageRef.child('votes.xlsx').getDownloadURL().then(function (url) {
            fetch(url).then(result => {
                result.blob().then(file => {
                    file.arrayBuffer().then(buffer => {
                        workbook.xlsx.load(buffer);
                    });
                });
            });
        }).catch(function (error) {
            alert("Något gick fel, försök igen!" + error);
        });
        return workbook;
    }

    initCodeFile() {
        var workbook = new Excel.Workbook();
        const storageRef = this.firebase.storage().ref();
        storageRef.child('voting_codes.xlsx').getDownloadURL().then(function (url) {
            fetch(url).then(result => {
                result.blob().then(file => {
                    file.arrayBuffer().then(buffer => {
                        workbook.xlsx.load(buffer);
                    });
                });
            });
        }).catch(function (error) {
            alert("Något gick fel, försök igen!" + error);
        });
        return workbook;
    }

    getVotingCodes(wb) {
        let codes = [];
        const workbook = wb;
        workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
        return codes.slice(1);
    }

    getReferenceCodes() {
        let referenceCodes = [];
        const workbook = this.codeWorkbook;
        workbook.getWorksheet().getColumn("A").eachCell(content => referenceCodes.push(content.text));
        return referenceCodes;
    }

    compareVotingCodes() {
        const workbook = this.voteWorkbook
        let previousVoters = [];
        let codes = this.getVotingCodes(workbook);
        let referenceCodes = this.getReferenceCodes();
        var result = [];
        var invalidCodes = [];

        codes.forEach(code => {
            if (referenceCodes.includes(code)) {
                previousVoters.push(code);
                result.push("Giltig röst: " + code);
                referenceCodes = referenceCodes.filter(x => x !== code);
            } else if (previousVoters.includes(code)) {
                invalidCodes.push("Ogiltig röst, har röstat mer än 1 gång: " + code);
                this.setState({ isResultValid: false });
            } else {
                invalidCodes.push("Ogiltig röst, ej registrerad: " + code);
                this.setState({ isResultValid: false });
            }
        });
        return [result, invalidCodes];
    }

    getElections(wb) {
        var columnHeaders = {};
        const workbook = wb;
        workbook.getWorksheet().getRow(1).eachCell(content => {
            if (content.text !== "Tidstämpel" && content.text !== "Valkod") {
                columnHeaders[content.text] = [];
            }
        });
        return columnHeaders;
    }

    getVotes(wb) {
        const workbook = wb;
        let worksheet = workbook.getWorksheet();
        let electionVotes = this.getElections(workbook);
        for (let i = 3; i <= worksheet.actualColumnCount; i++) {
            worksheet.getColumn(i).eachCell(cell => {
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
    }

    countVotes() {
        const votes = this.getVotes(this.voteWorkbook);
        const results = {};
        for (let prop in votes) {
            votes[prop].forEach(vote => {
                vote = vote.split(",");
                vote.forEach(vote => {
                    results[vote.trim()] = (results[vote.trim()] + 1) || 1;
                });
            });
        }
        return results;
    }

    // --------------------------------------------------------------------------------------------------------------------------------------- //

    onClick = event => {
        this.props.history.push('/file-selector');
        event.preventDefault();
    }

    calculateResults = event => {
        var result = this.countVotes();
        var votingResult = [];
        this.compareVotingCodes().forEach(array => array.forEach(vote => votingResult.push(vote)));
        var objArray = Object.entries(result);
        var finalResult = [];

        objArray.forEach(([key, value]) => {
            if (value === 1) {
                var s = " röst"
            } else {
                s = " röster"
            }
            finalResult.push(key + ": " + value + s);
        });

        this.setState({ votingResult: votingResult, finalResults: finalResult, resultsVisible: true, resultButtonVisible: false })
    }

    resultButton() {
        return (
            <div className="col text-center">
                <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.calculateResults}>Visa valresultat</button>
            </div>
        );
    }

    resultList() {
        return (
            <div className="container w-75">
                <h1><b>Röstvalidering</b></h1>
                <ul className="list-group">
                    {this.state.votingResult.map((result) =>
                        <li key={nextId()} className="list-group-item"> {<h3> {result}</h3>}</li>
                    )
                    }
                </ul>
                <br></br>
                <br></br>
                <br></br>

                <h1><b>Resultat</b></h1>
                <ul className="list-group">
                    {this.state.finalResults.map((result) =>
                        <li key={nextId()} className="list-group-item"> {<h3> {result}</h3>}</li>
                    )
                    }
                </ul>
                <div className="col text-center">
                    <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.onClick}>Genomför en ny röstning</button>
                </div>
            </div >
        );
    }

    render() {
        return (
            <div className="container w-50">
                {this.state.resultsVisible ? this.resultList() : null}
                <div className="row">

                </div>
                {this.state.resultButtonVisible ? this.resultButton() : null}
            </div>
        );
    }
}

export default VoteView;