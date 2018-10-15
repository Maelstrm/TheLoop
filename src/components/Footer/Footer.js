import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css'

const Nav = () => (
  <div className="navbar navBar">
    <div className="mx-auto row innerRow">
      <ul className="nav">
        <li className="nav-item shadow">
          <Link to="/create">
              <i className="fas fa-plus-circle navButton" alt="New Request"></i>
          </Link>
        </li>
        <li className="nav-item shadow">
          <Link to="/pending">
          <i className="fas fa-hourglass navButton" alt="Pending Requests"></i>
          </Link>
        </li>
        <li className="nav-item shadow">
          <Link to="/favorites">
          <i className="fas fa-heart navButton" alt="favorites"></i>
          </Link>
        </li>
        <li className="nav-item shadow">
          <Link to="/fill">
          <i className="fas fa-pen navButton" alt="Fill Request"></i>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
