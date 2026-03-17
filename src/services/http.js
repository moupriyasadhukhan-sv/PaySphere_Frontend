// import axios from "axios";

// let AUTH_TOKEN = null;
// export const setAuthToken = (token) => {
//   AUTH_TOKEN = token || null;
// };

// const http = axios.create({
//   baseURL: "http://localhost:5245",
//   withCredentials: false, // keep false, you are not using cookies
// });

// http.interceptors.request.use((config) => {
//   if (AUTH_TOKEN) {
//     config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
//   }
//   return config;
// });

// export default http;

// src/services/http.js
// import axios from "axios";

// let AUTH_TOKEN = null;

// export const setAuthToken = (token) => {
//   AUTH_TOKEN = token || null;
// };

// export const getAuthToken = () => AUTH_TOKEN;

// export const http = axios.create({
//   baseURL: "http://localhost:5245",
//   withCredentials: false, // no cookies for normal API calls
// });

// export const authClient = axios.create({
//   baseURL: "http://localhost:5245",
//   withCredentials: true, // send/receive HttpOnly refresh cookie
// });

// // attach access token to normal API calls
// http.interceptors.request.use((config) => {
//   if (AUTH_TOKEN) config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
//   return config;
// });

// // Refresh queue handling
// let isRefreshing = false;
// let refreshQueue = [];
// const subscribe = (cb) => refreshQueue.push(cb);
// const publish = (token) => {
//   refreshQueue.forEach((cb) => cb(token));
//   refreshQueue = [];
// };

// // call refresh endpoint
// async function refreshAccessToken() {
//   const { data } = await authClient.post("/auth/refresh");
//   const newToken = data?.accessToken;
//   setAuthToken(newToken);
//   return newToken;
// }

// // 401 handler: try one silent refresh, then retry
// http.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     if (error?.response?.status === 401 && !original._retry) {
//       original._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const newToken = await refreshAccessToken();
//           publish(newToken);
//           return http(original);
//         } catch (e) {
//           setAuthToken(null);
//           return Promise.reject(e);
//         } finally {
//           isRefreshing = false;
//         }
//       }

//       // Wait until current refresh completes
//       return new Promise((resolve) => {
//         subscribe((token) => {
//           original.headers.Authorization = `Bearer ${token}`;
//           resolve(http(original));
//         });
//       });
//     }
//     return Promise.reject(error);
//   }
// );

// // Call on app start to restore session if cookie exists
// export async function bootstrapAuth() {
//   try {
//     await refreshAccessToken();
//     return true;
//   } catch {
//     setAuthToken(null);
//     return false;
//   }
// }



// src/services/http.js
// import axios from "axios";

// /**
//  * In-memory access token (DO NOT persist in localStorage/sessionStorage).
//  */
// let AUTH_TOKEN = null;
// export const setAuthToken = (token) => { AUTH_TOKEN = token || null; };
// export const getAuthToken = () => AUTH_TOKEN;

// /**
//  * API base URL – adjust if needed.
//  */
// const BASE_URL = "http://localhost:5245";

// /**
//  * Normal API client:
//  * - No cookies
//  * - Attaches Authorization header if in-memory token present
//  */
// export const http = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: false,
// });

// /**
//  * Auth client:
//  * - Sends/receives HttpOnly refresh cookie
//  * - Use for /auth/login, /auth/refresh, /auth/logout
//  */
// export const authClient = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// /**
//  * Attach access token on normal API requests.
//  */
// http.interceptors.request.use((config) => {
//   if (AUTH_TOKEN) {
//     config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
//   }
//   return config;
// });

// /**
//  * --- Refresh single-flight queue ---
//  * Ensures only one refresh call is in flight; concurrent 401s wait and retry.
//  */
// let isRefreshing = false;
// let refreshQueue = [];
// const subscribeRefresh = (cb) => refreshQueue.push(cb);
// const publishRefresh = (newToken) => {
//   refreshQueue.forEach((cb) => cb(newToken));
//   refreshQueue = [];
// };

// /**
//  * Call backend refresh endpoint (reads HttpOnly cookie), update in-memory token.
//  * Throws if refresh fails.
//  */
// async function refreshAccessToken() {
//   const { data } = await authClient.post("/auth/refresh");
//   const newToken = data?.accessToken;
//   if (!newToken) {
//     throw new Error("Refresh did not return accessToken");
//   }
//   setAuthToken(newToken);
//   return newToken;
// }

