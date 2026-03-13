import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../services/http";

export default function ShowLimit() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    http.get("/api/limits", { params: { userId } })
      .then((res) => {
        if (!mounted) return;
        const data = res?.data?.data;
        const first = Array.isArray(data) ? data[0] : data;
        setLimit(first ?? null);
      })
      .catch((e) => {
        console.error(e);
        setError("Failed to fetch limits");
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, [userId]);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Limits</h2>
        <div className="flex gap-2">
          <button
            onClick={() => navigate(`/limits/create?userId=${encodeURIComponent(userId)}`)}
            className="px-3 py-1.5 rounded-md text-white bg-emerald-500 hover:bg-emerald-600"
          >
            Create / Update Limit
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-3 py-1.5 rounded-md border hover:bg-slate-50"
          >
            Back
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4">
        {loading && <p className="text-slate-600">Loading…</p>}
        {!loading && error && <p className="text-red-500">{error}</p>}
        {!loading && !error && !limit && <p className="text-slate-600">No limit found for user {userId}.</p>}
        {!loading && !error && limit && (
          <div className="space-y-2">
            <div><span className="font-medium">User ID:</span> {limit.userID ?? userId}</div>
            <div><span className="font-medium">Daily Limit:</span> {limit.dailyLimit}</div>
            <div><span className="font-medium">Monthly Limit:</span> {limit.monthlyLimit}</div>
          </div>
        )}
      </div>
    </div>
  );
}