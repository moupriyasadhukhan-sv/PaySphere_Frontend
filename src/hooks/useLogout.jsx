import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function useLogout(redirectTo = "/login") {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return () => {
    logout(); // clears memory
    navigate(redirectTo, { replace: true });
  };
}