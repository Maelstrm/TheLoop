import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

class FillRequestsPage extends Component {


  render() {

    return (
      <div>
        <Nav />
        Fill Requests Page
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect()(FillRequestsPage);

