import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import FirebaseInstance from "./FirebaseInstance"

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
    }

    handleVotingCodes = event => {
        const file = this.codeFile.files[0];
        const storageRef = this.firebase.storage().ref();
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
        const file = this.voteFile.files[0];
        const storageRef = this.firebase.storage().ref();
        const excelFile = storageRef.child("votes.xlsx");

        excelFile.put(file).then((snapshot) => {
            excelFile.getDownloadURL().then((url) => {
                this.setState({
                    votesFile: url
                });
            });
        });
        var storage = this.firebase.storage();
        var pathReference = storage.ref('votes.xlsx');
        storageRef.child('votes.xlsx').getDownloadURL().then(function (url) {
            let excelFile = url;
            fetch(url).then(result => {
                result.blob().then(file => {
                    console.log(file);
                });
            });
        }).catch(function (error) {
            // Handle any errors
        });
    }

    render() {
        return (
            <div className="container">
                <div className="d-flex">
                    <div className="pl-5 mr-2">
                        <h5>Ladda upp din fil med röstkoder</h5>
                        <input type="file" className="form-control-file" ref={this.setCodeRef} />
                        <br></br>
                        <button type="button" className="btn btn-success" onClick={this.handleVotingCodes}>Ladda upp</button>
                    </div>
                    <br></br>
                    <div className="ml-5">
                        <h5>Ladda upp din fil med röster</h5>
                        <input type="file" className="form-control-file" ref={this.setVoteRef} />
                        <br></br>
                        <button type="button" className="btn btn-success" onClick={this.handleVotes}>Ladda upp</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FileSelector;
