// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginUser } from "../../services/authservices/authService";
// // import { useAuth } from "../../context/AuthContext";

// // // Helper to normalize role variants from backend
// // function normalizeRole(roleRaw) {
// //   const r = String(roleRaw || "").trim().toLowerCase();
// //   const normalized = r.replaceAll("_", "-"); // ops_admin -> ops-admin
// //   if (normalized === "opsadmin") return "ops-admin";
// //   return normalized;
// // }

// // // Map normalized role -> route
// // const ROLE_TO_PATH = {
// //   "user": "/dashboard/user",
// //   "merchant": "/dashboard/merchant",
// //   "admin": "/dashboard/admin",
// //   "risk": "/dashboard/risk",
// //   "ops": "/dashboard/ops",
// //   "ops-admin": "/dashboard/ops-admin",
// // };

// // const initial = { email: "", password: "", role: "" };

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [data, setData] = useState(initial);
// //   const [errors, setErrors] = useState({});
// //   const [submitting, setSubmitting] = useState(false);

// //   const validate = () => {
// //     const e = {};
// //     if (!data.email) e.email = "Email is required.";
// //     else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

// //     if (!data.password) e.password = "Password is required.";
// //     else if (data.password.length < 6) e.password = "Minimum 6 characters.";

// //     if (!data.role) e.role = "Role is required.";
// //     return e;
// //   };

// //   const handleChange = (ev) => {
// //     const { name, value } = ev.target;
// //     setData((p) => ({ ...p, [name]: value }));
// //     setErrors((p) => ({ ...p, [name]: "" }));
// //   };

// //   const handleSubmit = async (ev) => {
// //     ev.preventDefault();
// //     const e = validate();
// //     setErrors(e);
// //     if (Object.keys(e).length) return;

// //     try {
// //       setSubmitting(true);

// //       // Backend expects: { email, password, role }
// //       const res = await loginUser({
// //         email: data.email,
// //         password: data.password,
// //         role: data.role, // keep values EXACT (User, Merchant, Admin, Risk, Ops, Ops-Admin)
// //       });

// //       // Adjust these keys if your API uses different names
// //       const token = res?.data?.token;
// //       const roleFromApi = res?.data?.role;

// //       if (!token) {
// //         alert("Login succeeded but token missing from response.");
// //         return;
// //       }

// //       // Prefer role from API/JWT; fallback to what user selected
// //       const finalRole = roleFromApi || data.role;

// //       // Save in memory (AuthContext)
// //       login(token, finalRole);

// //       // Normalize & redirect
// //       const path = ROLE_TO_PATH[normalizeRole(finalRole)] || "/dashboard";
// //       navigate(path);
// //     } catch (err) {
// //       const msg =
// //         err?.response?.data?.message ||
// //         err?.response?.data?.title ||
// //         "Login failed!";
// //       alert(msg);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
// //       <div className="w-full max-w-md">
// //         {/* Card */}
// //         <div className="bg-white rounded-xl shadow border border-gray-100 p-6 sm:p-8">
// //           {/* Icon / Title */}
// //           <div className="flex flex-col items-center">
// //             <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-3">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 className="h-6 w-6"
// //                 fill="none"
// //                 viewBox="0 0 24 24"
// //                 stroke="currentColor"
// //                 strokeWidth={2}
// //               >
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0-7a7 7 0 100-14 7 7 0 000 14z" />
// //               </svg>
// //             </div>
// //             <h1 className="text-2xl font-semibold">Login</h1>
// //             <p className="text-sm text-gray-500 mt-1">Sign in to your PaySphere account</p>
// //           </div>

// //           {/* Form */}
// //           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="you@example.com"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.email ? "border-red-500" : "border-gray-300"
// //                 } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //                 value={data.email}
// //                 onChange={handleChange}
// //               />
// //               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="••••••••"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.password ? "border-red-500" : "border-gray-300"
// //                 } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //                 value={data.password}
// //                 onChange={handleChange}
// //               />
// //               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
// //             </div>

// //             {/* Role */}
// //             <div>
// //               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
// //               <select
// //                 name="role"
// //                 className={`w-full p-2.5 rounded-lg border bg-white ${
// //                   errors.role ? "border-red-500" : "border-gray-300"
// //                 } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //                 value={data.role}
// //                 onChange={handleChange}
// //               >
// //                 <option value="">Select Role</option>
// //                 {/* Values must match backend exactly */}
// //                 <option value="User">User</option>
// //                 <option value="Merchant">Merchant</option>
// //                 <option value="Admin">Admin</option>
// //                 <option value="Risk">Risk</option>
// //                 <option value="Ops">Ops</option>

// //               </select>
// //               {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
// //             </div>

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={submitting}
// //               className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
// //             >
// //               {submitting ? "Signing in..." : "Login"}
// //             </button>
// //           </form>

// //           {/* Footer */}
// //           <p className="text-center text-sm text-gray-600 mt-4">
// //             Don&apos;t have an account?{" "}
// //             <Link to="/register" className="text-indigo-600 hover:underline">
// //               Create one
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginUser } from "../../services/authservices/authService";
// // import { useAuth } from "../../context/AuthContext";
// // import { http } from "../../services/http";
// // import Modal from "../../common/Modal";

// // // Helper to normalize role variants from backend
// // function normalizeRole(roleRaw) {
// //   const r = String(roleRaw || "").trim().toLowerCase();
// //   const normalized = r.replaceAll("_", "-");
// //   if (normalized === "opsadmin") return "ops-admin";
// //   return normalized;
// // }

// // // Map normalized role -> route
// // const ROLE_TO_PATH = {
// //   "user": "/dashboard/user",
// //   "merchant": "/dashboard/merchant",
// //   "admin": "/dashboard/admin",
// //   "risk": "/dashboard/risk",
// //   "ops": "/dashboard/ops",
// //   "ops-admin": "/dashboard/ops-admin",
// // };

