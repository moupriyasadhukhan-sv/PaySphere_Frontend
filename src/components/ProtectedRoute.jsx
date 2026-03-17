// ProtectedRoute.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Read accessToken from Redux store
  const token = useSelector((state) => state.auth.accessToken);

  // If no token → user is not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}







// import { Navigate } from "react-router-dom";
//  import { useAuth } from "../context/AuthContext";
// export default function ProtectedRoute({ children }) {
//   const { ready, isAuthenticated } = useAuth();

//   if (!ready) return null; // or a spinner
//   if (!isAuthenticated) return <Navigate to="/login" replace />;

//   return children;
// }



// src/components/ProtectedRoute.jsx
// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ allowedRoles, children }) {
//   const { ready, isAuthenticated, role } = useAuth();
//   const location = useLocation();

//   if (!ready) return null; // or spinner

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
//     const hasAccess = allowedRoles.includes(role);
//     if (!hasAccess) {
//       return <Navigate to="/login" replace />;
//     }
//   }

//   return children;
// }





// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function ProtectedRoute({ allowedRoles, children }) {
//   const { ready, isAuthenticated, role } = useAuth();
//   const location = useLocation();

//   // 1) Wait until silent refresh finishes
//   if (!ready) return null;               

//   // 2) If still not authed after refresh -> go to login
//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   // 3) If route has role constraints -> enforce them
//   if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
//     const hasAccess = allowedRoles.includes(role);
//     if (!hasAccess) return <Navigate to="/login" replace />;
//   }

//   return children;
// }



// export default function ProtectedRoute({ children, allowed }) {
//   const location = useLocation();
//   const { auth, isAuthenticated } = useAuth();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace state={{ from: location }} />;
//   }

//   if (Array.isArray(allowed) && allowed.length > 0) {
//     const normalize = (r) => String(r || "").trim().toLowerCase().replaceAll("_", "-");
//     const currentRole = normalize(auth?.role);
//     const allowedSet = new Set(allowed.map(normalize));
//     if (!allowedSet.has(currentRole)) {
//       return <Navigate to="/login" replace />;
//     }
//   }

//   return children;
// }