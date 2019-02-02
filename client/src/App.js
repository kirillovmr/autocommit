import React, { Component } from 'react';
import DB from './DB';
import './App.css';

import LandingPage from './Pages/LandingPage';
import DashboardPage from './Pages/DashboardPage';
import LoadingPage from './Pages/LoadingPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.db = new DB((user) => {
      if (user) {
        this.setState({
          initialFetchDone: true,
          userProfile: user
        });
      }
    });

    this.state = {
      initialFetchDone: false,
      timerDone: false,
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

    // Loading timer
    setTimeout(() => {
      this.setState({
        timerDone: true
      });
    }, 600)
  }

  onLoginSuccess(result) {
    const username = result.additionalUserInfo.username;
    const userData = {
      email: result.user.email,
      accessToken: result.credential.accessToken,
      photoUrl: result.user.photoURL
    };
    this.db.addUserToDB(username, userData);

    this.setState({
      userProfile: result.user
    });
  }

  onLogOut() {
    this.setState({
      userProfile: null
    });
  }

  renderPage() {
    if (!this.state.initialFetchDone || !this.state.timerDone)
      return <LoadingPage />
    if (!this.state.userProfile)
      return <LandingPage login = {() => this.db.login((result) => this.onLoginSuccess(result))} />
    else
      return <DashboardPage 
        logout={() => this.db.logout(() => this.onLogOut())}
        user={this.state.userProfile}
      />
  }

  render() {
    return (
      <div className="App">
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