// // const initial = { email: "", password: "", role: "" };

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [data, setData] = useState(initial);
// //   const [errors, setErrors] = useState({});
// //   const [submitting, setSubmitting] = useState(false);

// //   // Forgot password modal state
// //   const [forgotOpen, setForgotOpen] = useState(false);
// //   const [forgotEmail, setForgotEmail] = useState("");
// //   const [sending, setSending] = useState(false);
// //   const [sentMsg, setSentMsg] = useState("");
// //   const [sendErr, setSendErr] = useState("");

// //   const validate = () => {
// //     const e = {};
// //     if (!data.email) e.email = "Email is required.";
// //     else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

// //     if (!data.password) e.password = "Password is required.";
// //     else if (data.password.length < 6) e.password = "Minimum 6 characters.";

// //     if (!data.role) e.role = "Role is required.";
// //     return e;
// //   };

// //   const handleChange = (ev) => {
// //     const { name, value } = ev.target;
// //     setData((p) => ({ ...p, [name]: value }));
// //     setErrors((p) => ({ ...p, [name]: "" }));
// //   };

// //   const handleSubmit = async (ev) => {
// //     ev.preventDefault();
// //     const e = validate();
// //     setErrors(e);
// //     if (Object.keys(e).length) return;

// //     try {
// //       setSubmitting(true);

// //       // Backend expects: { email, password, role }

// // // const res = await loginUser({
// // //     email: data.email,
// // //     password: data.password,
// // //     role: data.role,
// // //   });

// //   const res = await loginUser({
// //   email: data.email,
// //   password: data.password,
// //   role: data.role,
// // });

// // if (!res.data.isSuccess) {
// //   alert(res.data.message || "Login failed!");
// //   return;
// // }

// //       const token = res?.data?.accessToken;
// //       const roleFromApi = res?.data?.role;
// //       if (!token) {
// //         alert("Login succeeded but token missing from response.");
// //         return;
// //       }

// //       const finalRole = roleFromApi || data.role;
// //       login(token, finalRole);

// //       const path = ROLE_TO_PATH[normalizeRole(finalRole)] || "/dashboard";
// //       navigate(path);
// //     } catch (err) {
// //       const msg =
// //         err?.response?.data?.message ||
// //         err?.response?.data?.title ||
// //         "Login failed!";
// //       alert(msg);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // Forgot password modal helpers
// //   const openForgot = () => {
// //     setSendErr("");
// //     setSentMsg("");
// //     setForgotEmail(data.email || "");
// //     setForgotOpen(true);
// //   };
// //   const closeForgot = () => {
// //     if (sending) return;
// //     setForgotOpen(false);
// //   };
// //   const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());

// //   const sendResetLink = async () => {
// //     const email = (forgotEmail || "").trim();
// //     setSendErr("");
// //     setSentMsg("");
// //     if (!isValidEmail(email)) {
// //       setSendErr("Please enter a valid email address.");
// //       return;
// //     }
// //     try {
// //       setSending(true);
// //       await http.post("/api/AuthMail/send-reset-link", { email });
// //       setSentMsg("If this email is registered, a password reset link has been sent.");
// //       // Optionally auto-close after a delay:
// //       // setTimeout(() => setForgotOpen(false), 1500);
// //     } catch (e) {
// //       console.error(e);
// //       const msg =
// //         e?.response?.data?.message ||
// //         e?.response?.data ||
// //         e?.message ||
// //         "Failed to send reset link.";
// //       setSendErr(String(msg));
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
// //       <div className="w-full max-w-md">
// //         {/* Card */}
// //         <div className="bg-white rounded-xl shadow border border-slate-200 p-6 sm:p-8">
// //           {/* Icon / Title */}
// //           <div className="flex flex-col items-center">
// //             <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-3">
// //               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
// //                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0-7a7 7 0 100-14 7 7 0 000 14z" />
// //               </svg>
// //             </div>
// //             <h1 className="text-2xl font-semibold text-slate-900">Welcome Back</h1>
// //             <p className="text-sm text-slate-500 mt-1">Sign in to your PaySphere account</p>
// //           </div>

// //           {/* Form */}
// //           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="you@example.com"
// //                 className={`w-full p-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //                 value={data.email}
// //                 onChange={handleChange}
// //               />
// //               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
// //             </div>

// //             {/* Password (+ Forgot link) */}
// //             <div>
// //               <div className="flex items-center justify-between">
// //                 <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
// //                 <button type="button" onClick={openForgot} className="text-sm text-indigo-600 hover:underline">
// //                   Forgot password?
// //                 </button>
// //               </div>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="••••••••"
// //                 className={`w-full p-2.5 rounded-lg border ${errors.password ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //                 value={data.password}
// //                 onChange={handleChange}
// //               />
// //               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
// //             </div>

// //             {/* Role */}
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-1">Login As</label>
// //               <select
// //                 name="role"
// //                 className={`w-full p-2.5 rounded-lg border bg-white ${errors.role ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //                 value={data.role}
// //                 onChange={handleChange}
// //               >
// //                 <option value="">Select Role</option>
// //                 <option value="User">User</option>
// //                 <option value="Merchant">Merchant</option>
// //                 <option value="Admin">Admin</option>
// //                 <option value="Risk">Risk</option>
// //                 <option value="Ops">Ops</option>
// //               </select>
// //               {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
// //             </div>

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={submitting}
// //               className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
// //             >
// //               {submitting ? "Signing in..." : "Sign In"}
// //             </button>
// //           </form>

// //           {/* Footer */}
// //           <p className="text-center text-sm text-slate-600 mt-4">
// //             Don&apos;t have an account?{" "}
// //             <Link to="/register" className="text-indigo-600 hover:underline">
// //               Create account
// //             </Link>
// //           </p>
// //         </div>
// //       </div>

