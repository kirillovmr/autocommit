import React, { Component } from 'react';
import './App.css';
// import config from './firebaseConfig';
import firebase from './DB';
import { DB } from './DB';
// import firebase from "firebase/app";

// // Add additional services that you want to use
// require("firebase/auth");
// require("firebase/database");

class App extends Component {
  constructor(props) {
    super(props);

    this.db = new DB((user) => {
      if (user) {
        this.setState({
          isSignedIn: true,
          userProfile: user
        });
      }
    });

    this.state = {
      isSignedIn: false,
      userProfile: null
    };
  }

  // login(){
  //   // Start a sign in process for an unauthenticated user.
  //   var provider = new firebase.auth.GithubAuthProvider();
  //   provider.addScope('repo');
  //   firebase.auth().signInWithPopup(provider)
  //   .then((result) => {
      
  //     console.log('User successfully logged in.');
  //     const username = result.additionalUserInfo.username;
  //     const email = result.user.email;
  //     const accessToken = result.credential.accessToken;
  //     const photoUrl = result.user.photoURL;
  //     console.log('Photo', photoUrl);
  //     console.log(result);

  //     addUserToDB(username, email, accessToken, photoUrl)
  //     .then(() => {
  //       console.log('User successfully added to database');
  //     })
  //     .catch(e => {
  //       console.log('Error adding user to DB', e);
  //     })

  //     this.setState({
  //       isSignedIn: true,
  //       userProfile: result.user
  //     });
  //   })
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;

  //     if (errorCode === 'auth/account-exists-with-different-credential') {
  //       alert('You have signed up with a different provider for that email.');
  //       // Handle linking here if your app allows it.
  //     } else {
  //       console.error(error);
  //     }
  //   });
  // }

  renderButtons() {
    if (!this.state.isSignedIn)
      return <button onClick={() => this.db.login()}>Login</button>
    else
      return <button onClick={() => this.db.logout()}>Logout</button>
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          {this.renderButtons()}
        </header>
      </div>
    );
  }
}

export default App;
