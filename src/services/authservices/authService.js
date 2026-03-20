// src/services/authservices/authService.js



import { api, authClient } from "../http";

// Register user (uses normal API)
export const registerUser = (data) => 
  api.post("/api/Auth/register", data);

// Login (uses minimal API + refresh cookie)
export function loginUser(payload) {

  return authClient.post("/auth/login", payload);
}

// Logout (deletes refresh cookie)
export function logoutUser() {
  return authClient.post("/api/Auth/logout");
}
// import { http, authClient } from "../http";

// export const registerUser = (data) => http.post("/api/Auth/register", data);

// // payload: { email, password, role }
// export function loginUser(payload) {
//   return authClient.post("api/Auth/login", payload); // withCredentials: true
// }

// export function logoutUser() {
//   return authClient.post("api/Auth/logout");
// }




// import { http ,authClient} from "../http";

// export const registerUser = (data) => http.post("/api/Auth/register", data);
// // export const loginUser = (data) => http.post("/api/Auth/login", data);

// export function loginUser(payload) {
//   // payload: { email, password, role }
//   return authClient.post("/auth/login", payload); // Set-Cookie received here
// }


// export function logoutUser() {
//   return authClient.post("/auth/logout");
//}


// Example protected call (later, for testing)
// export const getProfile = () => http.get("/api/Auth/me");