// //       {/* Forgot Password Modal */}
// //       <Modal
// //         open={forgotOpen}
// //         title="Reset your password"
// //         onClose={closeForgot}
// //         footer={
// //           <>
// //             <button type="button" onClick={closeForgot} className="px-3 py-1.5 border rounded-md" disabled={sending}>
// //               Close
// //             </button>
// //             <button
// //               type="button"
// //               onClick={sendResetLink}
// //               className={`px-3 py-1.5 rounded-md text-white ${sending ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"}`}
// //               disabled={sending}
// //             >
// //               {sending ? "Sending…" : "Send reset link"}
// //             </button>
// //           </>
// //         }
// //       >
// //         <div className="space-y-3">
// //           <p className="text-sm text-slate-600">
// //             Enter your account email and we will send you a password reset link.
// //           </p>
// //           <div>
// //             <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
// //             <input
// //               type="email"
// //               placeholder="you@example.com"
// //               className={`w-full p-2.5 rounded-lg border ${sendErr ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
// //               value={forgotEmail}
// //               onChange={(e) => setForgotEmail(e.target.value)}
// //             />
// //             {sendErr && <p className="text-red-600 text-sm mt-1">{sendErr}</p>}
// //             {sentMsg && (
// //               <div className="mt-2 inline-flex items-center gap-2 text-green-700">
// //                 <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
// //                   <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
// //                 </svg>
// //                 <span className="text-sm">{sentMsg}</span>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </Modal>
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginUser } from "../../services/authservices/authService";
// // //import { useAuth } from "../../context/AuthContext";

// // import { http } from "../../services/http";
// // import Modal from "../../common/Modal";
// // import { useDispatch } from "react-redux";
// // import { setCredentials } from "../store/authSlice";

// // const dispatch = useDispatch();
// // // Normalize role variants
// // function normalizeRole(roleRaw) {
// //   const r = String(roleRaw || "").trim().toLowerCase();
// //   const normalized = r.replaceAll("_", "-");
// //   if (normalized === "opsadmin") return "ops-admin";
// //   return normalized;
// // }

// // // Role → Path Map
// // const ROLE_TO_PATH = {
// //   user: "/dashboard/user",
// //   merchant: "/dashboard/merchant",
// //   admin: "/dashboard/admin",
// //   risk: "/dashboard/risk",
// //   ops: "/dashboard/ops",
// //   "ops-admin": "/dashboard/ops-admin",
// // };

// // const initial = { email: "", password: "", role: "" };

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const { login } = useAuth();

// //   const [data, setData] = useState(initial);
// //   const [errors, setErrors] = useState({});
// //   const [submitting, setSubmitting] = useState(false);

// //   // Forgot password modal
// //   const [forgotOpen, setForgotOpen] = useState(false);
// //   const [forgotEmail, setForgotEmail] = useState("");
// //   const [sending, setSending] = useState(false);
// //   const [sentMsg, setSentMsg] = useState("");
// //   const [sendErr, setSendErr] = useState("");

// //   // Validation
// //   const validate = () => {
// //     const e = {};
// //     if (!data.email) e.email = "Email is required.";
// //     else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

// //     if (!data.password) e.password = "Password is required.";
// //     else if (data.password.length < 6) e.password = "Minimum 6 characters.";

// //     if (!data.role) e.role = "Role is required.";

// //     return e;
// //   };

// //   const handleChange = (ev) => {
// //     const { name, value } = ev.target;
// //     setData((p) => ({ ...p, [name]: value }));
// //     setErrors((p) => ({ ...p, [name]: "" }));
// //   };

// //   const handleSubmit = async (ev) => {
// //     ev.preventDefault();
// //     const e = validate();
// //     setErrors(e);
// //     if (Object.keys(e).length) return;

// //     try {
// //       setSubmitting(true);

// //       const res = await loginUser({
// //         email: data.email,
// //         password: data.password,
// //         role: data.role,
// //       });

// //       // 🔥 Backend failure (but status = 200)
// //       if (!res.data.isSuccess) {
// //         alert(res.data.message || "Invalid credentials!");
// //         return;
// //       }

// //       // 🔥 Correct backend token field
// //       const token = res.data.token;
// //       if (!token) {
// //         alert("Token missing from server response.");
// //         return;
// //       }

// //       // Backend user login does NOT send role → Use selected role
// //       const finalRole = data.role;

// //       // Save auth state
// //       login(token, finalRole);

// //       const path = ROLE_TO_PATH[normalizeRole(finalRole)] || "/dashboard";
// //       navigate(path);
// //     } catch (err) {
// //       const msg =
// //         err?.response?.data?.message ||
// //         err?.response?.data?.title ||
// //         "Login failed!";
// //       alert(msg);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // Forgot password modal helpers
// //   const openForgot = () => {
// //     setSendErr("");
// //     setSentMsg("");
// //     setForgotEmail(data.email || "");
// //     setForgotOpen(true);
// //   };

// //   const closeForgot = () => {
// //     if (sending) return;
// //     setForgotOpen(false);
// //   };

// //   const isValidEmail = (v) =>
// //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());

// //   const sendResetLink = async () => {
// //     const email = (forgotEmail || "").trim();
// //     setSendErr("");
// //     setSentMsg("");

// //     if (!isValidEmail(email)) {
// //       setSendErr("Please enter a valid email address.");
// //       return;
// //     }

