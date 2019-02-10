import React, { Component } from 'react';
import DB from './DB';
import './App.css';

import LandingPage from './Pages/LandingPage';
import DashboardPage from './Pages/DashboardPage';
import LoadingPage from './Pages/LoadingPage';
import DocsPage from './Pages/DocsPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.db = new DB((user) => {
      if (user) {
        this.setState({
          initialFetchDone: true,
          userProfile: user
        });
      } else {
        this.setState({
          initialFetchDone: true
        })
      }
    });

    this.state = {
      initialFetchDone: false,
      timerDone: false,
      userProfile: null,
      page: null
    };
  }

  componentDidMount() {
    // Loading timer
    setTimeout(() => {
      this.setState({
        timerDone: true
      });
    }, 600)
  }

  onSignInSuccess(result) {
    const username = result.additionalUserInfo.username;
    console.log('📦 Sign in');

    // Try to find user in db
    this.db.getUserFromDB(username)
    .then(user => {
      
      // Setting autocommits value from DB or false if sign in first time
      let autocommits = !!user ? user.autocommits : false;
      let commits = !!user ? user.commits : 0;

      // Adding GitHub username to Firebase user object
      this.db.changeUserDisplayName(username).then(user => {
        const userData = {
          email: user.email,
          autocommits,
          accessToken: result.credential.accessToken,
          photoUrl: user.photoURL,
          commits
        };
        this.db.addUserToDB(username, userData);
    
        this.setState({
          userProfile: user
        });
      });
    });
  }

  onLogOut() {
    this.setState({
      userProfile: null
    });
  }

  chandePage(page) {
    switch(page){
      case 'docs':
        this.setState({page});
        return;
      default:
        return;
    }
  }

  returnPage(page) {
    switch(page) {
      case 'docs':
        return <DocsPage />;
      default:
        return null;
    }
  }

  renderPage() {
    if (this.state.page)
      return this.returnPage(this.state.page);
    if (!this.state.timerDone)
      return <LoadingPage />
    if (!this.state.userProfile)
      return <LandingPage 
        login = {() => this.db.login((result) => this.onSignInSuccess(result))} 
        changePage={this.chandePage.bind(this)}
        db={this.db}
      />
    else
      return <DashboardPage 
        logout={() => this.db.logout(() => this.onLogOut())}
        user={this.state.userProfile}
        changePage={this.chandePage.bind(this)}
        db={this.db}
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
