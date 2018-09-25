import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import FriendCard from '../FriendCard/FriendCard';

import Axios from 'axios';

class CreatePage extends Component {

  constructor() {
    super();

    this.state = {
      sendTo: '',
      myFriends: [],

      //Controlls which view is being rendered
      // i.e. select, compose, 
      currentView: 'select',
      referral_body: '',
      suggested_words: '',
      currentDate: '',
    }
  }

  // Initial axios request for generating list of current friends
  getMyFriends = () => {
    Axios({
      method: 'get',
      url: '/api/user/getMyFriends'
    }).then((response) => {
      this.setState({
        myFriends: response.data,
      });
      console.log('in getMyFriends Working', this.state.myFdriends);
    }).catch((error) => {
      console.log('error in getMyFriends', error);
    })
  }

getDate = () => {
  let todayDate = String(new Date());
  this.setState({
    currentDate: todayDate
  })
}

  // Stuff to run when page is initially rendered
  componentDidMount() {
    this.getMyFriends();
    this.getDate();
  }

  // Handles the state for the 'sendTo' state
  handleSendToState = (event) => {
    this.setState({
      sendTo: event.target.value,
    })
  }
   // Handles the state for the 'referral_body' state
   handleReferralBodyState = (event) => {
    this.setState({
      referral_body: event.target.value,
    })
  }

   // Handles the state for the 'suggested_words' state
   handleSuggestedWordsState = (event) => {
    this.setState({
      suggested_words: event.target.value,
    })
  }

  // Sends axios request to put data into server
  sendRequest = () => {
    this.props.history.push('index');
  }

  // handles the display view for the create request form
  displayViewChange = () => {
    if(this.state.sendTo === '') {
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
            <input type="text" name="userToSend" placeholder="username@address.com" onChange={this.handleSendToState} value={this.state.sendTo}></input>
            <button onClick={this.displayViewChange}>Next</button>

            {/* Render a card for every friend */}
            {this.state.myFriends.map((item, i) => {
              this.setMe = () => {
                this.setState({
                  sendTo: item.email
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
            {this.state.sendTo}
            <input type="text" name="request_body" placeholder="Referral Body" onChange={this.handleReferralBodyState} value={this.state.referral_body}></input>
            <input type="text" name="suggested_words" placeholder="Suggested Words" onChange={this.handleSuggestedWordsState} value={this.state.suggested_words}></input>
            {this.state.currentDate}
            {this.state.suggested_words}
            {this.state.referral_body}
            <button onClick={this.displayViewChange}>Back</button>
            <button onClick={this.sendRequest}>Send</button>
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
export default connect()(CreatePage);

