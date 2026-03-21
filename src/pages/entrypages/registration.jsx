import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authservices/authService";

// Keep strings EXACTLY as your backend expects
const MERCHANT_CATEGORIES = [
  "Airline",
  "Supermarket",
  "Restaurants",
  "Service Stations",
  "Resorts",
  "Specialty Retail Stores",
];

const initial = {
  name: "",
  email: "",
  password: "",
  phone: "",
  role: "",
  category: "",
};

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.name) e.name = "Full name is required.";
    if (!formData.email) e.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Invalid email.";
    if (!formData.password) e.password = "Password is required.";
    else if (formData.password.length < 6) e.password = "Minimum 6 characters.";
    if (!formData.phone) e.phone = "Phone is required.";
    else if (!/^\d{7,15}$/.test(formData.phone)) e.phone = "Phone must be 7–15 digits.";
    if (!formData.role) e.role = "Role is required.";
    if (formData.role === "Merchant" && !formData.category) e.category = "Select a category.";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    if (name === "role") {
      setFormData((prev) => ({
        ...prev,
        role: value,
        category: value === "Merchant" ? prev.category : "",
      }));
      setErrors((p) => ({ ...p, role: "", category: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    try {
      setSubmitting(true);
      await registerUser(formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.title ||
        "Registration failed. Please check inputs.";
      alert(msg);
    } finally {
      setSubmitting(false);
    }
  };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
//       <div className="w-full max-w-md">
//         <div className="bg-white rounded-xl shadow border border-gray-100 p-6 sm:p-8">
//           <div className="flex flex-col items-center">
//             <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-3">
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.943 0 1.833.333 2.53.94A3.5 3.5 0 1112 11z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21a7.5 7.5 0 10-15 0h15z" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-semibold">Create Account</h1>
//             <p className="text-sm text-gray-500 mt-1">Register for a new PaySphere account</p>
//           </div>

//           <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="John Doe"
//                 className={`w-full p-2.5 rounded-lg border ${errors.name ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={formData.name}
//                 onChange={handleChange}
//               />
//               {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="you@example.com"
//                 className={`w-full p-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={formData.email}
//                 onChange={handleChange}
//               />
//               {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Create a password"
//                 className={`w-full p-2.5 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Retype password"
//                 className={`w-full p-2.5 rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//               />
//               {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
//               <input
//                 type="text"
//                 name="phone"
//                 placeholder="9876543210"
//                 className={`w-full p-2.5 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={formData.phone}
//                 onChange={handleChange}
//               />
//               {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
//               <select
//                 name="role"
//                 className={`w-full p-2.5 rounded-lg border bg-white ${errors.role ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                 value={formData.role}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Role</option>
//                 <option value="User">User</option>
//                 <option value="Merchant">Merchant</option>
//               </select>
//               {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
//             </div>

//             {formData.role === "Merchant" && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
//                 <select
//                   name="category"
//                   className={`w-full p-2.5 rounded-lg border bg-white ${errors.category ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
//                   value={formData.category}
//                   onChange={handleChange}
//                 >
//                   <option value="">Select Category</option>
//                   {MERCHANT_CATEGORIES.map((c) => (
//                     <option key={c} value={c}>{c}</option>
//                   ))}
//                 </select>
//                 {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={submitting}
//               className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
//             >
//               {submitting ? "Creating..." : "Create Account"}
//             </button>
//           </form>

//           <p className="text-center text-sm text-gray-600 mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-indigo-600 hover:underline">Sign In</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
    return (
  <div
    className="min-h-screen w-full 
    bg-gradient-to-br from-[#071a3d] via-[#063025] to-[#020a33]
    flex items-center justify-center px-4 overflow-hidden"
  >
    <div className="w-full max-w-xs text-white"> 
      {/* TITLE */}
      <div className="text-center mb-5">
        <h1 className="text-2xl font-bold tracking-wide">Create Account</h1>
        <p className="text-xs text-gray-300 mt-1">
          Register for a new PaySphere account
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">

        {/* FULL NAME */}
        <div>
          <label className="text-[11px] font-medium text-gray-300">Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            className={`
              w-full mt-1 p-2 rounded-lg
              bg-gray-200/30 text-white placeholder-gray-300
              outline-none focus:bg-gray-200/40
              ${errors.name ? "border border-red-400" : "border-none"}
            `}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-400 text-[11px]">{errors.name}</p>}
        </div>

        {/* EMAIL */}
        <div>
          <label className="text-[11px] font-medium text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            className={`
              w-full mt-1 p-2 rounded-lg 
              bg-gray-200/30 text-white placeholder-gray-300
              outline-none focus:bg-gray-200/40
              ${errors.email ? "border border-red-400" : "border-none"}
            `}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-400 text-[11px]">{errors.email}</p>}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="text-[11px] font-medium text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className={`
              w-full mt-1 p-2 rounded-lg 
              bg-gray-200/30 text-white placeholder-gray-300
              outline-none focus:bg-gray-200/40
              ${errors.password ? "border border-red-400" : "border-none"}
            `}
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-400 text-[11px]">{errors.password}</p>
          )}
        </div>

        {/* CONFIRM PASSWORD */}
        <div>
          <label className="text-[11px] font-medium text-gray-300">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Retype password"
            className={`
              w-full mt-1 p-2 rounded-lg 
              bg-gray-200/30 text-white placeholder-gray-300
              outline-none focus:bg-gray-200/40
              ${errors.confirmPassword ? "border border-red-400" : "border-none"}
            `}
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-[11px]">{errors.confirmPassword}</p>
          )}
        </div>

        {/* PHONE */}
        <div>
          <label className="text-[11px] font-medium text-gray-300">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="9876543210"
            className={`
              w-full mt-1 p-2 rounded-lg 
              bg-gray-200/30 text-white placeholder-gray-300
              outline-none focus:bg-gray-200/40
              ${errors.phone ? "border border-red-400" : "border-none"}
            `}
            value={formData.phone}
            onChange={handleChange}
          />
          {errors.phone && (
            <p className="text-red-400 text-[11px]">{errors.phone}</p>
          )}
        </div>

        {/* ROLE */}
        <div>
          <label className="text-[11px] font-medium text-gray-300">Account Type</label>
          <select
            name="role"
            className={`
              w-full mt-1 p-2 rounded-lg 
              bg-gray-200/30 text-white outline-none
              focus:bg-gray-200/40
              ${errors.role ? "border border-red-400" : "border-none"}
            `}
            value={formData.role}
            onChange={handleChange}
          >
            <option value="" className="text-black">Select Role</option>
            <option value="User" className="text-black">User</option>
            <option value="Merchant" className="text-black">Merchant</option>
          </select>

          {errors.role && (
            <p className="text-red-400 text-[11px]">{errors.role}</p>
          )}
        </div>

        {/* CATEGORY */}
        {formData.role === "Merchant" && (
          <div>
            <label className="text-[11px] font-medium text-gray-300">Category</label>
            <select
              name="category"
              className={`
                w-full mt-1 p-2 rounded-lg bg-gray-200/30 text-white 
                outline-none focus:bg-gray-200/40
                ${errors.category ? "border border-red-400" : "border-none"}
              `}
              value={formData.category}
              onChange={handleChange}
            >
              <option value="" className="text-black">Select Category</option>
              {MERCHANT_CATEGORIES.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className="text-red-400 text-[11px]">{errors.category}</p>
            )}
          </div>
        )}

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={submitting}
          className="
            w-full py-2 rounded-lg 
            bg-gradient-to-r from-purple-500 to-blue-600
            hover:scale-[1.02] transition duration-200
            text-white text-sm font-semibold shadow-lg disabled:opacity-50
          "
        >
          {submitting ? "Creating…" : "Create Account"}
        </button>
      </form>

      <p className="text-center text-gray-300 text-xs mt-3">
        Already have an account?{" "}
        <Link to="/login" className="text-purple-300 hover:text-white">
          Sign In
        </Link>
      </p>

    </div>
  </div>
);
}




// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { loginUser } from "../../services/authservices/authService";
// import Modal from "../../common/Modal";
// import { useDispatch } from "react-redux";
// import { setCredentials } from "../../stores/authSlice";

// // Normalize role string
// function normalizeRole(roleRaw) {
//   const r = String(roleRaw || "").trim().toLowerCase();
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

// const initial = { email: "", password: "", role: "" ,phone: ""};

// export default function Registration() {
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
//     else if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = "Invalid email address.";

//     if (!data.password) e.password = "Password is required.";
//     else if (data.password.length < 6) e.password = "Minimum 6 characters.";

    
//     if (!data.phone) e.phone = "Phone number is required.";
//     else if (!/^\d{10}$/.test(data.phone))e.phone = "Phone number must be exactly 10 digits.";


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

      
//       const res = await registerUser({
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         role: data.role,
//         phone: data.phone,
//       });


//       // Backend validation
//       if (!res.data?.accessToken) {
//         alert(res.data?.message || "Invalid login.");
//         return;
//       }

//       const backendRole = normalizeRole(res.data.role);
//       const selectedRole = normalizeRole(data.role);

//       if (backendRole !== selectedRole) {
//         alert(`Role mismatch! You cannot login as ${data.role}.`);
//         return;
//       }


//       // Save to Redux
//       dispatch(
//         setCredentials({
//           accessToken: res.data.accessToken,
//           role:  res.data.role,
//         })
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
            
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Phone Number
//               </label>

//               <input
//                 type="text"
//                 name="phone"
//                 maxLength="10"
//                 placeholder="Enter phone"
//                 value={data.phone}
//                 onChange={handleChange}
//                 className="w-full p-2 border rounded"
//               />
            
//                 {errors.phone && (
//                 <p className="text-red-600 text-sm">{errors.phone}</p>
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
// }