// //     try {
// //       setSending(true);
// //       await http.post("/api/AuthMail/send-reset-link", { email });
// //       setSentMsg(
// //         "If this email is registered, a password reset link has been sent."
// //       );
// //     } catch (e) {
// //       const msg =
// //         e?.response?.data?.message ||
// //         e?.response?.data ||
// //         e?.message ||
// //         "Failed to send reset link.";
// //       setSendErr(String(msg));
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
// //       <div className="w-full max-w-md">
// //         <div className="bg-white rounded-xl shadow border p-6 sm:p-8">
// //           <div className="flex flex-col items-center">
// //             <h1 className="text-2xl font-semibold text-slate-900">
// //               Welcome Back
// //             </h1>
// //             <p className="text-sm text-slate-500 mt-1">
// //               Sign in to your PaySphere account
// //             </p>
// //           </div>

// //           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-1">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="you@example.com"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.email ? "border-red-500" : "border-slate-300"
// //                 }`}
// //                 value={data.email}
// //                 onChange={handleChange}
// //               />
// //               {errors.email && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.email}</p>
// //               )}
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <div className="flex items-center justify-between">
// //                 <label className="block text-sm font-medium">Password</label>
// //                 <button
// //                   type="button"
// //                   onClick={openForgot}
// //                   className="text-sm text-indigo-600"
// //                 >
// //                   Forgot password?
// //                 </button>
// //               </div>
// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="••••••••"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.password ? "border-red-500" : "border-slate-300"
// //                 }`}
// //                 value={data.password}
// //                 onChange={handleChange}
// //               />
// //               {errors.password && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.password}</p>
// //               )}
// //             </div>

// //             {/* Role */}
// //             <div>
// //               <label className="block text-sm font-medium">Login As</label>
// //               <select
// //                 name="role"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.role ? "border-red-500" : "border-slate-300"
// //                 }`}
// //                 value={data.role}
// //                 onChange={handleChange}
// //               >
// //                 <option value="">Select Role</option>
// //                 <option value="User">User</option>
// //                 <option value="Merchant">Merchant</option>
// //                 <option value="Admin">Admin</option>
// //                 <option value="Risk">Risk</option>
// //                 <option value="Ops">Ops</option>
// //               </select>
// //               {errors.role && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.role}</p>
// //               )}
// //             </div>

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={submitting}
// //               className="w-full rounded-lg bg-indigo-600 text-white py-2.5"
// //             >
// //               {submitting ? "Signing in..." : "Sign In"}
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Forgot Password Modal */}
// //       <Modal
// //         open={forgotOpen}
// //         title="Reset your password"
// //         onClose={closeForgot}
// //         footer={
// //           <>
// //             <button
// //               type="button"
// //               onClick={closeForgot}
// //               className="px-3 py-1.5 border rounded-md"
// //               disabled={sending}
// //             >
// //               Close
// //             </button>
// //             <button
// //               type="button"
// //               onClick={sendResetLink}
// //               className={`px-3 py-1.5 rounded-md text-white ${
// //                 sending ? "bg-gray-400" : "bg-indigo-600"
// //               }`}
// //               disabled={sending}
// //             >
// //               {sending ? "Sending…" : "Send reset link"}
// //             </button>
// //           </>
// //         }
// //       >
// //         <p className="text-sm text-slate-600">
// //           Enter your account email and we will send you a password reset link.
// //         </p>

// //         <input
// //           type="email"
// //           placeholder="you@example.com"
// //           className={`w-full p-2.5 rounded-lg border ${
// //             sendErr ? "border-red-500" : "border-slate-300"
// //           }`}
// //           value={forgotEmail}
// //           onChange={(e) => setForgotEmail(e.target.value)}
// //         />

// //         {sendErr && <p className="text-red-600 text-sm mt-1">{sendErr}</p>}

// //         {sentMsg && (
// //           <p className="text-green-600 text-sm mt-2">{sentMsg}</p>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // }

// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginUser } from "../../services/authservices/authService";
// // import Modal from "../../common/Modal";
// // import { useDispatch } from "react-redux";
// // import { setCredentials } from "../../stores/authSlice";

// // // Normalize role string
// // function normalizeRole(roleRaw) {
// //   const r = String(roleRaw || "").trim().toLowerCase();
// //   const normalized = r.replaceAll("_", "-");
// //   if (normalized === "opsadmin") return "ops-admin";
// //   return normalized;
// // }

// // // Map role → route
// // const ROLE_TO_PATH = {
// //   user: "/dashboard/user",
// //   merchant: "/dashboard/merchant",
// //   admin: "/dashboard/admin",
// //   risk: "/dashboard/risk",
// //   ops: "/dashboard/ops",
// //   "ops-admin": "/dashboard/ops-admin",
// // };

// // const initial = { email: "", password: "", role: "" };

// // export default function Login() {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [data, setData] = useState(initial);
// //   const [errors, setErrors] = useState({});
// //   const [submitting, setSubmitting] = useState(false);

// //   // Forgot password modal
// //   const [forgotOpen, setForgotOpen] = useState(false);
// //   const [forgotEmail, setForgotEmail] = useState("");
// //   const [sending, setSending] = useState(false);
// //   const [sentMsg, setSentMsg] = useState("");
// //   const [sendErr, setSendErr] = useState("");

// //   // Validate input
// //   const validate = () => {
// //     const e = {};
// //     if (!data.email) e.email = "Email is required.";
// //     else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

// //     if (!data.password) e.password = "Password is required.";
// //     else if (data.password.length < 6) e.password = "Minimum 6 characters.";

// //     if (!data.role) e.role = "Role is required.";

// //     return e;
// //   };

// //   const handleChange = (ev) => {
// //     const { name, value } = ev.target;
// //     setData((p) => ({ ...p, [name]: value }));
// //     setErrors((p) => ({ ...p, [name]: "" }));
// //   };

// //   // Submit login
// //   const handleSubmit = async (ev) => {
// //     ev.preventDefault();

// //     const e = validate();
// //     setErrors(e);
// //     if (Object.keys(e).length) return;

