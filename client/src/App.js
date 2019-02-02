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

        // Todo
        // Try to find thst user in 'commits' table
        /**
         * this.setState({
         *   autocommits: true || false
         * });
         */
      }
    });

    this.state = {
      initialFetchDone: false,
      timerDone: false,
      userProfile: null,
      autocommits: false,
      unusedKey: null,
      page: null
    };
  }

  componentDidMount() {
    // this.db.getUnusedKey().then(key => {
    //   const id = Object.keys(key)[0];
    //   const ssh = key[id];
    //   // console.log(id, ssh);

    //   // this.db.removeUnusedKey(id).then(() => {
    //   //   console.log('Key romoved');
    //   // })
    // });

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
    if (!this.state.initialFetchDone || !this.state.timerDone)
      return <LoadingPage />
    if (!this.state.userProfile)
      return <LandingPage login = {() => this.db.login((result) => this.onLoginSuccess(result))} />
    else
      return <DashboardPage 
        logout={() => this.db.logout(() => this.onLogOut())}
        user={this.state.userProfile}
        autocommits={this.state.autocommits}
        changePage={this.chandePage.bind(this)}
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
