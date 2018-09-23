import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/create">
            CreateNewRequest
          </Link>
        </li>
        <li>
          <Link to="/pending">
            PendingRequests
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            Favorites
          </Link>
        </li>
        <li>
          <Link to="/fill">
            FillRequests
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
