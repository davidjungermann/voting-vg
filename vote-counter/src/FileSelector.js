import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import FirebaseInstance from "./FirebaseInstance";

class FileSelector extends React.Component {
    constructor(props) {
        super(props);

        this.setCodeRef = ref => {
            this.codeFile = ref;
        }

        this.setVoteRef = ref => {
            this.voteFile = ref;
        }
        this.firebase = new FirebaseInstance().firebase;
        this.handleVotingCodes = this.handleVotingCodes.bind(this);
        this.handleVotes = this.handleVotes.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    handleVotingCodes = event => {
        const file = this.codeFile.files[0];
        const storageRef = this.firebase.storage().ref();
        const excelFile = storageRef.child("voting_codes.xlsx");

        if (!file) {
            alert("Välj en fil med röstkoder.")
        }

        excelFile.put(file).then((snapshot) => {
            excelFile.getDownloadURL().then((url) => {
                this.setState({
                    votingCodesFile: url
                });
            });
        });
    }

    handleVotes = event => {
        const file = this.voteFile.files[0];
        const storageRef = this.firebase.storage().ref();
        const excelFile = storageRef.child("votes.xlsx");

        if (!file) {
            alert("Välj en fil med röster.")
        }

        excelFile.put(file).then((snapshot) => {
            excelFile.getDownloadURL().then((url) => {
                this.setState({
                    votesFile: url
                });
            });
        });
    }

    onClick = event => {
        this.handleVotes();
        this.handleVotingCodes();
        this.props.history.push('/results');
        event.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div>
                    <div className="row justify-content-center">
                        <div className="ml-5 mr-2">
                            <h4>Ladda upp fil med röstkoder</h4>
                            <input type="file" className="form-control-file" ref={this.setCodeRef} />
                        </div>
                        <br></br>
                        <div className="ml-4">
                            <h4>Ladda upp fil med röster</h4>
                            <input type="file" className="form-control-file" ref={this.setVoteRef} />
                        </div>
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <div className="col text-center">
                        <button type="button" className="btn btn-success m-4 btn-lg" onClick={this.onClick}>Ladda upp</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileSelector;
