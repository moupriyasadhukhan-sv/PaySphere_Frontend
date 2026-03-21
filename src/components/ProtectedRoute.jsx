// ProtectedRoute.jsx


import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { refreshAccessToken } from "../services/authservices/authService";
import { setCredentials, logout } from "../stores/authSlice";

export default function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.accessToken);
  const role  = useSelector((state) => state.auth.role);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      if (!token) {
        // Try silent refresh
        const newToken = await refreshAccessToken();

        if (newToken) {
          dispatch(setCredentials({ accessToken: newToken, role }));
        } else {
          dispatch(logout());
          navigate("/login", { replace: true });
        }
      }

      setLoading(false);
    }

    checkSession();
  }, [token]);

  // Show nothing while refreshing
  if (loading) return null;

  if (!token) return <Navigate to="/login" replace />;

  return children;
}






// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children }) {
//   // Read accessToken from Redux store
//   const token = useSelector((state) => state.auth.accessToken);

//   // If no token → user is not authenticated
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }







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