// //     try {
// //       setSubmitting(true);

// //       const res = await loginUser({
// //         email: data.email,
// //         password: data.password,
// //         role: data.role,
// //       });

// //       // Backend validation
// //       if (!res.data?.accessToken) {
// //         alert(res.data?.message || "Invalid login.");
// //         return;
// //       }

// //       // Save to Redux
// //       dispatch(
// //         setCredentials({
// //           accessToken: res.data.accessToken,
// //           role: data.role,
// //         })
// //       );

// //       // Route by role
// //       const path = ROLE_TO_PATH[normalizeRole(data.role)] || "/dashboard";
// //       navigate(path);

// //     } catch (err) {
// //       const msg =
// //         err?.response?.data?.message ||
// //         err?.response?.data?.title ||
// //         "Login failed!";
// //       alert(msg);
// //     } finally {
// //       setSubmitting(false);
// //     }
// //   };

// //   // Forgot password modal
// //   const openForgot = () => {
// //     setSendErr("");
// //     setSentMsg("");
// //     setForgotEmail(data.email || "");
// //     setForgotOpen(true);
// //   };

// //   const closeForgot = () => {
// //     if (!sending) setForgotOpen(false);
// //   };

// //   const isValidEmail = (v) =>
// //     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());

// //   const sendResetLink = async () => {
// //     const email = (forgotEmail || "").trim();

// //     setSendErr("");
// //     setSentMsg("");

// //     if (!isValidEmail(email)) {
// //       setSendErr("Please enter a valid email address.");
// //       return;
// //     }

// //     try {
// //       setSending(true);
// //       await http.post("/api/AuthMail/send-reset-link", { email });
// //       setSentMsg("If this email is registered, a reset link has been sent.");
// //     } catch (e) {
// //       const msg =
// //         e?.response?.data?.message ||
// //         e?.response?.data ||
// //         e?.message ||
// //         "Failed to send reset link.";
// //       setSendErr(String(msg));
// //     } finally {
// //       setSending(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
// //       <div className="w-full max-w-md">
// //         <div className="bg-white rounded-xl shadow border p-6 sm:p-8">
// //           <div className="flex flex-col items-center">
// //             <h1 className="text-2xl font-semibold text-slate-900">Welcome Back</h1>
// //             <p className="text-sm text-slate-500 mt-1">
// //               Sign in to your PaySphere account
// //             </p>
// //           </div>

// //           <form onSubmit={handleSubmit} className="mt-6 space-y-4">

// //             {/* Email */}
// //             <div>
// //               <label className="block text-sm font-medium text-slate-700 mb-1">
// //                 Email
// //               </label>
// //               <input
// //                 type="email"
// //                 name="email"
// //                 placeholder="you@example.com"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.email ? "border-red-500" : "border-slate-300"
// //                 }`}
// //                 value={data.email}
// //                 onChange={handleChange}
// //               />
// //               {errors.email && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.email}</p>
// //               )}
// //             </div>

// //             {/* Password */}
// //             <div>
// //               <div className="flex items-center justify-between">
// //                 <label className="block text-sm font-medium">Password</label>
// //                 <button
// //                   type="button"
// //                   onClick={openForgot}
// //                   className="text-sm text-indigo-600"
// //                 >
// //                   Forgot password?
// //                 </button>
// //               </div>

// //               <input
// //                 type="password"
// //                 name="password"
// //                 placeholder="••••••••"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.password ? "border-red-500" : "border-slate-300"
// //                 }`}
// //                 value={data.password}
// //                 onChange={handleChange}
// //               />

// //               {errors.password && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.password}</p>
// //               )}
// //             </div>

// //             {/* Role */}
// //             <div>
// //               <label className="block text-sm font-medium">Login As</label>
// //               <select
// //                 name="role"
// //                 className={`w-full p-2.5 rounded-lg border ${
// //                   errors.role ? "border-red-500" : "border-slate-300"
// //                 }`}
// //                 value={data.role}
// //                 onChange={handleChange}
// //               >
// //                 <option value="">Select Role</option>
// //                 <option value="User">User</option>
// //                 <option value="Merchant">Merchant</option>
// //                 <option value="Admin">Admin</option>
// //                 <option value="Risk">Risk</option>
// //                 <option value="Ops">Ops</option>
// //               </select>

// //               {errors.role && (
// //                 <p className="text-red-600 text-sm mt-1">{errors.role}</p>
// //               )}
// //             </div>

// //             {/* Submit */}
// //             <button
// //               type="submit"
// //               disabled={submitting}
// //               className="w-full rounded-lg bg-indigo-600 text-white py-2.5"
// //             >
// //               {submitting ? "Signing in..." : "Sign In"}
// //             </button>
// //           </form>
// //         </div>
// //       </div>

// //       {/* Forgot Password Modal */}
// //       <Modal
// //         open={forgotOpen}
// //         title="Reset your password"
// //         onClose={closeForgot}
// //         footer={
// //           <>
// //             <button
// //               type="button"
// //               onClick={closeForgot}
// //               className="px-3 py-1.5 border rounded-md"
// //               disabled={sending}
// //             >
// //               Close
// //             </button>
// //             <button
// //               type="button"
// //               onClick={sendResetLink}
// //               className={`px-3 py-1.5 rounded-md text-white ${
// //                 sending ? "bg-gray-400" : "bg-indigo-600"
// //               }`}
// //               disabled={sending}
// //             >
// //               {sending ? "Sending…" : "Send reset link"}
// //             </button>
// //           </>
// //         }
// //       >
// //         <p className="text-sm text-slate-600">
// //           Enter your account email and we will send you a password reset link.
// //         </p>

