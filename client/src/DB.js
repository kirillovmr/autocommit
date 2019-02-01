import firebase from "firebase/app";
import config from './firebaseConfig'

// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");

export default class DB {
  constructor(onStateChanged=()=>{}) {
    this.firebase = firebase;
    this.firebase.initializeApp(config);

    this.firebase.auth().onAuthStateChanged((user) => {
      onStateChanged(user);
    });

    this.user = null;
  }

  login(success=(result)=>{}, error=()=>{}) {
    // Start a sign in process for an unauthenticated user.
    var provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('repo');
    firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log('User successfully logged in.');
      this.user = result.user;
      success(result);
    })
    .catch(function(e) {
      console.error('Sign in error', e);
      error();
    });
  }

  logout(success=()=>{}, error=()=>{}) {
    this.firebase.auth().signOut()
    .then(() => {
      console.log('User logged out');
      this.user = null;
      success();
    })
    .catch(e => {
      console.log('Sign out error', e);
      error();
    })
  }

  addUserToDB(username, userData, success=()=>{}, error=()=>{}) {
    const ref = this.firebase.database().ref('users');
    ref.update({
      [username]: userData
    })
    .then(() => {
      console.log(`DB ${username} successfully added to database`);
      success();
    })
    .catch(e => {
      console.log(`DB error adding ${username} to database`);
      error(e);
    });
  }

  // Returns a promise and key-value
  getUnusedKey() {
    var ref = this.firebase.database().ref("keys");
    return new Promise((resolve, reject) => {
      ref.limitToLast(1).once("value", function(data) {
        resolve(data.val());
      });
    });
  }

  // Removes username by key reference
  removeUnusedKey(keyRef) {
    var ref = this.firebase.database().ref("keys");
    return new Promise((resolve, reject) => {
      ref.child(keyRef).remove(() => {
        resolve('Removed');
      })
    })
  }
}