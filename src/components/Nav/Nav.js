import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
      <li>
          <Link to="/index">
            Index
          </Link>
        </li>
        <li>
          <Link to="/user">
            Profile
          </Link>
        </li>
        <li>
          <Link to="/options">
            Options
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