// /**
//  * 401 handler:
//  * - On first 401, try refresh, then retry the original request.
//  * - Any concurrent 401s wait until refresh completes, then retry.
//  */
// // http.interceptors.response.use(
// //   (res) => res,
// //   async (error) => {
// //     const original = error?.config;
// //     const status = error?.response?.status;

// //     if (status === 401 && original && !original._retry) {
// //       original._retry = true;

// //       if (!isRefreshing) {
// //         isRefreshing = true;
// //         try {
// //           const newToken = await refreshAccessToken();
// //           publishRefresh(newToken);
// //           // Retry the original request with fresh token
// //           return http(original);
// //         } catch (e) {
// //           // Refresh failed -> clear token; let caller handle redirect to /login
// //           setAuthToken(null);
// //           return Promise.reject(e);
// //         } finally {
// //           isRefreshing = false;
// //         }
// //       }

// //       // If a refresh is already in progress, queue until it finishes
// //       return new Promise((resolve) => {
// //         subscribeRefresh((newToken) => {
// //           if (newToken) {
// //             original.headers = original.headers || {};
// //             original.headers.Authorization = `Bearer ${newToken}`;
// //           }
// //           resolve(http(original));
// //         });
// //       });
// //     }

// //     return Promise.reject(error);
// //   }
// // );

// // /**
// //  * Call on app start (e.g., inside AuthProvider useEffect) to silently restore
// //  * the access token from the refresh cookie (if present).
// //  * Returns true on success, false otherwise.
// //  */
// // export async function bootstrapAuth() {
// //   try {
// //     await refreshAccessToken();
// //     return true;
// //   } catch {
// //     setAuthToken(null);
// //     return false;
// //   }
// // }

// http.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error?.config;
//     const status = error?.response?.status;
//     const url = (original?.url || "").toLowerCase();

//     // 1) Never attempt to refresh for auth endpoints
//     const isAuthEndpoint =
//       url.includes("/auth/refresh") || url.includes("/auth/login") || url.includes("/auth/logout");
//     if (isAuthEndpoint) {
//       return Promise.reject(error);
//     }

//     // 2) Only handle 401 for other endpoints
//     if (status === 401 && original && !original._retry) {
//       original._retry = true;

//       if (!isRefreshing) {
//         isRefreshing = true;
//         try {
//           const newToken = await refreshAccessToken(); // single call
//           publishRefresh(newToken);
//           return http(original); // retry the failed request
//         } catch (e) {
//           setAuthToken(null); // refresh failed → let caller redirect to /login
//           return Promise.reject(e);
//         } finally {
//           isRefreshing = false;
//         }
//       }

//       // If a refresh is already running, queue until it completes
//       return new Promise((resolve) => {
//         subscribeRefresh((newToken) => {
//           if (newToken) {
//             original.headers = original.headers || {};
//             original.headers.Authorization = `Bearer ${newToken}`;
//           }
//           resolve(http(original));
//         });
//       });
//     }

//     return Promise.reject(error);
//   }
// );



// export async function bootstrapAuth() {
//   try {
//     const token = await refreshAccessToken();   // ✅ get the token
//     return token;                               // ✅ return token (string)
//   } catch {
//     setAuthToken(null);
//     return null;                                // ✅ null on failure
//   }
// }



// /**
//  * (Optional) convenience wrappers you can call from your authService:
//  * They ensure the refresh cookie is sent and managed by the browser.
//  */
// export async function loginRequest(payload) {
//   // payload: { email, password, role }
//   const { data } = await authClient.post("/auth/login", payload);
//   // Server should return { accessToken, role }
//   const token = data?.accessToken || data?.token;
//   if (token) setAuthToken(token);
//   return data;
// }

// export async function logoutRequest() {
//   try {
//     await authClient.post("/auth/logout");
//   } finally {
//     setAuthToken(null);
//   }
// }


// http.js (you already posted something very close to this)
// import axios from "axios";

// let AUTH_TOKEN = null;
// export const setAuthToken = (t) => { AUTH_TOKEN = t || null; };
// export const getAuthToken = () => AUTH_TOKEN;

