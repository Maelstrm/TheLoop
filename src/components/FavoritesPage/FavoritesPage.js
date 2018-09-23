import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';


import { USER_ACTIONS } from '../../redux/actions/userActions';



class FavoritesPage extends Component {


  render() {

    return (
      <div>
        <Nav />
        Favorites Page
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect()(FavoritesPage);

