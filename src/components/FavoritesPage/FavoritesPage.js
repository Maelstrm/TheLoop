import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import RecomItem from '../RecomItem/RecomItem'
import {USER_ACTIONS} from '../../redux/actions/userActions';

// get all recommendations from the database
import Axios from 'axios';

const mapStateToProps = state => ({
  // Stores the current user state
  user: state.user,
});

class FavoritesPage extends Component {
  constructor() {
    super();
    this.state = {
      // Stores fav recommendations
      favRecom: [],
    }
  }

  // On Page Load, will run this code
  componentDidMount() {
    // Check to see if user is logged in
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });

    this.getFavRecom();
    console.log(this.state.favRecom);

  }

  getFavRecom = () => {
    Axios({
      method: 'get',
      url: '/api/recom/getFav'
    }).then((response) => {
      this.setState({
        favRecom: response.data,
      });
      console.log('in getAllREcom', this.state.favRecom);

    }).catch((error) => {
      console.log('error in getFavRecom', error);
    })
  }

  componentDidUpdate() {
    // If the user is logged out, then send the user home
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {

    return (
      <div>
        <Nav />
        {this.state.favRecom.map((item, i) => {
          return (<RecomItem key={i} data={item} />)
        })}
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(FavoritesPage);

