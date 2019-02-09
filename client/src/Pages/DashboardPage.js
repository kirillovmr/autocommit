import React, { Component } from 'react';

import Loading from '../Components/Loading';
import HowItWorks from '../Components/HowItWorks';
import Footer from '../Components/Footer';

import logo from '../img/logo-trans.png';
import imgStage2 from '../img/orderedlistocat.png';
import imgStage1 from '../img/deckfailcat.png';
// Todo
// Copyright images from https://octodex.github.com/

export default class DashboardPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // autocommits: false,
      dbUser: {
        autocommits: false
      },
      buttonSpinner: false
    }
  }

  componentDidMount() {
    console.log('👍 Did Mount run');
    const username = this.props.user.displayName;

    this.props.db.getUserFromDB(username)
    .then((dbUser) => {
      console.log('📡 dbUser got', dbUser);
      if (!dbUser) return this.componentDidMount();
      this.setState({
        dbUser
      });
    })
  }

  toggleCommits(toggle) {
    const username = this.props.user.displayName;

    this.props.db.toggleCommits(username, toggle)
    .then(() => {
      this.setState({
        dbUser: {
          ...this.state.dbUser,
          autocommits: toggle
        }
      });
    });
  }

  renderStatusBlock() {
    const imgSrc=()=>{
      if (this.state.dbUser.autocommits)
        return imgStage2;
      return imgStage1;
    }
    const title=()=>{
      if (this.state.dbUser.autocommits)
        return 'You are enabled 🥳';
      return 'Auto commits disabled 😞';
    }
    const text=()=>{
      if (this.state.dbUser.autocommits)
        return (
          <p>Your autocommits are successfully scheduled and will automatically run every day. <br/>
          You can disable them any time with button below</p>
        );
      return (
        <p>You account is currently disabled from Autocommit system. <br/>
        To schedule on your autocommits press <strong>Enable Autocommits</strong> button below.</p>
      );
    }
    const btn=()=>{
      if (this.state.dbUser.autocommits)
        return (
          <span>
            <button className="btn btn-danger" type="button"
              onClick={() => this.toggleCommits(false)}
            >
              Disable Autocommits
            </button>
          </span>
        );
      return (
        <span>
          <button className="btn btn-success" type="button"
          onClick={() => this.toggleCommits(true)}
          >
            Enable Autocommits
          </button>
        </span>
      );
    }

    if (!this.state.dbUser.email)
      return <Loading />
    return (
      <div className="text-center w-100 mb-2">
        <img className="mb-1" src={imgSrc()} alt="" width="130" height="130" />
        <h1 className="h3 mb-3 font-weight-normal">{title()}</h1>
        {text()}
        {btn()}
      </div>
    );
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
              <span className="navbar-brand text-white">
                <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                Autocommit 2
              </span>
              <img src={this.props.user.photoURL} width="30" height="30" className="d-inline-block ml-2 user-avatar-sm" alt="" />
            </div>
          </nav>
        </header>

        <div className="d-flex flex-column justify-content-between" style={{height: 'calc(100vh - 56px)'}}>
          <main role="main" className="container mb-5">
            <div className="d-flex align-items-center p-3 my-3 text-white bg-grey rounded shadow">
              <img className="mr-3" src={logo} alt="" width="48" height="48" />
              <div className="lh-100 w100">
                <h6 className="mb-0 lh-100 d-flex justify-content-between w-100"><span>GitHub autocommit system</span><i className="fas fa-magic"></i> </h6> 
                <small>This service is used to automatically make contributions on GitHub and keep up your activity.</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
                <span><i className="fab fa-github mr-1"></i> Connected account</span>
                <span className="text-danger text-link" 
                onClick={() => {
                  /* eslint-disable */
                  if(confirm('Are you sure want to logout?'))
                  /* eslint-enable */
                  this.props.logout();
                }}>
                  Logout
                </span>
              </h6>
              <div className="media text-muted pt-3">
                <img src={this.props.user.photoURL} width="32" height="32" className="bd-placeholder-img mr-2 rounded" alt="" />
                <p className="media-body pb-0 mb-0 small lh-125 d-flex justify-content-between w-100">
                  <span>
                    <span>
                      <strong className="text-gray-dark d-block">@{this.props.user.displayName}</strong>
                      {this.props.user.email}
                    </span>
                  </span>
                  <span>
                    <strong>
                      <span className="d-none d-md-inline-block mr-1">Commits done:</span>
                      <span className="float-right">{this.state.dbUser.commits}</span>
                      <span className="d-block d-sm-block d-md-none">commits</span>
                    </strong>
                  </span>
                </p>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
                <span><i className="fas fa-cubes mr-1"></i> Auto commit status</span>
                <span className={`badge badge-${this.state.dbUser.autocommits ? 'success' : 'danger'}`}>{this.state.dbUser.autocommits ? 'Enabled' : 'Disabled'}</span>
              </h6>
              <div className="media text-muted pt-3">
                {this.renderStatusBlock()}
              </div>
            </div>

            <HowItWorks  />
          </main>

          <Footer dark />
        </div>
      </div>
    );
  }
}