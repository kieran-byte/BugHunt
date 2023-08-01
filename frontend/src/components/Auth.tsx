import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  navigatePathWhenNotAuth?: string;
  children: React.ReactNode;
}

export function RequiresAuth({ children }: Props) {
  const isAuthenticated = localStorage.getItem("user");

  if (isAuthenticated) return <>{children}</>;
  return <Navigate to={"/login"} />;
}
