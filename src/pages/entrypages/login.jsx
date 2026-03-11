// // // src/pages/entrypages/login.jsx
// // import { useState } from "react";
// // import { useNavigate, Link } from "react-router-dom";
// // import { loginUser } from "../../services/authservices/authService";
// // import { useAuth } from "../../context/AuthContext";

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
// //       const res = await loginUser(data);
// //       const token = res?.data?.token;
// //       const roleFromApi = res?.data?.role || data.role;

// //       if (!token) {
// //         alert("Login succeeded but token missing from response.");
// //         return;
// //       }

// //       login(token, roleFromApi);
// //       navigate("/dashboard");
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
// //                 <option value="User">User</option>
// //                 <option value="Merchant">Merchant</option>
// //               </select>
// //               {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
// //             </div>

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


// // src/pages/entrypages/login.jsx
// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../../services/authservices/authService";
// import { useAuth } from "../../context/AuthContext";

// // Helper to normalize role variants from backend
// function normalizeRole(roleRaw) {
//   const r = String(roleRaw || "").trim().toLowerCase();
//   const normalized = r.replaceAll("_", "-"); // ops_admin -> ops-admin
//   if (normalized === "opsadmin") return "ops-admin";
//   return normalized;
// }

// // Map normalized role -> route
// const ROLE_TO_PATH = {
//   "user": "/dashboard/user",
//   "merchant": "/dashboard/merchant",
//   "admin": "/dashboard/admin",
//   "risk": "/dashboard/risk",
//   "ops": "/dashboard/ops",
//   "ops-admin": "/dashboard/ops-admin",
// };

// const initial = { email: "", password: "", role: "" };

// export default function Login() {
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const [data, setData] = useState(initial);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const validate = () => {
//     const e = {};
//     if (!data.email) e.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

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

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     const e = validate();
//     setErrors(e);
//     if (Object.keys(e).length) return;

//     try {
//       setSubmitting(true);

//       // Backend expects: { email, password, role }
//       const res = await loginUser({
//         email: data.email,
//         password: data.password,
//         role: data.role, // keep values EXACT (User, Merchant, Admin, Risk, Ops, Ops-Admin)
//       });

//       // Adjust these keys if your API uses different names
//       const token = res?.data?.token;
//       const roleFromApi = res?.data?.role;

//       if (!token) {
//         alert("Login succeeded but token missing from response.");
//         return;
//       }

//       // Prefer role from API/JWT; fallback to what user selected
//       const finalRole = roleFromApi || data.role;

//       // Save in memory (AuthContext)
//       login(token, finalRole);

//       // Normalize & redirect
//       const path = ROLE_TO_PATH[normalizeRole(finalRole)] || "/dashboard";
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

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         {/* Card */}
//         <div className="bg-white rounded-xl shadow border border-gray-100 p-6 sm:p-8">
//           {/* Icon / Title */}
//           <div className="flex flex-col items-center">
//             <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-3">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 strokeWidth={2}
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0-7a7 7 0 100-14 7 7 0 000 14z" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-semibold">Login</h1>
//             <p className="text-sm text-gray-500 mt-1">Sign in to your PaySphere account</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             {/* Email */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.email ? "border-red-500" : "border-gray-300"
//                 } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={data.email}
//                 onChange={handleChange}
//               />
//               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="••••••••"
//                 className={`w-full p-2.5 rounded-lg border ${
//                   errors.password ? "border-red-500" : "border-gray-300"
//                 } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={data.password}
//                 onChange={handleChange}
//               />
//               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
//             </div>

//             {/* Role */}
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
//               <select
//                 name="role"
//                 className={`w-full p-2.5 rounded-lg border bg-white ${
//                   errors.role ? "border-red-500" : "border-gray-300"
//                 } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={data.role}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Role</option>
//                 {/* Values must match backend exactly */}
//                 <option value="User">User</option>
//                 <option value="Merchant">Merchant</option>
//                 <option value="Admin">Admin</option>
//                 <option value="Risk">Risk</option>
//                 <option value="Ops">Ops</option>
                
//               </select>
//               {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
//             >
//               {submitting ? "Signing in..." : "Login"}
//             </button>
//           </form>

//           {/* Footer */}
//           <p className="text-center text-sm text-gray-600 mt-4">
//             Don&apos;t have an account?{" "}
//             <Link to="/register" className="text-indigo-600 hover:underline">
//               Create one
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../services/authservices/authService";
import { useAuth } from "../../context/AuthContext";

// Normalize backend role variants (e.g., Ops_Admin -> ops-admin)
function normalizeRole(roleRaw) {
  const r = String(roleRaw || "").trim().toLowerCase();
  const normalized = r.replaceAll("_", "-");
  if (normalized === "opsadmin") return "ops-admin";
  return normalized;
}

const ROLE_TO_PATH = {
  "user": "/dashboard/user",
  "merchant": "/dashboard/merchant",
  "admin": "/dashboard/admin",
  "risk": "/dashboard/risk",
  "ops": "/dashboard/ops",
  "ops-admin": "/dashboard/ops-admin", // shared page (Admin or Ops will both be allowed in route)
};

const initial = { email: "", password: "", role: "" };

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
        role: data.role, // must match backend values exactly
      });

      const token = res?.data?.token;
      const roleFromApi = res?.data?.role; // if backend returns role

      if (!token) {
        alert("Login succeeded but token missing from response.");
        return;
      }

      const finalRole = roleFromApi || data.role;
      login(token, finalRole);

      const path = ROLE_TO_PATH[normalizeRole(finalRole)] || "/dashboard";
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14v7m0-7a7 7 0 100-14 7 7 0 000 14z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">Login</h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your PaySphere account</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className={`w-full p-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={data.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className={`w-full p-2.5 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={data.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                className={`w-full p-2.5 rounded-lg border bg-white ${errors.role ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={data.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                {/* Values must match backend exactly */}
                <option value="User">User</option>
                <option value="Merchant">Merchant</option>
                <option value="Admin">Admin</option>
                <option value="Risk">Risk</option>
                <option value="Ops">Ops</option>
                <option value="Ops-Admin">Ops-Admin</option>
              </select>
              {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {submitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}