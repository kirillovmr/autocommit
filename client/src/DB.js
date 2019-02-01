import firebase from "firebase/app";
import config from './firebaseConfig'

// Add additional services that you want to use
require("firebase/auth");
require("firebase/database");

export default firebase;

export class DB {
  constructor(onStateChanged=(user)=>{}) {
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

  logout(cb =()=>{}) {
    this.firebase.auth().signOut()
    .then(() => {
      console.log('User logged out');
      this.user = null;
      cb();
    })
    .catch(e => {
      console.log('Sign out error', e);
    })
  }
}

export function addUserToDB(username, email, githubToken, photoUrl) {
  const ref = firebase.database().ref('users');
  return new Promise((resolve, reject) => {
    ref.update({
      [username]: {
        email: email,
        githubToken: githubToken,
        photoUrl: photoUrl
      }
    })
    .then(() => {
      resolve();
    })
    .catch(e => {
      reject(e);
    });
  })
}