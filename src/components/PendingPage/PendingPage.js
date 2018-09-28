import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import {USER_ACTIONS} from '../../redux/actions/userActions';

// get all pending recommendations from the database
import Axios from 'axios';

const mapStateToProps = state => ({
  // Stores the current user state
  user: state.user,
});

class PendingPage extends Component {

  constructor() {
    super();
    this.state = {
      // Stores pending requests
      allPending: [],
    }
  }

   // On Page Load, will run this code
   componentDidMount() {
    // Check to see if user is logged in
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });

    this.getPending();
    console.log(this.state.allPending);

  }

  componentDidUpdate() {
    // If the user is logged out, then send the user home
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  getPending = () => {
    Axios({
      method: 'get',
      url: '/api/recom/getPending'
    }).then((response) => {
      this.setState({
        allPending: response.data,
      });
      console.log('in getPending', this.state.allPending);

    }).catch((error) => {
      console.log('error in getPending', error);
    })
  }

  render() {

    return (
      <div>
        <Nav />
        {this.state.allPending.map((item, i) => {
          return (<div key={i}>'Item Number' {i} <br /></div>)
        })}
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PendingPage);

