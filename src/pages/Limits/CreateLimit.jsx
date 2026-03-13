import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import http from "../../services/http";

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

export default function CreateLimit() {
  const navigate = useNavigate();
  const q = useQuery();
  const initialUserId = q.get("userId") || "";

  const [form, setForm] = useState({
    userID: initialUserId,
    dailyLimit: "",
    monthlyLimit: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm((f) => ({ ...f, userID: initialUserId }));
  }, [initialUserId]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const payload = {
        userID: Number(form.userID),
        dailyLimit: Number(form.dailyLimit || 0),
        monthlyLimit: Number(form.monthlyLimit || 0),
      };
      await http.post("/api/limits", payload); // <-- DB update happens here

      navigate(`/limits/${encodeURIComponent(form.userID)}`, { replace: true });
      // or: navigate("/dashboard/admin"); // if you want to go straight back to dashboard
    } catch (err) {
      console.error(err);
      setError("Failed to create limit.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Create Limit</h2>
        <button onClick={() => navigate(-1)} className="px-3 py-1.5 rounded-md border hover:bg-slate-50">
          Back
        </button>
      </div>

      <form onSubmit={onSubmit} className="rounded-lg border bg-white p-4 max-w-lg space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}

        <div>
          <label className="block text-sm font-medium mb-1">User ID</label>
          <input
            type="number"
            name="userID"
            value={form.userID}
            onChange={onChange}
            className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Daily Limit</label>
            <input
              type="number"
              name="dailyLimit"
              value={form.dailyLimit}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              placeholder="e.g., 100000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Monthly Limit</label>
            <input
              type="number"
              name="monthlyLimit"
              value={form.monthlyLimit}
              onChange={onChange}
              className="w-full rounded-md border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
              placeholder="e.g., 1000000000"
            />
          </div>
        </div>

        <div className="pt-2">
          <button type="submit" disabled={submitting}
                  className="px-4 py-2 rounded-md text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60">
            {submitting ? "Saving..." : "Create Limit"}
          </button>
        </div>
      </form>
    </div>
  );
}