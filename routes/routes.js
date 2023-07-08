import React from "react";
import { Route, Navigate } from "react-router-dom";
import ProtectedPage from "./components/ProtectedPage";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  // If the token is present, render the ProtectedPage component
  // Otherwise, redirect to the login page
  return token ? <ProtectedPage /> : <Navigate to="/" />;
};

const routes = [
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/protected",
    element: <ProtectedRoute />,
  },

  // Add other routes if needed
];

export default routes;
