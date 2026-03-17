// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function useLogout(redirectTo = "/login") {
//   const { logout } = useAuth();
//   const navigate = useNavigate();

//   return () => {
//     logout(); // clears memory
//     navigate(redirectTo, { replace: true });
//   };
// }

// src/hooks/useLogout.js
import { useDispatch } from "react-redux";
import { logout } from "../stores/authSlice";
import { useNavigate } from "react-router-dom";
import { authClient } from "../services/http";  // axios client with withCredentials:true

export default function useLogout(redirectTo = "/login") {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async () => {
    try {
      // backend: revoke refresh token + delete cookie
      await authClient.post("/auth/logout");
    } catch (e) {
      // ignore network errors
    }

    // frontend: clear accessToken + role
    dispatch(logout());

    // navigate user
    navigate(redirectTo, { replace: true });
  };
}