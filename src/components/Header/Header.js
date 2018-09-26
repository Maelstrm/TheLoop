import React, { Component } from 'react';
import { connect } from 'react-redux';

import { USER_ACTIONS } from '../../redux/actions/userActions';
import { triggerLogout } from '../../redux/actions/loginActions';


const mapStateToProps = state => ({
  user: state.user,
});

class Header extends Component {
  logout = () => {
    this.props.dispatch(triggerLogout());
  }

  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }
  render() {
    let logoutButton = null;
    if (this.props.user.userName) {
      logoutButton = (
        <button onClick={this.logout}>
          Log Out
          </button>
      )
    }

    return (
      <div className="instructions">
        <div>
          <h1 className="lead">ADSFDS</h1>
        </div>
        {logoutButton}
      </div>
    )

  }
}





export default connect(mapStateToProps)(Header);
