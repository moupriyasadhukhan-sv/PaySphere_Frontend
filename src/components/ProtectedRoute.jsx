// // src/components/ProtectedRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// /**
//  * ProtectedRoute
//  * - Ensures user is authenticated
//  * - If `allowed` roles provided, also enforces role-based access (e.g. ['Admin', 'Ops'])
//  *
//  * Usage:
//  *   <ProtectedRoute>...any protected page...</ProtectedRoute>
//  *   <ProtectedRoute allowed={['Admin']}>...admin page...</ProtectedRoute>
//  *   <ProtectedRoute allowed={['Admin','Ops']}>...shared page...</ProtectedRoute>
//  */
// export default function ProtectedRoute({ children, allowed }) {
//   const location = useLocation();
//   const { auth, isAuthenticated } = useAuth();

//   // 1) Must be logged in
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // 2) Optional role check
//   if (Array.isArray(allowed) && allowed.length > 0) {
//     const normalize = (r) =>
//       String(r || "").trim().toLowerCase().replaceAll("_", "-");
//     const currentRole = normalize(auth?.role);
//     const allowedSet = new Set(allowed.map(normalize));

//     if (!allowedSet.has(currentRole)) {
//       // Logged in but not permitted -> redirect (or send to /403)
//       return <Navigate to="/login" replace />;
//     }
//   }

//   return children;
// }


// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ allowedRoles = [], children }) {
  const { auth } = useAuth();  // e.g., { isAuthenticated, role, ... }
  const location = useLocation();

  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (allowedRoles.length > 0 && !allowedRoles.includes(auth?.role)) {
    // send to a safe page (could be /, /login, or a 403 page)
    return <Navigate to="/login" replace />;
  }
  return children;
}