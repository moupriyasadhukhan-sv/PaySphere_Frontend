import api from "./http";

// POST /api/Auth/Admin-register
export const adminRegisterStaff = (payload) => {
  // payload: { name, email, password, role, phone }
  return api.post("/api/Auth/Admin-register", payload);
};