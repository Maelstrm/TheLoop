import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './Nav.css'


import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});



class Nav extends Component {
  logout = () => {
    this.props.dispatch(triggerLogout());
    console.log('logging out');
    
  }

  componentDidMount = () => {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  render() {

    return (
      <div className="navbar navBar">
        <div className="mx-auto row">
          <ul className="nav text-light">
            <li className="nav-item">
              <Link to="/index">
                  <i className="fas fa-home navButton" alt="Home"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/user">
                  <i className="far fa-address-card navButton" alt="Profile"></i>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/options">
                  <i className="fas fa-bars navButton" alt="Options"></i>
              </Link>
            </li>
            <li className="nav-item">
              <a>
                <div onClick={this.logout}>
                <i className="fas fa-bars fa-sign-out-alt navButton" alt="Logout"></i>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    )

  }
}

export default connect(mapStateToProps)(Nav);
