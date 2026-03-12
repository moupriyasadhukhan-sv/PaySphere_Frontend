import { createContext, useContext, useState } from "react";
import { setAuthToken } from "../services/http";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });

  const login = (token, role) => {
    setAuth({ token, role });
    setAuthToken(token); // <-- keep token in memory for axios
  };

  const logout = () => {
    setAuth({ token: null, role: null });
    setAuthToken(null); // remove token from axios memory
  };

  const value = { auth, login, logout, isAuthenticated: !!auth.token };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useState } from "react";
// import { setAuthToken } from "../services/http";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     token: null,
//     role: null,
//   });

//   const login = (token, role) => {
//     setAuth({ token, role });
//     setAuthToken(token); // set token in axios memory
//   };

//   const logout = () => {
//     setAuth({ token: null, role: null });
//     setAuthToken(null);
//   };

//   const value = {
//     auth,
//     login,
//     logout,
//     isAuthenticated: !!auth.token,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => useContext(AuthContext);
