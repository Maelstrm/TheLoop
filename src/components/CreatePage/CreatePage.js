import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import FriendCard from '../FriendCard/FriendCard';

import Axios from 'axios';
import './CreatePage.css'

const mapStateToProps = state => ({
  user: state.user,
});

class CreatePage extends Component {

  constructor() {
    super();

    this.state = {
      emailToTry: '',
      myFriends: [],

      //Controlls which view is being rendered
      // i.e. select, compose
      currentView: 'select',
      request_body: '',
      suggested_words: '',
      currentDate: '',
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.replace('home');
    }
  }

  // Initial axios request for generating list of current friends
  // Sets to local state
  getMyFriends = () => {
    Axios({
      method: 'get',
      url: '/api/user/getMyFriends'
    }).then((response) => {
      this.setState({
        myFriends: response.data,
      });
    }).catch((error) => {
      console.log('error in getMyFriends', error);
    })
  }

  // Sends axios to verify email address
  attemptRequest = () => {
    Axios({
      method: 'post',
      url: '/api/create/checkEmail/' + this.state.emailToTry
    }).then((response) => {
      // If not, then alert will appear
      // If the email is found ,then the next function to send to DB will be sent.
      // In the future, another function will run instead, for unregistered reciever
      switch (response.data) {
        case 'dataNotFound':
          alert('User Not Found')
          break;
        default:
          this.addRequest(response.data.id);
          break;
      }
    }).catch((error) => {
      console.log('error in attemptRequest');
    })
  }

  // Sends axios to verify email address
  addRequest = (userId) => {
    let requestToAttempt = {
      date_sent: this.state.currentDate,
      owned_by: this.props.user.id,
      written_from: userId,
      request_body: this.state.request_body,
      suggested_words: this.state.suggested_words
    }

    console.log('data to send', requestToAttempt);

    Axios({
      method: 'post',
      url: '/api/create/addRequest/',
      data: requestToAttempt,
    }).then((response) => {
      this.props.history.replace('index');
    }).catch((error) => {
      console.log('error in attemptRequest');
    })
  }

  // Sets the date of the request, based on the user's client
  getDate = () => {
    let todayDate = this.dateToYMD(new Date());

    this.setState({
      currentDate: todayDate
    })
  }

  // Either use this or moment.js to fomat the date
  dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '-' + (m <= 9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
  }

  // Stuff to run when page is initially rendered
  componentDidMount() {
    this.getMyFriends();
    this.getDate();
  }

  // Handles the state for the 'emailToTry' state
  handleemailToTryState = (event) => {
    this.setState({
      emailToTry: event.target.value,
    })
  }
  // Handles the state for the 'request_body' state
  handleReferralBodyState = (event) => {
    this.setState({
      request_body: event.target.value,
    })
  }

  // Handles the state for the 'suggested_words' state
  handleSuggestedWordsState = (event) => {
    this.setState({
      suggested_words: event.target.value,
    })
  }

  // handles the display view for the create request form
  displayViewChange = () => {
    if (this.state.emailToTry === '') {
      return alert('must input email')
    }
    else {
      if (this.state.currentView === 'select') {
        this.setState({
          currentView: 'compose'
        })
        console.log('in select displayView');
        return;
      } else if (this.state.currentView === 'compose') {
        this.setState({
          currentView: 'select'
        });
        console.log('in compose displayView');
        return;
      }
    }
  }

  whichToDisplay = () => {
    switch (this.state.currentView) {
      case 'select':
        return (
          <div className="container mt-3 column">
            <div className="col">
              <h5 className="card-title title">Create New Request</h5>
              <p>
                Enter an email or select a friend.
              </p>
              <hr />
            </div>
            <div className="form-row mb-3">

              <div className="form-group col- my-1">
                <input className="form-control" type="email" name="userToSend" placeholder="username@address.com" onChange={this.handleemailToTryState} value={this.state.emailToTry}></input>
              </div>
              <div className="form-group col-auto my-1">
                <button className="btn nextbtn" onClick={this.displayViewChange}>Next</button>
              </div>
            </div>


            <div className=" shadow">
              {/* Render a card for every friend */}
              {this.state.myFriends.map((item, i) => {
                this.setMe = () => {
                  this.setState({
                    emailToTry: item.email
                  })
                }
                return (<div className="friend-fill shadow" key={i} onClick={this.setMe}><FriendCard key={i} data={item} /></div>)
              })}
            </div>


          </div>
        )
      case 'compose':
        return (
          <div className="container mb-5 mt-3 column">
            <div className="col">
              <h5 className="card-title title">Compose your request</h5>
              <hr />
              <p>
                Write a short letter explaining why you would like a letter of recommendation.
              </p>
              <div>
                <textarea className="referralBody border border-success" type="text" name="request_body" placeholder="I would love to have your support during my job hunting process." onChange={this.handleReferralBodyState} value={this.state.request_body} rows="4"></textarea>
              </div>
              <br />
              <p>Suggest suggest some key words.</p>
              <input className="referralBody border border-success" type="text" name="suggested_words" placeholder="focused, smart, relaxed" onChange={this.handleSuggestedWordsState} value={this.state.suggested_words} ></input>
              <hr />
            </div>
            <div className="col text-center">
              <button className="btn btn-danger mr-5" onClick={this.displayViewChange}>Cancel</button>
              <button className="btn btn-primary ml-5" onClick={this.attemptRequest}>Send</button>
            </div>
          </div>
        )
      default:
        return;
    }
  }

  render() {
    return (
      <div>
        <div className="sticky-top">
          <Nav />
        </div>
        <div className="centerContent mb-3 mt-3">

          {this.whichToDisplay()}
        </div>
        <div className="fixed-bottom">
          <Footer />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreatePage);

