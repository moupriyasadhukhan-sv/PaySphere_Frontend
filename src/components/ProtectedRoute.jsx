import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowed }) {
  const location = useLocation();
  const { auth, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (Array.isArray(allowed) && allowed.length > 0) {
    const normalize = (r) => String(r || "").trim().toLowerCase().replaceAll("_", "-");
    const currentRole = normalize(auth?.role);
    const allowedSet = new Set(allowed.map(normalize));
    if (!allowedSet.has(currentRole)) {
      return <Navigate to="/login" replace />;
    }
  }

  return children;
}