import React from "react";
import { Link } from "react-router-dom"; // creates link component to create links to routes on the site

function Header(){
  return (
    <React.Fragment>
      <h1>Help Queue</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Header;