import React, { Component } from 'react';

import logo from '../img/logo-trans.png';

export default class DashboardPage extends Component {
  render() {
    console.log(this.props.user);
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
              <span className="navbar-brand text-white">
                <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                Auto Commit
              </span>
              <img src={this.props.user.photoURL} width="30" height="30" className="d-inline-block ml-2 user-avatar-sm" alt="" />
            </div>
          </nav>
        </header>

        <div className="d-flex flex-column justify-content-between" style={{height: 'calc(100vh - 56px)'}}>
          <main role="main" className="container">
            <div className="d-flex align-items-center p-3 my-3 text-white bg-grey rounded shadow">
              <img className="mr-3" src={logo} alt="" width="48" height="48" />
              <div className="lh-100 w100">
                <h6 className="mb-0 lh-100 position-relative">GitHub autocommit <span className="badge badge-success right-badge">O</span> </h6> 
                <small>This service is used to automatically make contributions on GitHub and keep up your activity.</small>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0"><i className="fab fa-github mr-2"></i>Connected account</h6>
              <div className="media text-muted pt-3">
                <img src={this.props.user.photoURL} width="32" height="32" className="bd-placeholder-img mr-2 rounded" alt="" />
                <p className="media-body pb-0 mb-0 small lh-125">
                  <span className="d-flex justify-content-between align-items-center w-100">
                    <strong className="text-gray-dark">@{this.props.user.displayName}</strong>
                    <span className="text-danger text-link" onClick={() => this.props.logout()}>Logout</span>
                  </span>
                  {this.props.user.email}
                </p>
              </div>
            </div>

            <div className="row mt-2">
              <div className="col">
                <div className="card text-center shadow-sm">
                  <div className="card-header">
                    <span className="badge badge-success status-badge">Enabled</span> Auto commit status
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">Special title treatment</h5>
                    <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                    <button href="#" className="btn btn-outline-danger">Go somewhere</button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer class="footer mt-auto py-3">
            <div class="container text-center">
              <span class="text-muted">Place sticky footer content here.</span>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}