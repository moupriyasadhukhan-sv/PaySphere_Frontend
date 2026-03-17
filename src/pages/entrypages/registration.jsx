// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "../../services/authservices/authService";

// // Keep strings EXACTLY as your backend expects
// const MERCHANT_CATEGORIES = [
//   "Airline",
//   "Supermarket",
//   "Restaurants",
//   "Service Stations",
//   "Resorts",
//   "Specialty Retail Stores",
// ];

// const initial = {
//   name: "",
//   email: "",
//   password: "",
//   phone: "",
//   role: "",
//   category: "",
// };

// export default function Register() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState(initial);
//   const [errors, setErrors] = useState({});
//   const [submitting, setSubmitting] = useState(false);

//   const validate = () => {
//     const e = {};
//     if (!formData.name) e.name = "Full name is required.";
//     if (!formData.email) e.email = "Email is required.";
//     else if (!/^\S+@\S+\.\S+$/.test(formData.email)) e.email = "Invalid email.";
//     if (!formData.password) e.password = "Password is required.";
//     else if (formData.password.length < 6) e.password = "Minimum 6 characters.";
//     if (!formData.phone) e.phone = "Phone is required.";
//     else if (!/^\d{7,15}$/.test(formData.phone)) e.phone = "Phone must be 7–15 digits.";
//     if (!formData.role) e.role = "Role is required.";
//     if (formData.role === "Merchant" && !formData.category) e.category = "Select a category.";
//     return e;
//   };

//   const handleChange = (ev) => {
//     const { name, value } = ev.target;
//     if (name === "role") {
//       setFormData((prev) => ({
//         ...prev,
//         role: value,
//         category: value === "Merchant" ? prev.category : "",
//       }));
//       setErrors((p) => ({ ...p, role: "", category: "" }));
//       return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((p) => ({ ...p, [name]: "" }));
//   };

//   const handleSubmit = async (ev) => {
//     ev.preventDefault();
//     const e = validate();
//     setErrors(e);
//     if (Object.keys(e).length) return;

//     try {
//       setSubmitting(true);
//       await registerUser(formData);
//       alert("Registration Successful!");
//       navigate("/login");
//     } catch (error) {
//       const msg =
//         error?.response?.data?.message ||
//         error?.response?.data?.title ||
//         "Registration failed. Please check inputs.";
//       alert(msg);
//     } finally {
//       setSubmitting(false);
//     }
//   };

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
// }




import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../../services/authservices/authService";

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
  confirmPassword: "", // front-end only
  role: "",
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
    if (!formData.confirmPassword) e.confirmPassword = "Please confirm your password.";
    else if (formData.confirmPassword !== formData.password) e.confirmPassword = "Passwords do not match.";
    if (!formData.role) e.role = "Role is required.";
    return e;
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;
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
      // Backend accepts ONLY: name, email, password, role
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
      await registerUser(payload);
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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow border border-slate-200 p-6 sm:p-8">
          <div className="flex flex-col items-center">
            <div className="h-12 w-12 rounded-full bg-indigo-600/10 text-indigo-600 flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c.943 0 1.833.333 2.53.94A3.5 3.5 0 1112 11z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 21a7.5 7.5 0 10-15 0h15z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">Create Your Account</h1>
            <p className="text-sm text-slate-500 mt-1">Join PaySphere and start managing your payments</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                className={`w-full p-2.5 rounded-lg border ${errors.name ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                className={`w-full p-2.5 rounded-lg border ${errors.email ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                className={`w-full p-2.5 rounded-lg border ${errors.password ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                className={`w-full p-2.5 rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Type</label>
              <select
                name="role"
                className={`w-full p-2.5 rounded-lg border bg-white ${errors.role ? "border-red-500" : "border-slate-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="User">User</option>
                <option value="Merchant">Merchant</option>
              </select>
              {errors.role && <p className="text-red-600 text-sm mt-1">{errors.role}</p>}
            </div>
            
              {formData.role === "Merchant" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  className={`w-full p-2.5 rounded-lg border bg-white ${errors.category ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {MERCHANT_CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
              </div>
            )}


            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center rounded-lg bg-indigo-600 text-white font-medium py-2.5 hover:bg-indigo-700 transition disabled:opacity-60"
            >
              {submitting ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}