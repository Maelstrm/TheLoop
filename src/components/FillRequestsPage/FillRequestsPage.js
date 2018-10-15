import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import RequestCard from './RequestCard/RequestCard';
import './FillRequestPage.css'

import Axios from 'axios';

const mapStateToProps = state => ({
  user: state.user,
});

class FillRequestsPage extends Component {

  constructor() {
    super();

    this.state = {
      requestsToFill: [],
    }
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.replace('home');
    }
  }

  componentDidMount() {

    // Get all requests that need to be filled by user
    this.getToFill();
  }

  getToFill = () => {
    Axios({
      method: 'get',
      url: '/api/recom/getToFill'
    }).then((response) => {
      console.log('data from sql', response.data);
      this.setState({
        requestsToFill: response.data,
      })

    }).catch((error) => {
      console.log('error in getMyFriends', error);
    })
  }

  refresh = () => {
    console.log('refresh working in fillrequestpage');
    this.forceUpdate();
    this.setState({ update: Math.random() });
    
  }

  render() {

    return (
      <div>
        <div className="sticky-top">
          <Nav />
        </div>
        <div className="mt-3">
        <h5 className="card-title pl-3">Requests to fill</h5><hr />
        {this.state.requestsToFill.map((item, i) => {
          return (<div className="container shadow mb-2">
            <RequestCard key={i} data={item} funct={this.refresh} refresh={this.getToFill}/>
          </div>)
        })}
        </div>
        
        <div className="fixed-bottom">
        <Footer />
      </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FillRequestsPage);

