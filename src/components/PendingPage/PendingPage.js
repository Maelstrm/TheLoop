import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';


import { USER_ACTIONS } from '../../redux/actions/userActions';



class PendingPage extends Component {


  render() {

    return (
      <div>
        <Nav />
        Prending Page
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect()(PendingPage);

