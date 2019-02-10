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
      console.error('Sign out error', e);
      error();
    })
  }

  // Changes standart Display name to GitHub username
  changeUserDisplayName(newName) {
    const user = this.firebase.auth().currentUser;

    return new Promise((resolve, reject) => {
      user.updateProfile({
        displayName: newName
      }).then(function() {
        console.log('Display name successfully changed');
        resolve(user);
      }, function(e) {
        console.error('Error changing display name', e);
      });
    })
  }

  // Adds user to DB/users
  addUserToDB(username, userData, success=()=>{}, error=()=>{}) {
    const ref = this.firebase.database().ref('users');

    ref.update({
      [username]: {
        ...userData
      }
    })
    .then(() => {
      console.log(`DB ${username} successfully added to database`);
      success();
    })
    .catch(e => {
      console.error(`DB error adding ${username} to database`);
      error(e);
    });
  }

  // Returns user from DB/users
  getUserFromDB(username) {
    const ref = this.firebase.database().ref(`users/${username}`);

    return new Promise((resolve, reject) => {
      ref.once("value", function(data) {
        console.log(`Found ${username}`);
        resolve(data.val());
      });
    });
  }

  // Returns array with users photo
  getUsersImage() {
    const ref = this.firebase.database().ref(`users`);

    return new Promise((resolve, reject) => {
      ref.limitToLast(21).once("value", function(data) {
        const res = data.val();
        const images = Object.keys(res).map(username => {
          return res[username].photoUrl;
        });
        resolve(images);
      });
    });
  }

  toggleCommits(username, toggle) {
    const ref = this.firebase.database().ref(`users/${username}`);

    return new Promise((resolve, reject) => {
      ref.update({
        autocommits: toggle
      })
      .then(() => {
        console.log(`Autocommits for ${username} was set to ${toggle}`);
        resolve();
      })
      .catch(e => {
        console.error(`Error setting ${username} autocommits to ${toggle}`);
        reject(e);
      });
    });
  }
}