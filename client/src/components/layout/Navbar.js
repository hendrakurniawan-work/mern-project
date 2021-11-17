import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";

export const Navbar = () => {
  const dispatch = useDispatch();

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="hide-sm">Dashboard</span></Link>
      </li>
      <li>
        <a onClick={() => dispatch(logout())} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code"></i> DevHub
          </Link>
        </h1>
        {!loading && (
          <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
        )}
      </nav>
    </div>
  );
};
