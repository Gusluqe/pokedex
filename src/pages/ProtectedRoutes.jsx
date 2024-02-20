import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const trainerName = useSelector((store) => store.trainerName);

  return trainerName.length > 2 ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
