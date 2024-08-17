import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <ul>
        <li>
          <Link className="nav-list" to="/">
            Companies
          </Link>
        </li>
        <li>
          <Link className="nav-list" to="/cities">
            Cities
          </Link>
        </li>
        <li>
          <Link className="nav-list" to="/routes">
            Routes
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
