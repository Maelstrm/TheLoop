import React, {Component} from 'react';
import {connect} from 'react-redux';
import Nav from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import {USER_ACTIONS} from '../../redux/actions/userActions';
import RecomItem from '../RecomItem/RecomItem';

// get all recommendations from the database
import Axios from 'axios';


const mapStateToProps = state => ({
  // Stores the current user state
  user: state.user,
});

class IndexPage extends Component {
  constructor() {
    super();
    this.state = {
      // Stores all recommendations
      allRecom: [],
    }
  }

  // On Page Load, will run this code
  componentDidMount() {
    // Check to see if user is logged in
    this.props.dispatch({
      type: USER_ACTIONS.FETCH_USER
    });

    this.getAllRecom();
    console.log(this.state.allRecom);

  }

  getAllRecom = () => {
    Axios({
      method: 'get',
      url: '/api/recom/getAll'
    }).then((response) => {
      this.setState({
        allRecom: response.data,
      });
      console.log('in getAllREcom', this.state.allRecom);

    }).catch((error) => {
      console.log('error in getAllRecom', error);
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
      <div >
        <Nav />
        {this.state.allRecom.map((item, i) => {
          return (<RecomItem key={i} data={item} />)
        })}
        <Footer />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(IndexPage);