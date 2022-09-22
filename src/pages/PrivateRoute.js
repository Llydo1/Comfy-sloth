import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth0();
  if (!user) return <Redirect to="/"></Redirect>;
  return <Route {...rest}>{children}</Route>;
};
export default PrivateRoute;
