import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class RegisterPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      message: '',
      email: '',
      first_name: '',
      last_name: '',
      employer: '',
      position: '',
      phone_number: '',

    };
  }

  registerUser = (event) => {
    event.preventDefault();

    if (this.state.username === '' ||
    this.state.password === '' ||
    this.state.email === '' ||
    this.state.first_name === '' ||
    this.state.last_name === '' ||
    this.state.employer === '' ||
    this.state.position === '' ||
    this.state.phone_number === '') {
      this.setState({
        message: 'Please answer all fields!',
      });
    } else {
      const body = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        employer: this.state.employer,
        position: this.state.position,
        phone_number: this.state.phone_number,
        joined_date: new Date()
      };

      // making the request to the server to post the new user's registration
      axios.post('/api/user/register/', body)
        .then((response) => {
          if (response.status === 201) {
            this.props.history.push('/home');
          } else {
            this.setState({
              message: 'Ooops! That didn\'t work. The username might already be taken. Try again!',
            });
          }
        })
        .catch(() => {
          this.setState({
            message: 'Ooops! Something went wrong! Is the server running?',
          });
        });
    }
  } // end registerUser

  handleInputChangeFor = propertyName => (event) => {
    this.setState({
      [propertyName]: event.target.value,
    });
  }

  renderAlert() {
    if (this.state.message !== '') {
      return (
        <h2
          className="alert"
          role="alert"
        >
          {this.state.message}
        </h2>
      );
    }
    return (<span />);
  }

  render() {
    return (
      <div>
        {this.renderAlert()}
        <form onSubmit={this.registerUser}>
          <h1>Register User</h1>


          <div>
            <label htmlFor="username">
              Username:
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleInputChangeFor('username')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="password">
              Password:
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleInputChangeFor('password')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChangeFor('email')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="first_name">
              First Name:
              <input
                type="text"
                name="first_name"
                value={this.state.first_name}
                onChange={this.handleInputChangeFor('first_name')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="last_name">
              Last Name:
              <input
                type="text"
                name="last_name"
                value={this.state.last_name}
                onChange={this.handleInputChangeFor('last_name')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="employer">
              Employer:
              <input
                type="text"
                name="employer"
                value={this.state.employer}
                onChange={this.handleInputChangeFor('employer')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="position">
              Position
              <input
                type="text"
                name="position"
                value={this.state.position}
                onChange={this.handleInputChangeFor('position')}
                required
              />
            </label>
          </div>

          <div>
            <label htmlFor="phone_number">
              Phone Number:
              <input
                type="tel"
                name="phone_number"
                value={this.state.phone_number}
                onChange={this.handleInputChangeFor('phone_number')}
                required
              />
            </label>
          </div>

          <div>
            <input
              type="submit"
              name="submit"
              value="Register"
            />
            <Link to="/home">Cancel</Link>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterPage;

