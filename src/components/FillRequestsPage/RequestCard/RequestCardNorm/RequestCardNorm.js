import React, { Component } from 'react';
import moment from 'moment';



class RequestCardNorm extends Component {
  componentDidMount() {
    console.log(this.props.data);

  }

  render() {
    let dateToDisplay = moment(this.props.data.date_sent).format('MMMM Do YYYY')

    return (

      <div className="friend-fill shadow p-1">
        <div className="title">
          {this.props.data.first_name} {this.props.data.last_name}
        </div>
        <div className="displayDate">{dateToDisplay}</div>
      </div>
    )

  }
}

export default RequestCardNorm;
