import React from 'react';
import uuidv1 from 'uuid/v1';

const steps = [
  { img: require('../img/orderedlistocat.png'),
    title: "Sign In with GitHub",
    desc: "Firstly, we will ask you to Sign In with your GitHub account. Then we will carry out about all the stuff." },
  { img: require('../img/secure.png'),
    title: "Authorization of Oauth app",
    desc: "After Sign In, GitHub provides us with all public information including access token for your account. " },
  { img: require('../img/logo-trans.png'),
    title: "Activate Autocommit",
    desc: "After Sign In you will be redirected to Autocommit Dashboard page. Press button 'Enable' and we will know that you want to make autocommits." },
  { img: require('../img/clock.png'),
    title: "Scheduled server task",
    desc: "Once a day, Autocommit server woke up and commits into '_autocommit', authorizing itself with access token mentioned before." },
];

function renderSteps() {
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

export default function HowItWorks(props) {
  return (
    <div className={`my-3 p-3 ${props.dark ? 'bg-dark text-light' : 'bg-white'} rounded shadow`}>
      <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
        <span>
          <span role="img" aria-label="emoji">🤔</span> How this magic works?
        </span>
        <i className="fas fa-magic"></i>
      </h6>
      <span className="mt-2 ml-3 d-block text-muted">
        To enable Autocommits for your account, we dont need much from you. Just press a button <span role="img" aria-label="emoji">😊</span>
      </span>
      {renderSteps()}
    </div>
  );
}