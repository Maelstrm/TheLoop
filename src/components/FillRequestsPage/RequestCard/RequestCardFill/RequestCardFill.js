import React, { Component } from 'react';





class RequestCardFill extends Component {
  constructor(props) {
      super(props);
  }

  deleteMe = () => {
    this.props.delete();
  }
  fillMe = () => {
    this.props.fill();
  }
  normalMode = () => {
    this.props.norm();
  }

  render() {

    return (
        <div>
        {this.props.data.first_name} {this.props.data.last_name}
        <br />
        {this.props.data.email}
        <br />
        {this.props.data.suggested_words}
        <br />
        <input placeholder="referral_body will go in here"></input>
        <br />
        {this.props.data.request_body}
        <br />
        <button onClick={this.deleteMe}>Delete</button>
        <button onClick={this.fillMe}>Fill Request</button>
        <button onClick={this.norm}>Normal Mode</button>
      </div>
    )

  }
}

export default RequestCardFill;