// //         <input
// //           type="email"
// //           placeholder="you@example.com"
// //           className={`w-full p-2.5 rounded-lg border ${
// //             sendErr ? "border-red-500" : "border-slate-300"
// //           }`}
// //           value={forgotEmail}
// //           onChange={(e) => setForgotEmail(e.target.value)}
// //         />

// //         {sendErr && <p className="text-red-600 text-sm mt-1">{sendErr}</p>}
// //         {sentMsg && (
// //           <p className="text-green-600 text-sm mt-2">{sentMsg}</p>
// //         )}
// //       </Modal>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../../services/authservices/authService";
// import Modal from "../../common/Modal";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../stores/authSlice";

// // Normalize role string
// function normalizeRole(roleRaw) {
//   const r = String(roleRaw || "")
//     .trim()
//     .toLowerCase();
//   const normalized = r.replaceAll("_", "-");
//   if (normalized === "opsadmin") return "ops-admin";
//   return normalized;
// }

// // Map role → route
// const ROLE_TO_PATH = {
//   user: "/dashboard/user",
//   merchant: "/dashboard/merchant",
//   admin: "/dashboard/admin",
//   risk: "/dashboard/risk",
//   ops: "/dashboard/ops",
//   "ops-admin": "/dashboard/ops-admin",
// };

// const initial = { email: "", password: "", role: "" };

// export default function Login() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [data, setData] = useState(initial);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   // Forgot password modal
//   const [forgotOpen, setForgotOpen] = useState(false);
//   const [forgotEmail, setForgotEmail] = useState("");
//   const [sending, setSending] = useState(false);
//   const [sentMsg, setSentMsg] = useState("");
//   const [sendErr, setSendErr] = useState("");

//   // Validate input
//   const validate = () => {
//     const e = {};
//     if (!data.email) e.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(data.email))
//       e.email = "Invalid email address.";

//     if (!data.password) e.password = "Password is required.";
//     else if (data.password.length < 6) e.password = "Minimum 6 characters.";

//     if (!data.role) e.role = "Role is required.";

//     return e;
//   };

//   const handleChange = (ev) => {
//     const { name, value } = ev.target;
//     setData((p) => ({ ...p, [name]: value }));
//     setErrors((p) => ({ ...p, [name]: "" }));
//   };

//   // Submit login
//   const handleSubmit = async (ev) => {
//     ev.preventDefault();

//     const e = validate();
//     setErrors(e);
//     if (Object.keys(e).length) return;

//     try {
//       setSubmitting(true);

//       const res = await loginUser({
//         email: data.email,
//         password: data.password,
//         //role:"",
//         role: data.role,
//       });

//       // let roleToSend = data.role;

//       // if (roleToSend === "") {
//       //   // Try Merchant login when the user selects nothing
//       //   roleToSend = "Merchant";
//       // }

   
//       const res = await loginUser({
//         email: data.email,
//         password: data.password,
//         role: roleToSend,
//       });

//       // Backend validation
//       // if (!res.data?.accessToken) {
//       //   alert(res.data?.message || "Invalid login.");
//       //   return;
//       // }

//       const accessToken = res.data.accessToken || res.data.token;

//       if (!accessToken) {
//         alert("Invalid login.");
//         return;
//       }

//       const backendRole = normalizeRole(res.data.role);
//       //const selectedRole = normalizeRole(data.role);
//       const selectedRole = normalizeRole(roleToSend);
//       if (backendRole !== selectedRole) {
//         alert(`Role mismatch! You cannot login as ${data.role}.`);
//         return;
//       }

//       // if (
//       //   normalizeRole(res.data.role) !== normalizeRole(data.role)
//       // ) {
//       //   alert(`Role mismatch! Backend says: ${res.data.role}`);
//       //   return;
//       // }

//       // Save to Redux
//       dispatch(
//         setCredentials({
//           accessToken,
//           // accessToken: res.data.accessToken,
//           role: res.data.role,
//         }),
//       );

//       // Route by role
//       const path = ROLE_TO_PATH[normalizeRole(data.role)] || "/dashboard";
//       navigate(path);
//     } catch (err) {
//       const msg =
//         err?.response?.data?.message ||
//         err?.response?.data?.title ||
//         "Login failed!";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // Forgot password modal
//   const openForgot = () => {
//     setSendErr("");
//     setSentMsg("");
//     setForgotEmail(data.email || "");
//     setForgotOpen(true);
//   };

//   const closeForgot = () => {
//     if (!sending) setForgotOpen(false);
//   };

//   const isValidEmail = (v) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());

//   const sendResetLink = async () => {
//     const email = (forgotEmail || "").trim();

//     setSendErr("");
//     setSentMsg("");

//     if (!isValidEmail(email)) {
//       setSendErr("Please enter a valid email address.");
//       return;
//     }

//     try {
//       setSending(true);
//       await http.post("/api/AuthMail/send-reset-link", { email });
//       setSentMsg("If this email is registered, a reset link has been sent.");
//     } catch (e) {
//       const msg =
//         e?.response?.data?.message ||
//         e?.response?.data ||
//         e?.message ||
//         "Failed to send reset link.";
//       setSendErr(String(msg));
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow border p-6 sm:p-8">
//           <div className="flex flex-col items-center">
//             <h1 className="text-2xl font-semibold text-slate-900">
//               Welcome Back
//             </h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Sign in to your PaySphere account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.email ? "border-red-500" : "border-slate-300"
//                 }`}
//                 value={data.email}
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <div className="flex items-center justify-between">
//                 <label className="block text-sm font-medium">Password</label>
//                 <button
//                   type="button"
//                   onClick={openForgot}
//                   className="text-sm text-indigo-600"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.password ? "border-red-500" : "border-slate-300"
//                 }`}
//                 value={data.password}
//                 onChange={handleChange}
//               />

