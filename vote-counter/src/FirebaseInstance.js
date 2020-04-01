import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCQnGWPb9g0qVM-mYsuvC-MlbWztZBdtmw",
  authDomain: "vg-voting-83c84.firebaseapp.com",
  databaseURL: "https://vg-voting-83c84.firebaseio.com",
  projectId: "vg-voting-83c84",
  storageBucket: "vg-voting-83c84.appspot.com",
  messagingSenderId: "14819118797",
  appId: "1:14819118797:web:6a3006215809c1a8ffe384"
};

class FirebaseInstance {
  constructor() {
    !firebase.apps.length ? this.firebase = firebase.initializeApp(config) : this.firebase = firebase.app();
  }
}
export default FirebaseInstance;
