import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import FirebaseInstance from "./FirebaseInstance";
const Excel = require('exceljs');

class VoteView extends React.Component {

    constructor(props) {
        super(props);
        this.firebase = new FirebaseInstance().firebase;
        this.codeWorkbook = null;
        this.voteWorkbook = null;
        this.state = { finalResults: [] }
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
            alert("kuken");
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
            alert("kuken");
        });
        return workbook;
    }

    getVotingCodes(wb) {
        let codes = [];
        const workbook = wb;
        workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
        return codes.slice(1);
    }

    getReferenceCodes(wb) {
        let referenceCodes = [];
        const workbook = wb;
        workbook.getWorksheet().getColumn("A").eachCell(content => referenceCodes.push(content.text));
        return referenceCodes;
    }

    compareVotingCodes() {
        const workbook = this.voteWorkbook
        let previousVoters = [];
        let codes = this.getVotingCodes(workbook);
        let referenceCodes = this.getReferenceCodes(workbook);
        var result = [];

        codes.forEach(code => {
            if (referenceCodes.includes(code)) {
                previousVoters.push(code);
                result.push("Valid vote: " + code);
                referenceCodes = referenceCodes.filter(x => x !== code);
            } else if (previousVoters.includes(code)) {
                result.push("Invalid vote, has voted more than once: " + code);
            } else {
                result.push("Invalid vote, not registered as a voter: " + code)
            }
        });
        return result;
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
            votes[prop].map(vote => {
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

    testStuff = event => {
        var result = this.countVotes();
        var votingResult = this.compareVotingCodes();
        console.log(result);
        console.log(votingResult);
        this.setState({ finalResults: result })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.onClick}>Gör en ny röstning</button>
                        <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.testStuff}>Visa resultat</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteView;