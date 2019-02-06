import React from 'react';

export default function Footer(props) {
  return (
    <footer className={`footer ${props.dark ? 'bg-dark' : ''} mt-auto py-3 shadow-lg`}>
      <div className="container text-center">
        <span className={`${props.dark ? 'text-light' : ''}`}><a href="https://github.com/kirillovmr/autocommit" target="blank"><i className="fab fa-github mr-1"></i>autocommit</a></span>
      </div>
    </footer>
  );
}