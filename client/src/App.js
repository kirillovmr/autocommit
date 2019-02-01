import React, { Component } from 'react';
import './App.css';
import DB from './DB';

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
      userProfile: null,
      unusedKey: null
    };
  }

  componentDidMount() {
    this.db.getUnusedKey().then(key => {
      const id = Object.keys(key)[0];
      const ssh = key[id];
      console.log(id, ssh);

      // this.db.removeUnusedKey(id).then(() => {
      //   console.log('Key romoved');
      // })
    });
  }

  onLoginSuccess(result) {
    console.log('onLoginSuccess this', this);
    const username = result.additionalUserInfo.username;
    const userData = {
      email: result.user.email,
      accessToken: result.credential.accessToken,
      photoUrl: result.user.photoURL
    };
    this.db.addUserToDB(username, userData);

    this.setState({
      isSignedIn: true,
      userProfile: result.user
    });
  }

  onLogOut() {
    this.setState({
      isSignedIn: false,
      userProfile: null
    });
  }

  renderButtons() {
    if (!this.state.isSignedIn)
      return <button onClick={() => this.db.login((result) => this.onLoginSuccess(result))}>Login</button>
    else
      return <button onClick={() => this.db.logout(() => this.onLogOut())}>Logout</button>
  }

  render() {
    console.log('Rerender', this.state)
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
