import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import FriendCard from '../FriendCard/FriendCard';

import Axios from 'axios';

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
      return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
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
          <div>
            <Nav />
            <label>Email Address</label>
            <input type="text" name="userToSend" placeholder="username@address.com" onChange={this.handleemailToTryState} value={this.state.emailToTry}></input>
            <button onClick={this.displayViewChange}>Next</button>

            {/* Render a card for every friend */}
            {this.state.myFriends.map((item, i) => {
              this.setMe = () => {
                this.setState({
                  emailToTry: item.email
                })
              }
              return (<div key={i} onClick={this.setMe}><FriendCard key={i} data={item} /></div>)
            })}
            <Footer />
          </div>
        )
      case 'compose':
        return (
          <div>
            <Nav />
            {this.state.emailToTry}
            <input type="text" name="request_body" placeholder="Referral Body" onChange={this.handleReferralBodyState} value={this.state.request_body}></input>
            <input type="text" name="suggested_words" placeholder="Suggested Words" onChange={this.handleSuggestedWordsState} value={this.state.suggested_words}></input>
            {this.state.currentDate}
            {this.state.suggested_words}
            {this.state.request_body}
            <button onClick={this.displayViewChange}>Back</button>
            <button onClick={this.attemptRequest}>Send</button>
            <Footer />
          </div>
        )
      default:
        return;
    }
  }

  render() {
    return (
      <div>
        {this.whichToDisplay()}
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(CreatePage);

