import React, {Component} from 'react';
import uuidv1 from 'uuid/v1';

export default class OurUsers extends Component {

  renderUsers() {
    if (!this.props.userImages)
      return `Provide 'userImages' prop`;

    return this.props.userImages.map(img => {
      return (
        <img key={uuidv1()} src={img} width="32" height="32" className="bd-placeholder-img mr-2 mb-2 rounded" alt="" />
      );
    })
  }

  render() {
    return (
      <div className={`my-3 p-3 ${this.props.dark ? 'bg-dark text-light' : 'bg-white'} rounded shadow`}>
        <h6 className="border-bottom border-gray pb-2 mb-0 d-flex justify-content-between w-100">
          <span>
            <span role="img" aria-label="emoji">❤️</span> Some of our users
          </span>
          <i className="fas fa-user-astronaut"></i>
        </h6>
        <div className="pt-3" style={{overflow: 'hidden'}}>
          <div className="slider-outer d-flex">
            {this.renderUsers()}
          </div>
        </div>
      </div>
    );
  };
}