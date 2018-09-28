import React, { Component } from 'react';





class RequestCardExp extends Component {

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
        {this.props.data.date_sent}
        <br />
        {this.props.data.request_body}
        <br />
        <button onClick={this.deleteMe}>Delete</button>
        <button onClick={this.fillMe}>Fill Request</button>
        <button onClick={this.normalMode}>Normal Mode</button>
      </div>
    )

  }
}

export default RequestCardExp;
