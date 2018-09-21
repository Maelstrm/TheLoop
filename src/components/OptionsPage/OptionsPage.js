import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class OptionsPage extends Component {
  componentDidMount() {
    this.props.dispatch({type: USER_ACTIONS.FETCH_USER});
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div>
          <p>
            Options Page
          </p>
        </div>
      );
    }

    return (
      <div>
        <Nav />
        { content }
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(OptionsPage);
