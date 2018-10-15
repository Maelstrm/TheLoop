import React, { Component } from 'react';
import moment from 'moment';




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

    let dateToDisplay = moment(this.props.data.date_sent).format('MMMM Do YYYY')

    return (<div className="friend-fill shadow p-1">
      <div className="title">
        {this.props.data.first_name} {this.props.data.last_name}
      </div>
      <div className="displayDate">{dateToDisplay}</div>
      <div>
        <p>
          "{this.props.data.request_body}"
          </p>
      </div>
    </div>
    )

  }
}

export default RequestCardExp;
