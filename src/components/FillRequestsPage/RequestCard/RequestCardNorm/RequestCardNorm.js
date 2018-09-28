import React, { Component } from 'react';


class RequestCardNorm extends Component {
componentDidMount() {
  console.log(this.props.data);
  
}

  render() {

    return (
      <div>
        {this.props.data.first_name} {this.props.data.last_name}
        <br/>
        {this.props.data.date_sent}
      </div>
    )

  }
}

export default RequestCardNorm;
