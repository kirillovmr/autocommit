import React, { Component } from 'react';

import HowItWorks from '../Components/HowItWorks';
import OurUsers from '../Components/OurUsers';
import FAQ from '../Components/FAQ';
import Footer from '../Components/Footer';

import logo from '../img/logo-trans.png';
import banner from '../img/banner.png';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userImages: []
    }
  }

  componentDidMount() {
    // Users who trust us
    this.props.db.getUsersImage()
    .then(images => {
      const shuffled = images.map((a) => [Math.random(),a]).sort((a,b) => a[0]-b[0]).map((a) => a[1]);
      this.setState({
        userImages: [...shuffled, ...shuffled, ...shuffled] // Making it triple for infinite loop
        // userImages: [...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled,...shuffled, ...shuffled, ...shuffled, ...shuffled, ...shuffled, ]
      });
    });

    // Product Hunt Widget  
    const phPage = "https://www.producthunt.com/posts/autocommit-2";
    const s = document.createElement('script');
    s.type = "text/javascript";
    s.async = true;
    s.innerHTML = `!function(t){var e,o=t.url,n=document.getElementsByTagName("body")[0],a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=o,e=function(){ONPHstart(t)},a.readyState?a.onreadystatechange=function(){"loaded"!=a.readyState&&"complete"!=a.readyState||(a.onreadystatechange=null,e())}:a.onload=function(){e()},n.appendChild(a)}({on_title:"Support us on ProductHunt!",on_description:"Hey! We're just released on PH, so join the discussion on our page.",link:"${phPage}",button_text:"Visit Page",position:"bottom-left",design:"kitty",display_from: false,from_title:"Hello Hunter!",from_description:"You have a special discount: 20% off. Just use the code below at checkout.",from_discount:"HUNTER20",url:"https://hypeok.com/onph/onph.js"});`
    this.refs.main.appendChild(s);
  }

  render() {
    return (
      <div>
        <header>
          <nav className="navbar navbar-dark bg-dark">
            <div className="container d-flex justify-content-between">
              <span className="navbar-brand text-light">
                <img src={logo} width="30" height="30" className="d-inline-block align-top mr-2" alt="" />
                Autocommit 2
              </span>
              <button type="button" onClick={this.props.login} className="btn btn-outline-light"><i className="fab fa-github mr-1"></i> Login</button>
            </div>
          </nav>
        </header>
        
        <div className="d-flex flex-column justify-content-between" style={{height: 'calc(100vh - 56px)'}}>
          <main role="main" ref="main" className="container mb-5">
            <div className="card my-3 rounded shadow">
              <img src={banner} className="card-img-top" alt="..." />
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

            <HowItWorks />
            <FAQ />
            {this.state.userImages.length >= 30 ? <OurUsers userImages={this.state.userImages} /> : null}
          </main>

          <Footer dark />
        </div>
      </div>
    )
  }
}