//               {errors.password && (
//                 <p className="text-red-600 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-sm font-medium">Login As</label>
//               <select
//                 name="role"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.role ? "border-red-500" : "border-slate-300"
//                 }`}
//                 value={data.role}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Role</option>
//                 <option value="User">User</option>
//                 <option value="Merchant">Merchant</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Risk">Risk</option>
//                 <option value="Ops">Ops</option>
//               </select>

//               {errors.role && (
//                 <p className="text-red-600 text-sm mt-1">{errors.role}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full rounded-lg bg-indigo-600 text-white py-2.5"
//             >
//               {submitting ? "Signing in..." : "Sign In"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       <Modal
//         open={forgotOpen}
//         title="Reset your password"
//         onClose={closeForgot}
//         footer={
//           <>
//             <button
//               type="button"
//               onClick={closeForgot}
//               className="px-3 py-1.5 border rounded-md"
//               disabled={sending}
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               onClick={sendResetLink}
//               className={`px-3 py-1.5 rounded-md text-white ${
//                 sending ? "bg-gray-400" : "bg-indigo-600"
//               }`}
//               disabled={sending}
//             >
//               {sending ? "Sending…" : "Send reset link"}
//             </button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">
//           Enter your account email and we will send you a password reset link.
//         </p>

//         <input
//           type="email"
//           placeholder="you@example.com"
//           className={`w-full p-2.5 rounded-lg border ${
//             sendErr ? "border-red-500" : "border-slate-300"
//           }`}
//           value={forgotEmail}
//           onChange={(e) => setForgotEmail(e.target.value)}
//         />

//         {sendErr && <p className="text-red-600 text-sm mt-1">{sendErr}</p>}
//         {sentMsg && <p className="text-green-600 text-sm mt-2">{sentMsg}</p>}
//       </Modal>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authservices/authService";
import Modal from "../../common/Modal";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../stores/authSlice";

// Normalize role string
function normalizeRole(roleRaw) {
  const r = String(roleRaw || "").trim().toLowerCase();
  const normalized = r.replaceAll("_", "-");
  if (normalized === "opsadmin") return "ops-admin";
  return normalized;
}

// Map role → route
const ROLE_TO_PATH = {
  user: "/dashboard/user",
  merchant: "/dashboard/merchant",
  admin: "/dashboard/admin",
  risk: "/dashboard/risk",
  ops: "/dashboard/ops",
  "ops-admin": "/dashboard/ops-admin",
};

