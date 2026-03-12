// src/pages/Dashboards/RegisterStaff.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import http from "../../services/http"; // your axios instance

const ROLES = ["Ops", "Risk"]; // adjust if needed

export default function RegisterStaff() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Ops",
    phone: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      // POST /api/Auth/Admin-register
      await http.post("/api/Auth/Admin-register", form);
      // success -> go back to old-scheme dashboard path
      //navigate("/dashboard/admin", { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        err?.response?.data?.title ||
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed.";
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-xl mx-auto bg-white border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Register Staff</h1>
          <Link to="/dashboard/admin" className="text-indigo-600 hover:underline text-sm">
            ← Back to Dashboard
          </Link>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm text-gray-700 mb-1">Name *</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="user@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={onChange}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Role *</label>
              <select
                name="role"
                value={form.role}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
                required
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Phone</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="7098474984"
              />
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {submitting ? "Registering…" : "Register Staff"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}