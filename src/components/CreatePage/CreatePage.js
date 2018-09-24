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
    }
  }

  componentDidMount() {
    this.getMyFriends();
  }

  handleSendToState = (event) => {
    this.setState({
      sendTo: event.target.value,
    })
  }

  getMyFriends = () => {
    Axios({
      method: 'get',
      url: '/api/user/getMyFriends'
    }).then((response) => {
      this.setState({
        myFriends: response.data,
      });
      console.log('in getMyFriends Working', this.state.myFriends);

    }).catch((error) => {
      console.log('error in getMyFriends', error);
    })
  }

  render() {

    return (
      <div>
        <Nav />
        <label>Email Address</label>
        <input type="text" name="userToSend" placeholder="username@address.com" onChange={this.handleSendToState} value={this.state.sendTo}></input>
        <button>Send</button>

        {/* Render a card for every friend */}
        {this.state.myFriends.map((item, i) => {
            this.setMe = () => {
            this.setState({
              sendTo: item.email
            })
          }
          return(  <div key={i} onClick={this.setMe}><FriendCard key={i} data={item}/></div>)
        })}

        {this.state.sendTo}

        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect()(CreatePage);

