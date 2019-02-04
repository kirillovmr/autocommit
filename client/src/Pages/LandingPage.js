import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

import logo from '../img/logo-trans.png';

const steps = [
  { img: logo,
    title: "Create 'autocommit' repo",
    desc: "That repo will be used to make auto commits." },
  { img: require('../img/logo-trans.png'),
    title: "Generate your SSH key",
    desc: "After Sign Up in Autocommits, our server will generate you a unique SSH key which is needed to identify our server when it will makes commit for you." },
  { img: require('../img/logo-trans.png'),
    title: "Connect key to GitHub",
    desc: "Then you will need to connect this key to your GitHub account in order to make GitHub aware that server represents you." },
  { img: require('../img/logo-trans.png'),
    title: "Enable Autocommits",
    desc: "And the last stap will be simple. Just press a button 'Enable' in our Dashboard to enable automatic daily contributions." },
];

export default class LandingPage extends Component {

  renderSteps() {
    return steps.map(step => {
      return (
        <div className="media text-muted pt-3" key={uuidv1()}>
          <img src={step.img} width="32" height="32" className="bd-placeholder-img mr-2 rounded" alt="" />
          <p className="media-body pb-0 mb-0 small lh-125 border-bottom border-gray">
            <strong className="text-gray-dark">{step.title}</strong>
            <span className="d-block">{step.desc}</span>
          </p>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
              <span className="navbar-brand text-white">
                <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                Auto Commit
              </span>
              <button type="button" onClick={this.props.login} className="btn btn-outline-light"><i className="fab fa-github mr-1"></i> Login</button>
            </div>
          </nav>
        </header>
        
        <div className="d-flex flex-column justify-content-between" style={{height: 'calc(100vh - 56px)'}}>
          <main role="main" className="container">
            <div className="card my-3 rounded shadow">
              <img src="http://lorempixel.com/600/150/" className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title"><span role="img" aria-label="emoji">👋</span> Welcome to the automation</h5>
                <p className="card-text">This service is used to make automatic contributions on GitHub once a day to keep up your activity!</p>
                <p className="card-text">u2</p>
                <p className="card-text"><small className="text-muted">Best, Autocommit Team &copy; 2019</small></p>
              </div>
            </div>

            <div className="d-flex align-items-center p-3 my-3 text-white bg-grey rounded shadow">
              <div className="lh-100 w100">
                <button type="button" onClick={this.props.login} className="btn btn-block btn-outline-light"><i className="fab fa-github mr-1"></i> Try In Now</button>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100"><span><span role="img" aria-label="emoji">🤔</span> How this magic works?</span><i className="fas fa-magic"></i></h6>
              <span className="mt-2 ml-3 d-block">
                Now you will see how it works. To enable Autocommits for your account, we will need some setup steps from you.
              </span>

              {this.renderSteps()}

            </div>

            FAQ

          </main>

          <footer className="footer mt-auto py-3 shadow-lg">
            <div className="container text-center">
              <span className="text-muted"><a href="https://github.com/kirillovmr" target="blank">@kirillovmr</a> | <span className="text-link" onClick={() => this.props.changePage('docs')}>Docs</span></span>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}