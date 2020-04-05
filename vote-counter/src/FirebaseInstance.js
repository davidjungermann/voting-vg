import firebase from "firebase";

const config = {
  // Config not included. 
};

class FirebaseInstance {
  constructor() {
    !firebase.apps.length ? this.firebase = firebase.initializeApp(config) : this.firebase = firebase.app();
  }
}
export default FirebaseInstance;
