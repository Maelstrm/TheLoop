import React, { Component } from 'react';
import Axios from 'axios';
import {globals} from '../../../../globals';

class RequestCardFill extends Component {

  constructor() {
    super();
    this.state = {
      referral_body: '',
      aws_links: '',
      can_contact: true,
      video: '',
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

  componentDidMount() {
    this.config = {
      cloud_name: globals.CLOUDINARY_NAME,
      api_key: globals.CLOUDINARY_KEY,
      api_secret: globals.CLOUDINARY_SECRET,
      upload_preset: globals.CLOUDINARY_PRESET
   }
  }

  openCloudinary = (event) => {
    event.preventDefault();
    window.cloudinary.openUploadWidget(this.config, (error, result) => {
      if (result) {
        let cloudinaryUrl = result[0].url
        this.setState({
          // store url to local state BEFORE dispatching an action
          ...this.state,
          aws_links: cloudinaryUrl
        })
        console.log(this.state.video);
      }
    })
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
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  sendRef = (toSend) => {
    console.log(toSend, 'from sendRef');

    Axios({
      method: 'post',
      url: '/api/recom/addNew/',
      data: toSend,
    }).then((response) => {
      console.log('sendRef worked!');
      this.completeRequest();
    }).catch((error) => {
      console.log('error in sendRef');
    })
  }

  completeRequest = () => {
    console.log(this.props.data.request_id, 'from completeRequest');

    Axios({
      method: 'put',
      url: '/api/recom/completeRequest/' + this.props.data.request_id,
    }).then((response) => {
      this.props.dest();
    }).catch((error) => {
      console.log('error in completeRequest');
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
        return (<div><button className="bg-primary text-light" onClick={this.changeContact}>Yes</button></div>)
      case false:
        return (<div><button className="bg-secondary text-light" onClick={this.changeContact}>No</button></div>)
      default:
        break;
    }
  }

  render() {

    return (
      <div className="container mb-5 mt-3 column friend-fill">
        <div className="title">
                    {this.props.data.first_name} {this.props.data.last_name}
                </div><br />
        {this.props.data.email}
        <br />
        {this.props.data.suggested_words}
        <br />
        <textarea className="referralBody border border-success" placeholder="referral_body will go in here" rows="3"></textarea>
        <div>
        <span className="contactText">Would you like to be contacted:</span> {this.contactButtonDisplay()}

        </div>
        <button onClick={this.openCloudinary}>Upload Video</button>

        <div className="row ml-1 mr-1">
                        <div onClick={this.props.exp} className="modeLink text-center col-6 m-0 bg-warning">
                            Cancel
                    </div>
                        <div onClick={this.addNew} className="modeLink text-center col-6 bg-success">
                            Send
                    </div>
                    </div>
      </div>
    )

  }
}

export default RequestCardFill;
