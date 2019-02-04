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

    // Adding GitHub username to Firebase user object
    this.db.changeUserDisplayName(username).then(user => {
      const userData = {
        email: user.email,
        accessToken: result.credential.accessToken,
        photoUrl: user.photoURL
      };
      this.db.addUserToDB(username, userData);
  
      this.setState({
        userProfile: user
      });
    })
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
    // if (!this.state.initialFetchDone || !this.state.timerDone)
    if (!this.state.timerDone)
      return <LoadingPage />
    if (!this.state.userProfile)
      return <LandingPage 
        login = {() => this.db.login((result) => this.onSignInSuccess(result))} 
        changePage={this.chandePage.bind(this)}
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