const initial = { email: "", password: "", role: "" };

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Forgot password modal
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sentMsg, setSentMsg] = useState("");
  const [sendErr, setSendErr] = useState("");

  // Validate input
  const validate = () => {
    const e = {};
    if (!data.email) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

    if (!data.password) e.password = "Password is required.";
    else if (data.password.length < 6) e.password = "Minimum 6 characters.";

    if (!data.role) e.role = "Role is required.";

    return e;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setData((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  // Submit login
  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setSubmitting(true);

      const res = await loginUser({
        email: data.email,
        password: data.password,
        role: data.role,
      });

      const accessToken = res.data.accessToken;
      // Backend validation
      if (!accessToken) {
        alert(res.data?.message || "Invalid login.");
        return;
      }

      const backendRole = normalizeRole(res.data.role);
      const selectedRole = normalizeRole(data.role);

      if (backendRole !== selectedRole) {
        alert(`Role mismatch! You cannot login as ${data.role}.`);
        return;
      }


      // Save to Redux
      dispatch(
        setCredentials({
          accessToken: accessToken,
          role:  backendRole ,
        })
      );

      // Route by role
      const path = ROLE_TO_PATH[backendRole] || "/dashboard";
      navigate(path);

    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.title ||
        "Login failed!";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

  // Forgot password modal
  const openForgot = () => {
    setSendErr("");
    setSentMsg("");
    setForgotEmail(data.email || "");
    setForgotOpen(true);
  };

  const closeForgot = () => {
    if (!sending) setForgotOpen(false);
  };

  const isValidEmail = (v) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((v || "").trim());

  const sendResetLink = async () => {
    const email = (forgotEmail || "").trim();

    setSendErr("");
    setSentMsg("");

    if (!isValidEmail(email)) {
      setSendErr("Please enter a valid email address.");
      return;
    }

    try {
      setSending(true);
      await http.post("/api/AuthMail/send-reset-link", { email });
      setSentMsg("If this email is registered, a reset link has been sent.");
    } catch (e) {
      const msg =
        e?.response?.data?.message ||
        e?.response?.data ||
        e?.message ||
        "Failed to send reset link.";
      setSendErr(String(msg));
    } finally {
      setSending(false);
    }
  };

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow border p-6 sm:p-8">
//           <div className="flex flex-col items-center">
//             <h1 className="text-2xl font-semibold text-slate-900">Welcome Back</h1>
//             <p className="text-sm text-slate-500 mt-1">
//               Sign in to your PaySphere account
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">

//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-1">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.email ? "border-red-500" : "border-slate-300"
//                 }`}
//                 value={data.email}
//                 onChange={handleChange}
//               />
//               {errors.email && (
//                 <p className="text-red-600 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <div className="flex items-center justify-between">
//                 <label className="block text-sm font-medium">Password</label>
//                 <button
//                   type="button"
//                   onClick={openForgot}
//                   className="text-sm text-indigo-600"
//                 >
//                   Forgot password?
//                 </button>
//               </div>

//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.password ? "border-red-500" : "border-slate-300"
//                 }`}
//                 value={data.password}
//                 onChange={handleChange}
//               />

//               {errors.password && (
//                 <p className="text-red-600 text-sm mt-1">{errors.password}</p>
//               )}
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-sm font-medium">Login As</label>
//               <select
//                 name="role"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.role ? "border-red-500" : "border-slate-300"
//                 }`}
//                 value={data.role}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Role</option>
//                 <option value="User">User</option>
//                 <option value="Merchant">Merchant</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Risk">Risk</option>
//                 <option value="Ops">Ops</option>
//               </select>

//               {errors.role && (
//                 <p className="text-red-600 text-sm mt-1">{errors.role}</p>
//               )}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full rounded-lg bg-indigo-600 text-white py-2.5"
//             >
//               {submitting ? "Signing in..." : "Sign In"}
//             </button>
//           </form>
//         </div>
//       </div>

//       {/* Forgot Password Modal */}
//       <Modal
//         open={forgotOpen}
//         title="Reset your password"
//         onClose={closeForgot}
//         footer={
//           <>
//             <button
//               type="button"
//               onClick={closeForgot}
//               className="px-3 py-1.5 border rounded-md"
//               disabled={sending}
//             >
//               Close
//             </button>
//             <button
//               type="button"
//               onClick={sendResetLink}
//               className={`px-3 py-1.5 rounded-md text-white ${
//                 sending ? "bg-gray-400" : "bg-indigo-600"
//               }`}
//               disabled={sending}
//             >
//               {sending ? "Sending…" : "Send reset link"}
//             </button>
//           </>
//         }
//       >
//         <p className="text-sm text-slate-600">
//           Enter your account email and we will send you a password reset link.
//         </p>

//         <input
//           type="email"
//           placeholder="you@example.com"
//           className={`w-full p-2.5 rounded-lg border ${
//             sendErr ? "border-red-500" : "border-slate-300"
//           }`}
//           value={forgotEmail}
//           onChange={(e) => setForgotEmail(e.target.value)}
//         />

//         {sendErr && <p className="text-red-600 text-sm mt-1">{sendErr}</p>}
//         {sentMsg && (
//           <p className="text-green-600 text-sm mt-2">{sentMsg}</p>
//         )}
//       </Modal>
//     </div>
//   );

  return (
  <div className="min-h-screen w-full 
      bg-gradient-to-br from-[#071a3d] via-[#063025] to-[#020a33]
      flex items-center justify-center px-4">

    <div className="w-full max-w-sm text-white">

      {/* TITLE */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-wide">Login</h1>
        <p className="text-sm text-gray-300 mt-2">Sign in to continue.</p>
      </div>

      {/* LOGIN FORM */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* EMAIL */}
        <div>
          <label className="text-xs font-medium tracking-wide text-gray-300">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className={`
              w-full mt-2 p-3 rounded-xl bg-gray-200/30 text-white 
              placeholder-gray-300 outline-none transition
              focus:bg-gray-200/40
              ${errors.email ? "border border-red-400" : "border-none"}
            `}
            value={data.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium tracking-wide text-gray-300">
              Password
            </label>

            <button
              type="button"
              onClick={openForgot}
              className="text-xs text-purple-300 hover:text-white transition"
            >
              Forgot password?
            </button>
          </div>

          <input
            type="password"
            name="password"
            placeholder="••••••••"
            className={`
              w-full mt-2 p-3 rounded-xl bg-gray-200/30 text-white 
              placeholder-gray-300 outline-none transition
              focus:bg-gray-200/40
              ${errors.password ? "border border-red-400" : "border-none"}
            `}
            value={data.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="text-xs font-medium tracking-wide text-gray-300">
            Login As
          </label>

          <select
            name="role"
            className={`
              w-full mt-2 p-3 rounded-xl bg-gray-200/30 text-white outline-none 
              focus:bg-gray-200/40
              ${errors.role ? "border border-red-400" : "border-none"}
            `}
            value={data.role}
            onChange={handleChange}
          >
            <option value="" className="text-black">Select Role</option>
            <option value="User" className="text-black">User</option>
            <option value="Merchant" className="text-black">Merchant</option>
            <option value="Admin" className="text-black">Admin</option>
            <option value="Risk" className="text-black">Risk</option>
            <option value="Ops" className="text-black">Ops</option>
          </select>

          {errors.role && (
            <p className="text-red-400 text-xs mt-1">{errors.role}</p>
          )}
        </div>

        {/* SIGN IN BUTTON */}
        <button
          type="submit"
          disabled={submitting}
          className="
            w-full py-3 rounded-xl 
            bg-gradient-to-r from-purple-500 to-blue-600
            hover:scale-[1.02] transition duration-200 
            text-white font-semibold shadow-lg disabled:opacity-50
          "
        >
          {submitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>

    {/* Forgot Password Modal (same logic, new style) */}
    <Modal
      open={forgotOpen}
      title="Reset your password"
      onClose={closeForgot}
      footer={
        <>
          <button
            onClick={closeForgot}
            className="px-3 py-1.5 border border-white/30 rounded-md text-white bg-white/10 backdrop-blur-md"
            disabled={sending}
          >
            Close
          </button>
          <button
            onClick={sendResetLink}
            className={`px-3 py-1.5 rounded-md text-white 
            ${sending ? "bg-gray-400" : "bg-indigo-600"}`}
            disabled={sending}
          >
            {sending ? "Sending…" : "Send reset link"}
          </button>
        </>
      }
    >
      <p className="text-sm text-gray-200 mb-3">
        Enter your account email and we will send a reset link.
      </p>

      <input
        type="email"
        className={`w-full p-2.5 rounded-lg bg-white/10 text-white 
          backdrop-blur-lg outline-none ${
          sendErr ? "border border-red-400" : "border border-white/20"
        }`}
        value={forgotEmail}
        onChange={(e) => setForgotEmail(e.target.value)}
      />

      {sendErr && <p className="text-red-400 text-sm mt-1">{sendErr}</p>}
      {sentMsg && <p className="text-green-400 text-sm mt-1">{sentMsg}</p>}
    </Modal>
  </div>
);
}
