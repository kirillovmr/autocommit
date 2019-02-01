import React, { Component } from 'react';

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <h1>Landing page</h1>
        <button onClick={() => this.props.login()}>Login</button>
      </div>
    )
  }
}