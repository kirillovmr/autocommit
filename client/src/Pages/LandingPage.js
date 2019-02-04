import React, { Component } from 'react';
import uuidv1 from 'uuid/v1';

import logo from '../img/logo-trans.png';

const steps = [
  { img: logo,
    title: "Create 'autocommit' repo",
    desc: <span><a href="https://github.com/new" target="blank">Create a new GitHub repo</a> named 'autocommit', that will be used to make auto commits.</span> },
  { img: require('../img/logo-trans.png'),
    title: "Generate your SSH key",
    desc: "After Sign Up in Autocommits, our server will generate you a unique SSH key which is needed to identify our server when it will makes commits for you." },
  { img: require('../img/logo-trans.png'),
    title: "Connect key to GitHub",
    desc: "Then you will need to connect this key to your GitHub account in order to make GitHub aware that server represents you." },
  { img: require('../img/logo-trans.png'),
    title: "Enable Autocommits",
    desc: "And the last stap will be simple. Just press a button 'Enable' in our Dashboard to enable automatic daily contributions." },
];

const faq = [
  { q: "How do Autocommits works?",
    a: <span>Our server is scheduled to run once/day and get from database info about which account has enabled autocommits, then it performs couple of commits directly to 'autocommit' repo.</span> },
  { q: "I'm connecting generated key to my GitHub account, how can I know that it will be used only for autocommits?",
    a: <span>Connecting SSH key to your account means that owner of the key (server) can perform any actions from your name in GitHub, it's true. But, we are an open-source project, <a href="https://github.com/kirillovmr/autocommit" target="blank">here is our GitHub page</a>, only our server and you knows your unique key. </span> },
  { q: "What if I want to stop using Autocommits?",
    a: <span>You can stop using Autocommits anytime by deactivating your account in Autocommits Dashboard. Also, you can <a href="https://github.com/settings/keys" target="blank">delete given SSH key from your account</a> anytime you want.</span> }
];

export default class LandingPage extends Component {

  componentDidMount() {
    const phPage = "http://kirillovmr.com";
    const s = document.createElement('script');
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = `!function(t){var e,o=t.url,n=document.getElementsByTagName("body")[0],a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=o,e=function(){ONPHstart(t)},a.readyState?a.onreadystatechange=function(){"loaded"!=a.readyState&&"complete"!=a.readyState||(a.onreadystatechange=null,e())}:a.onload=function(){e()},n.appendChild(a)}({on_title:"Support us on ProductHunt!",on_description:"Hey! We're just released on PH, so join the discussion on our page.",link:"${phPage}",button_text:"Visit Page",position:"bottom-left",design:"kitty",display_from: false,from_title:"Hello Hunter!",from_description:"You have a special discount: 20% off. Just use the code below at checkout.",from_discount:"HUNTER20",url:"https://hypeok.com/onph/onph.js"});`
    this.refs.main.appendChild(s);
  }

  renderSteps() {
    return steps.map(step => {
      return (
        <div className="media pt-3" key={uuidv1()}>
          <img src={step.img} width="32" height="32" className="bd-placeholder-img mr-2 rounded" alt="" />
          <p className="media-body pb-0 mb-0 small lh-125 border-bottom border-gray pb-2">
            <strong className="text-gray-dark">{step.title}</strong>
            <span className="d-block">{step.desc}</span>
          </p>
        </div>
      );
    })
  }

  renderFaq() {
    return faq.map(obj => {
      return (
        <div className="media text-light" key={uuidv1()}>
          <p className="media-body pb-0 mb-0 small lh-125 border-bottom border-gray py-3">
            <strong className="text-gray-dark">{obj.q}</strong>
            <span className="d-block ml-3 mt-1">{obj.a}</span>
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
              <span className="navbar-brand text-light">
                <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                Auto Commit
              </span>
              <button type="button" onClick={this.props.login} className="btn btn-outline-light"><i className="fab fa-github mr-1"></i> Login</button>
            </div>
          </nav>
        </header>
        
        <div className="d-flex flex-column justify-content-between" style={{height: 'calc(100vh - 56px)'}}>
          <main role="main" ref="main" className="container mb-5">
            <div className="card my-3 rounded shadow">
              <img src="https://picsum.photos/600/150/?blur" className="card-img-top" alt="..." />
              <div className="card-body text-center">
                <h5 className="card-title"><span role="img" aria-label="emoji">👋</span> Welcome to the automation</h5>
                <p className="card-text">This service is used to make automatic contributions on GitHub once a day to keep up your activity!</p>
                <p className="card-text text-muted"><em>"Simple to enable, free to use, happy to see. Your everyday activity."</em></p>
                <p className="card-text">
                  <small className="text-muted"><em>Best, Autocommit Team &copy; 2019</em></small>
                </p>
              </div>
            </div>

            <div className="d-flex align-items-center p-3 my-3 text-light bg-grey rounded shadow">
              <div className="lh-100 w100">
                <button type="button" onClick={this.props.login} className="btn btn-block btn-outline-light">
                  <i className="fab fa-github mr-1"></i> Login and Try In Now
                </button>
              </div>
            </div>

            <div className="my-3 p-3 bg-white rounded shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
                <span>
                  <span role="img" aria-label="emoji">🤔</span> How this magic works?
                </span>
                <i className="fas fa-magic"></i>
              </h6>
              <span className="mt-2 ml-3 d-block text-muted">
                Now you will see how it works. To enable Autocommits for your account, we will need some setup steps from you.
              </span>
              {this.renderSteps()}
            </div>

            <div className="my-3 p-3 bg-dark text-light rounded shadow">
              <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
                <span>
                  <span role="img" aria-label="emoji">🙋‍♂️</span> FAQ
                </span>
                <i className="fas fa-question"></i>
              </h6>
              {this.renderFaq()}
            </div>
          </main>

          <footer className="footer bg-dark mt-auto py-3 shadow-lg">
            <div className="container text-center">
              <span className="text-light"><a href="https://github.com/kirillovmr/autocommit" target="blank"><i className="fab fa-github mr-1"></i>autocommit</a></span>
            </div>
          </footer>
        </div>
      </div>
    )
  }
}