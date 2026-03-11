import http from "../http";

export const registerUser = (data) => http.post("/api/Auth/register", data);
export const loginUser = (data) => http.post("/api/Auth/login", data);

// Example protected call (later, for testing)
// export const getProfile = () => http.get("/api/Auth/me");