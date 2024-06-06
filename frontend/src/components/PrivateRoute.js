import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const authReduxisAuthenticated = useSelector(
    (state) => state.auth.loggedData.isUserLogged
  );

  return authReduxisAuthenticated ? <Outlet /> : <Navigate to="/signup" />;
};

export default PrivateRoute;
