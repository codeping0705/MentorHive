import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../store/user";

const ProtectedRoute = (props) => {
  const { children } = props;
  const { user } = useUserStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to={`/signin?redirect=${location.pathname}`} />;
  }

  return <div>{children}</div>;
};

export default ProtectedRoute;
