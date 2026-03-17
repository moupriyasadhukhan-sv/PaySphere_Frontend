// // src/context/AuthBootstrap.jsx
// import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
// import { bootstrapAuth, getAuthToken } from "../services/http";

// export const AuthBootstrapContext = createContext({
//   ready: false,
//   isAuthed: false,
//   token: null,
//   retry: async () => {},
// });

// export default function AuthBootstrap({ children }) {
//   const mountedRef = useRef(true);
//   const [ready, setReady] = useState(false);
//   const [isAuthed, setIsAuthed] = useState(false);
//   const [token, setToken] = useState(null);
//   const [error, setError] = useState("");

//   async function doBootstrap() {
//     setError("");
//     try {
//       const t = await bootstrapAuth(); // POST /auth/refresh via authClient (withCredentials)
//       if (!mountedRef.current) return;
//       setIsAuthed(!!t);
//       setToken(t || null);
//     } catch (e) {
//       if (!mountedRef.current) return;
//       setError("Failed to restore session.");
//       setIsAuthed(false);
//       setToken(null);
//     } finally {
//       if (mountedRef.current) setReady(true);
//     }
//   }

//   useEffect(() => {
//     mountedRef.current = true;
//     // Initial attempt
//     doBootstrap();
//     return () => {
//       mountedRef.current = false;
//     };
//   }, []);

//   const value = useMemo(
//     () => ({
//       ready,
//       isAuthed,
//       token,
//       retry: doBootstrap,
//     }),
//     [ready, isAuthed, token]
//   );

//   if (!ready) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="px-5 py-4 rounded-xl border border-slate-200 bg-white shadow-sm text-slate-800">
//           Loading…
//         </div>
//       </div>
//     );
//   }

//   // Optional: if you want to show a retry UI only when bootstrap failed
//   // (i.e., not authenticated AND an error occurred)
//   if (!isAuthed && error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-slate-50">
//         <div className="px-5 py-4 rounded-xl border border-slate-200 bg-white shadow-sm text-center">
//           <p className="text-slate-700 mb-3">{error}</p>
//           <button
//             onClick={value.retry}
//             className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
//           >
//             Try again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <AuthBootstrapContext.Provider value={value}>
//       {children}
//     </AuthBootstrapContext.Provider>
//   );
// }

// export const useAuthBootstrap = () => useContext(AuthBootstrapContext);