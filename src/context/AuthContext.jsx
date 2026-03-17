// // import { createContext, useContext, useState } from "react";
// // import { setAuthToken } from "../services/http";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [auth, setAuth] = useState({
// //     token: null,
// //     role: null,
// //   });

// //   const login = (token, role) => {
// //     setAuth({ token, role });
// //     setAuthToken(token); // <-- keep token in memory for axios
// //   };

// //   const logout = () => {
// //     setAuth({ token: null, role: null });
// //     setAuthToken(null); // remove token from axios memory
// //   };

// //   const value = { auth, login, logout, isAuthenticated: !!auth.token };
// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export const useAuth = () => useContext(AuthContext);

// // src/services/authservices/authService.js
// // import { authClient } from "../../services/http";

// // export function loginUser(payload) {
// //   // payload: { email, password, role }
// //   return authClient.post("/auth/login", payload); // sets HttpOnly refresh cookie
// // }

// // export function logoutUser() {
// //   return authClient.post("/auth/logout"); // revokes cookie
// // }



// // src/context/AuthContext.jsx
// // import { createContext, useContext, useEffect, useMemo, useState } from "react";
// // import { setAuthToken, getAuthToken, bootstrapAuth, logoutRequest } from "../services/http";

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [auth, setAuth] = useState({ token: null, role: null });
// //   const [ready, setReady] = useState(false);

// //   useEffect(() => {
// //     (async () => {
// //       const ok = await bootstrapAuth();
// //       setAuth({ token: ok ? getAuthToken() : null, role: null });
// //       setReady(true);
// //     })();
// //   }, []);

// //   const login = (token, role) => {
// //     setAuth({ token, role: role || null });
// //     setAuthToken(token);
// //   };

// //   const logout = async () => {
// //     await logoutRequest();
// //     setAuth({ token: null, role: null });
// //   };

// //   const value = useMemo(
// //     () => ({
// //       auth,
// //       role: auth.role,
// //       isAuthenticated: !!auth.token,
// //       ready,
// //       login,
// //       logout,
// //     }),
// //     [auth, ready]
// //   );

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export const useAuth = () => useContext(AuthContext);


// // src/context/AuthContext.jsx
// // import { createContext, useContext, useEffect, useMemo, useState } from "react";
// // import { setAuthToken, bootstrapAuth, logoutRequest } from "../services/http";
// // import { jwtDecode } from "jwt-decode";

// // function extractRoleFromToken(token) {
// //   if (!token) return null;
// //   try {
// //     const d = jwtDecode(token);
// //     // common role claim keys
// //     const role =
// //       d["role"] ||
// //       d["roles"] ||
// //       d["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
// //     if (Array.isArray(role)) return role[0];
// //     return role ?? null;
// //   } catch {
// //     return null;
// //   }
// // }

// // const AuthContext = createContext(null);

// // export const AuthProvider = ({ children }) => {
// //   const [state, setState] = useState({ token: null, role: null });
// //   const [ready, setReady] = useState(false);

// //   useEffect(() => {
// //     (async () => {
// //       // Try to silently refresh token from cookie on app start
// //       const token = await bootstrapAuth(); // POST /auth/refresh via authClient
// //       if (token) {
// //         setAuthToken(token);                // set axios Authorization header
// //         const role = extractRoleFromToken(token);
// //         setState({ token, role });
// //       } else {
// //         setState({ token: null, role: null });
// //       }
// //       setReady(true);
// //     })();
// //   }, []);

// //   const login = (token, roleFromApi) => {
// //     const role = roleFromApi || extractRoleFromToken(token);
// //     setAuthToken(token);
// //     setState({ token, role });
// //   };

// //   const logout = async () => {
// //     try {
// //       await logoutRequest(); // revoke refresh cookie
// //     } catch {
// //       // ignore network errors
// //     } finally {
// //       setAuthToken(null);
// //       setState({ token: null, role: null });
// //     }
// //   };

// //   const value = useMemo(
// //     () => ({
// //       // what ProtectedRoute needs:
// //       ready,
// //       isAuthenticated: !!state.token,
// //       role: state.role,
// //       // helpers
// //       token: state.token,
// //       login,
// //       logout,
// //     }),
// //     [ready, state]
// //   );

// //   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// // };

// // export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { setAuthToken, bootstrapAuth, logoutRequest } from "../services/http";
// import { jwtDecode } from "jwt-decode";

// /**
//  * Extract a single role string from a JWT.
//  * Supports common claim keys and array/string values.
//  */
// function extractRoleFromToken(token) {
//   if (!token) return null;
//   try {
//     const d = jwtDecode(token);
//     const role =
//       d["role"] ||
//       d["roles"] ||
//       d["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
//     if (Array.isArray(role)) return role[0] ?? null;
//     return role ?? null;
//   } catch {
//     return null;
//   }
// }

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [state, setState] = useState({ token: null, role: null });
//   const [ready, setReady] = useState(false);

//   // useEffect(() => {
//   //   (async () => {
//   //     // bootstrapAuth now returns token | null
//   //     const token = await bootstrapAuth();

//   //     if (token) {
//   //       // Set axios Authorization header for normal client
//   //       setAuthToken(token);
//   //       const role = extractRoleFromToken(token);
//   //       setState({ token, role });
//   //     } else {
//   //       // Clear any stale Authorization header
//   //       setAuthToken(null);
//   //       setState({ token: null, role: null });
//   //     }

//   //     setReady(true);
//   //   })();
//   // }, []);

//   useEffect(() => {
//   (async () => {
//     // Only try refresh if refresh cookie exists
//     const hasRefreshCookie = document.cookie.includes("refresh_token=");

//     if (!hasRefreshCookie) {
//       // No cookie = user not logged in
//       setReady(true);
//       return;
//     }

//     // OK to refresh
//     const token = await bootstrapAuth();

//     if (token) {
//       setAuthToken(token);
//       const role = extractRoleFromToken(token);
//       setState({ token, role });
//     } else {
//       setAuthToken(null);
//       setState({ token: null, role: null });
//     }

//     setReady(true);
//   })();
// }, []);

//   /**
//    * Call this after a successful login.
//    * - `token` should be the accessToken returned by /auth/login
//    * - `roleFromApi` optional if backend already returns role separately
//    */
//   const login = (token, roleFromApi) => {
//     const role = roleFromApi || extractRoleFromToken(token);
//     setAuthToken(token);
//     setState({ token, role });
//   };

//   /**
//    * Logs out:
//    * - tells backend to revoke refresh token cookie
//    * - clears in-memory access token and context state
//    */
//   const logout = async () => {
//     try {
//       await logoutRequest(); // revokes refresh cookie
//     } catch {
//       // swallow network error
//     } finally {
//       setAuthToken(null);
//       setState({ token: null, role: null });
//     }
//   };

//   const value = useMemo(
//     () => ({
//       ready,
//       isAuthenticated: !!state.token,
//       role: state.role,
//       token: state.token,
//       login,
//       logout,
//     }),
//     [ready, state]
//   );

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);