// const BASE_URL = "http://localhost:5245"; // or https://... if using HTTPS properly

// export const http = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
// });

// export const authClient = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: false, // IMPORTANT for cookies
// });

// // Attach Authorization on normal API client
// http.interceptors.request.use((config) => {
//   if (AUTH_TOKEN) {
//     config.headers = config.headers || {};
//     config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
//   }
//   return config;
// });

// async function refreshAccessToken() {
//   const { data } = await authClient.post("/auth/refresh");
//   const newToken = data?.accessToken;
//   if (!newToken) throw new Error("Refresh did not return accessToken");
//   setAuthToken(newToken); // <-- restore into memory
//   return newToken;
// }
// //here i change
// // export async function bootstrapAuth() {
// //   try {
// //     const token = await refreshAccessToken();
// //     return token; // return token to caller (provider)
// //   } catch {
// //     setAuthToken(null);
// //     return null;
// //   }
// //}
// export async function bootstrapAuth() {
//   try {
//     const { data } = await authClient.post("/auth/refresh");
//     const token = data?.accessToken;
//     if (token) setAuthToken(token);
//     return token ?? null;
//   } catch {
//     setAuthToken(null);
//     return null;
//   }
// }


// export async function loginRequest(payload) {
//   const { data } = await authClient.post("/auth/login", payload);
//   const token = data?.accessToken || data?.token;
//   if (token) setAuthToken(token); // set into memory
//   return data;
// }

// export async function logoutRequest() {
//   try {
//     await authClient.post("/auth/logout");
//   } finally {
//     setAuthToken(null);
//   }
// }


// // import axios from "axios";

// // let AUTH_TOKEN = null;
// // export const setAuthToken = (t) => { AUTH_TOKEN = t || null; };
// // export const getAuthToken = () => AUTH_TOKEN;

// // // Use http:// during dev if your API is also on http://
// // // If your API is on https://, set this to https and use SameSite=None; Secure=true on server.
// // const BASE_URL = "";

// // // Normal API client: NO cookies, just Bearer token from memory
// // export const http = axios.create({
// //   baseURL: BASE_URL,
// //   withCredentials: false, // ⬅️ important
// // });

// // // Auth client: sends/receives refresh cookie
// // export const authClient = axios.create({
// //   baseURL: BASE_URL,
// //   withCredentials: true,
// // });

// // // Attach Authorization on normal API requests
// // http.interceptors.request.use((config) => {
// //   if (AUTH_TOKEN) {
// //     config.headers = config.headers || {};
// //     config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
// //   }
// //   return config;
// // });

// // // Refresh (uses authClient with cookies)
// // async function refreshAccessToken() {
// //   const { data } = await authClient.post("/auth/refresh");
// //   const newToken = data?.accessToken;
// //   if (!newToken) throw new Error("Refresh did not return accessToken");
// //   setAuthToken(newToken);
// //   return newToken;
// // }

// // // Bootstrap on app start
// // export async function bootstrapAuth() {
// //   try {
// //     const token = await refreshAccessToken();
// //     return token;  // provider will store it in state too
// //   } catch {
// //     setAuthToken(null);
// //     return null;
// //   }
// // }

// // export async function loginRequest(payload) {
// //   const { data } = await authClient.post("/auth/login", payload);
// //   const token = data?.accessToken || data?.token;
// //   if (token) setAuthToken(token);
// //   return data;
// // }

// // export async function logoutRequest() {
// //   try {
// //     await authClient.post("/auth/logout");
// //   } finally {
// //     setAuthToken(null);
// //   }
// // }



import axios from "axios";
import { store } from "../stores/store";
import { setCredentials, logout } from "../stores/authSlice";

const BASE_URL = "http://localhost:5245";

// ---- For refresh token cookie
export const authClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // VERY IMPORTANT
});

// ---- For normal API requests
export const api = axios.create({
  baseURL: BASE_URL,
});

// Attach Bearer token to all API requests
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh if access token expired
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const { data } = await authClient.post("/auth/refresh");
        const newToken = data.accessToken;

        if (newToken) {
          store.dispatch(
            setCredentials({
              accessToken: newToken,
              role: store.getState().auth.role,
            })
          );

          original.headers.Authorization = `Bearer ${newToken}`;
          return api(original);
        }
      } catch (e) {
        store.dispatch(logout());
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);