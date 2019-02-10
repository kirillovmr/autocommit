import React from 'react';
import uuidv1 from 'uuid/v1';

const faq = [
  { q: "How do Autocommit work?",
    a: <span>Our server is scheduled to run once/day and get from database info about which account has enabled autocommits, then it performs couple of commits directly to '_autocommit' repo.</span> },
  { q: "What if I want to disable autocommits?",
    a: <span>You can switch off automatic contributions for your account anytime by disabling it in Autocommit Dashboard. Vice versa, you can enable it back anytime.</span> },
  { q: "How can I know which actions will you perform with my authorized token?",
    a: <span>We are an <a href="https://github.com/kirillovmr/autocommit" target="blank">open-source project</a>, all the code can be found in our repo. Regarding to your sensetive data, it is securely stored in one of the best Google Cloud Databases. We are ensure safety of your data!</span> },
];

function renderFaq() {
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

export default function FAQ() {
  return (
    <div className="my-3 p-3 bg-dark text-light rounded shadow">
      <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
        <span>
          <span role="img" aria-label="emoji">🙋‍</span> FAQ
        </span>
        <i className="fas fa-question"></i>
      </h6>
      {renderFaq()}
    </div>
  );
}