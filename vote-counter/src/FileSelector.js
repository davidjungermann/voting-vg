import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.js";
import 'mdbreact/dist/css/mdb.css';
import "./FileSelector.css";
import React from 'react';
import firebase from "firebase";
import storage from "firebase/storage";

class FileSelector extends React.Component {
    constructor(props) {
        super(props);

        this.setRef = ref => {
            this.file = ref;
        }

        const config = {
            apiKey: "AIzaSyCQnGWPb9g0qVM-mYsuvC-MlbWztZBdtmw",
            authDomain: "vg-voting-83c84.firebaseapp.com",
            databaseURL: "https://vg-voting-83c84.firebaseio.com",
            projectId: "vg-voting-83c84",
            storageBucket: "vg-voting-83c84.appspot.com",
            messagingSenderId: "14819118797",
            appId: "1:14819118797:web:6a3006215809c1a8ffe384"
        };

        firebase.initializeApp(config);
        this.onClick = this.onClick.bind(this);
    }

    onClick = event => {
        const file = this.file.files[0];
        const storageRef = firebase.storage().ref();
    }

    render() {
        return (
            <div>
                <input type="file" ref={this.setRef} />
                <button type="button" onClick={this.onClick}>Upload</button>
            </div>
        );
    }
}

export default FileSelector;
