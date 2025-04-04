import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  if (!jwt && !auth.jwt) {
    return <Navigate to="/account/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
