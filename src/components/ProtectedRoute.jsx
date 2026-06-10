import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, adminOnly = false }) {

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/login" />;

  const isAdmin = user.role === "ADMIN";

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
}