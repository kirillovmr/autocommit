import React, { Component } from 'react';
import './App.css';
import config from './firebaseConfig';
import firebase from 'firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignedIn: false,
      userProfile: null
    };
  }

  login(){
    if (!this.state.isSignedIn) {
      // Start a sign in process for an unauthenticated user.
      var provider = new firebase.auth.GithubAuthProvider();
      provider.addScope('repo');
      firebase.auth().signInWithPopup(provider).then((result) => {
        this.setState({
          isSignedIn: true,
          userProfile: result.user
        });
      });
    }
  }
  
  componentDidMount() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          isSignedIn: true,
          userProfile: user
        });
      } else {
        this.login();
      }
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
