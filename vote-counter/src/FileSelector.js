import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css';
import "./FileSelector.css";
import React from 'react';
import Firebase from "./FirebaseInstance";

class FileSelector extends React.Component {
    constructor(props) {
        super(props);

        this.setCodeRef = ref => {
            this.codeFile = ref;
        }

        this.setVoteRef = ref => {
            this.voteFile = ref;
        }

        this.handleVotingCodes = this.handleVotingCodes.bind(this);
    }

    handleVotingCodes = event => {
        const file = this.voteFile.files[0];
        const storageRef = Firebase.storage().ref();
        const excelFile = storageRef.child("voting_codes.xlsx");

        excelFile.put(file).then((snapshot) => {
            excelFile.getDownloadURL().then((url) => {
                this.setState({
                    votingCodesFile: url
                });
            });
        });
    }

    handleVotes = event => {
        const file = this.codeFile.files[0];
        const storageRef = Firebase.storage().ref();
        const excelFile = storageRef.child("votes.xlsx");

        excelFile.put(file).then((snapshot) => {
            excelFile.getDownloadURL().then((url) => {
                this.setState({
                    votesFile: url
                });
            });
        });
    }

    render() {
        return (
            <div>
                <div>
                    <input type="file" ref={this.setCodeRef} />
                    <button type="button" onClick={this.handleVotingCodes}>Upload</button>
                </div>
                <div>
                    <input type="file" ref={this.setVoteRef} />
                    <button type="button" onClick={this.handleVotes}>Upload</button>
                </div>
            </div>
        );
    }
}

export default FileSelector;
