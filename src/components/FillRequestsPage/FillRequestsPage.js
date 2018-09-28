import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import RequestCard from './RequestCard/RequestCard';

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
        <Nav />
        {this.state.requestsToFill.map((item, i) => {
          return <RequestCard key={i} data={item} funct={this.refresh} refresh={this.getToFill}/>
        })}
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FillRequestsPage);

