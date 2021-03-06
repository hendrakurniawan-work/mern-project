import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ path, component }) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);

  if (!isAuthenticated && !loading) {
    return <Redirect to="login" />;
  }
  return <Route exact path={path} component={component} />;
};

export default PrivateRoute;
