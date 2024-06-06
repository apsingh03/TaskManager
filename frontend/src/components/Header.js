import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
 
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark px-5">
        <Link to="/" className="navbar-brand text-light" href="#">
          Task Manager
        </Link>
        <button
          className="navbar-toggler  "
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to="/" className="nav-link text-light" href="#">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-link text-light" href="#">
                Sign Up | Log In
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
};

export default Header;
