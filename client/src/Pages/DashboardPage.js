import React, { Component } from 'react';

import logo from '../img/logo-trans.png';

export default class DashboardPage extends Component {
  render() {
    return (
      <header>
      <nav className="navbar navbar-dark bg-dark">
        <div class="container d-flex justify-content-between">
          <a className="navbar-brand text-white">
            <img src={logo} width="30" height="30" class="d-inline-block align-top mr-2" alt="" />
            Auto Commit
          </a>
          <button 
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={() => this.props.logout()}
          >
            Logout
          </button>
        </div>
      </nav>
        <div>
          <h1>Dashboard</h1>
        </div>
      </header>
    );
  }
}