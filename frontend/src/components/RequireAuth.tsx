import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "@/store/apis/authApi";

const RequireAuth: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { data: user, isLoading } = useGetCurrentUserQuery();
  const location = useLocation();

  if (isLoading) return null; // or a spinner

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;