import React, { Component } from 'react';
import Axios from 'axios';





class RequestCardFill extends Component {

constructor() {
  super();
  this.state = {
        referral_body: '',
        aws_links: '',
        can_contact: true,
  }
}

//   Shuffles the mode of the request card.
  deleteMe = () => {
    this.props.delete();
  }
  fillMe = () => {
    this.props.fill();
  }
  normalMode = () => {
    this.props.norm();
  }

  addNew = () => {
      console.log('in addNew', this.props.data);
      const newRef = {
        new_request_id: this.props.data.request_id,
        referral_body: '',
        date_created: this.dateToYMD(new Date()),
        aws_links: this.state.aws_links,
        can_contact: this.state.can_contact,
      }
      this.sendRef(newRef)
  }

//   Formats date so that it is compatible with postgreSQL
  dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

  sendRef = (toSend) => {
    console.log(toSend, 'from sendRef');
    
    Axios({
        method: 'post',
        url: '/api/recom/addNew/',
        data: toSend,
    }).then((response) => {
        console.log('sendRef worked!');
    }).catch((error) => {
        console.log('error in sendRef');
    })
  }

changeContact = () => {
      this.setState({
        can_contact: !this.state.can_contact,
      })
  }

  contactButtonDisplay = () => {
    switch (this.state.can_contact) {
      case true:
        return (<div><button onClick={this.changeContact}>Yes</button></div>)
      case false:
        return (<div><button onClick={this.changeContact}>No</button></div>)
      default:
        break;
    }
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
        {JSON.stringify(this.state.can_contact)}
        {this.contactButtonDisplay()}
        <br />
        <button onClick={this.addNew}>Send</button>
        <br />
        <button onClick={this.deleteMe}>Decline</button>
        <button onClick={this.normalMode}>Normal Mode</button>
      </div>
    )

  }
}

export default RequestCardFill;
