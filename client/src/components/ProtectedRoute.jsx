import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, role, allowPublic = false }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  const location = useLocation();

  if (allowPublic && !token) {
    return children;
  }

   if (allowPublic && token && userRole === "admin") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (!token) {
    // Not logged in
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (userRole === "admin" && location.pathname !== "/admin-dashboard") {
    return <Navigate to="/admin-dashboard" replace />;
  }

  if (role && userRole !== role) {
    if (role === "admin") {
      return <Navigate to="/" replace />;
    }
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
