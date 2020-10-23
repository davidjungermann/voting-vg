import firebase from "firebase";
require("dotenv").config();

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: "vg-voting-83c84.appspot.com",
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

class FirebaseInstance {
  constructor() {
    !firebase.apps.length
      ? (this.firebase = firebase.initializeApp(config))
      : (this.firebase = firebase.app());
  }
}
export default FirebaseInstance;
