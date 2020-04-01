import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from "react";
import FirebaseInstance from "./FirebaseInstance";
const Excel = require('exceljs');

class VoteView extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = { voteWorkbook: null, codeWorkbook: null }
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.firebase = new FirebaseInstance().firebase;

        this.initCodeFile().then(result => {
            if (this._isMounted) {
                this.setState({ codeWorkbook: result });
            }
        });

        this.initVoteFile().then(result => {
            if (this._isMounted) {
                this.setState({ voteWorkbook: result });
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async initVoteFile() {
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
            // Handle any errors
        });
        return workbook;
    }

    async initCodeFile() {
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
            // Handle any errors
        });
        return workbook;
    }

    async getVotingCodes() {
        let codes = [];
        const workbook = this.state.voteWorkbook;
        workbook.getWorksheet().getColumn("B").eachCell(content => codes.push(content.text));
        return codes.slice(1);
    }

    async getReferenceCodes() {
        let referenceCodes = [];
        const workbook = this.state.codeWorkbook;
        workbook.getWorksheet().getColumn("A").eachCell(content => referenceCodes.push(content.text));
        return referenceCodes;
    }

    async compareVotingCodes() {
        let previousVoters = [];
        let codes = await this.getVotingCodes();
        let referenceCodes = await this.getReferenceCodes();
    
        codes.forEach(code => {
            if (referenceCodes.includes(code)) {
                previousVoters.push(code);
                console.log("Valid vote: " + code);
                referenceCodes = referenceCodes.filter(x => x !== code);
            } else if (previousVoters.includes(code)) {
                console.log("Invalid vote, has voted more than once: " + code);
            } else {
                console.log("Invalid vote, not registered as a voter: " + code);
            }
        });
    }

    async getElections() {
        var columnHeaders = {};
        const workbook = this.state.voteWorkbook;
        workbook.getWorksheet().getRow(1).eachCell(content => {
            if (content.text !== "Tidstämpel" && content.text !== "Valkod") {
                columnHeaders[content.text] = [];
            }
        });
        return columnHeaders;
    }

    async getVotes() {
        const workbook = this.state.voteWorkbook;
        let worksheet = workbook.getWorksheet();
        let electionVotes = await this.getElections();
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

    async countVotes() {
        const votes = await this.getVotes();
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
       this.countVotes().then(result => console.log(result))
    }

    render() {
        return (
            <div className="container">
                <div class="row">
                    <div class="col text-center">
                        <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.onClick}>Gör en ny röstning</button>
                        <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.testStuff}>Prova grejer</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default VoteView;