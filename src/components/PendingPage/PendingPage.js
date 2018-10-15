import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { USER_ACTIONS } from '../../redux/actions/userActions';
import moment from 'moment';

import './PendingPage.css'

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
        <div className="sticky-top">
          <Nav />
        </div>
        {this.state.allPending.map((item, i) => {
          return (<div key={i}>

            <div className="card m-2 shadow pendingCard">
              <div className="card-header p-1 pl-2 pr-2">
              <p className="m-0"><b>Sent to:</b> {item.first_name + " " + item.last_name}</p>
              <p className="m-0"><b>Date Sent:</b> {moment(item.date_sent).format('MMMM Do YYYY')}</p>
              </div>
              <div className="card-body p-1 pl-2 pr-2">
                <blockquote className="blockquote mb-0">
                  <p><i>"{item.request_body}"</i></p>
                </blockquote>
              </div>
            </div>
          </div>)
        })}
        <div className="fixed-bottom">
          <Footer />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(PendingPage);

