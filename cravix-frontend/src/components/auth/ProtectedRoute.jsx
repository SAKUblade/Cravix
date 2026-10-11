import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

function ProtectedRoute({ children, adminOnly = false }) {
  const { isAuthenticated, user, token } = useAuth();
  const location = useLocation();

console.log("========== ProtectedRoute ==========");
console.log("isAuthenticated:", isAuthenticated);
console.log("token:", token);
console.log("user:", user);
console.log("role:", user?.role);
console.log("pathname:", location.pathname);
console.log("===================================");

  if (!isAuthenticated) {
    return (
      <Navigate
  to={`/login?redirect=${encodeURIComponent(location.pathname)}`}
  replace
/>
    );
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;