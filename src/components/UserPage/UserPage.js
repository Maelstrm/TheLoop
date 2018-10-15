import React, { Component } from 'react';
import { connect } from 'react-redux';

import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';


import { USER_ACTIONS } from '../../redux/actions/userActions';

const mapStateToProps = state => ({
  user: state.user,
});

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: USER_ACTIONS.FETCH_USER });
  }

  componentDidUpdate() {
    if (!this.props.user.isLoading && this.props.user.userName === null) {
      this.props.history.push('home');
    }
  }

  formatPhoneNumber = (phoneNumberString) => {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
  }

  render() {
    let content = null;

    if (this.props.user.userName) {
      content = (
        <div className="card">
        {/* Avatar */}
          <img className="card-img-top" src="https://via.placeholder.com/350x150?text=User+Avatar" alt="avatar" />
          <div className="card-body">
          {/* full name */}
            <h5 className="card-title">{this.props.user.fullUser.first_name + " " + this.props.user.fullUser.last_name}</h5>

            {/* Email */}
            <p className="card-text"><b>{this.props.user.fullUser.position}</b> at {this.props.user.fullUser.employer}</p>

            {/*  */}
          </div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">{this.props.user.fullUser.email}</li>
            <li className="list-group-item">{this.formatPhoneNumber(this.props.user.fullUser.phone_number)}</li>
          </ul>
        </div>
      );
    }

    return (
      <div>
        <div className="sticky-top">
          <Nav />
        </div>
        {/* {JSON.stringify(this.props.user.fullUser)} */}
        {content}
        <div className="fixed-bottom">
          <Footer />
        </div>
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);

