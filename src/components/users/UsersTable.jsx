// src/components/users/UsersTable.jsx
import { useEffect, useState } from "react";
import http from "../../services/http";
import { useNavigate } from "react-router-dom";
const PAGE_SIZE = 50;

// simple concurrency limiter
async function mapLimit(items, limit, fn) {
  const res = new Array(items.length);
  let idx = 0;
  let act = 0;
  return new Promise((resolve) => {
    const next = () => {
      if (idx >= items.length && act === 0) return resolve(res);
      while (act < limit && idx < items.length) {
        const i = idx++;
        act++;
        Promise.resolve(fn(items[i], i))
          .then((v) => (res[i] = v))
          .catch(() => (res[i] = null))
          .finally(() => {
            act--;
            next();
          });
      }
    };
    next();
  });
}

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    http
      .get("/api/Users", { params: { role: "User", page, pageSize: PAGE_SIZE } })
      .then(async (res) => {
        if (!mounted) return;
        const payload = res?.data;
        const users = Array.isArray(payload?.data) ? payload.data : [];
        setTotal(payload?.total ?? users.length);
        setTotalPages(payload?.totalPages ?? 1);

        const merged = await mapLimit(users, 6, async (u) => {
          const userId = u.userId ?? u.UserID ?? u.userID;
          try {
            const w = await http.get("/api/Wallets", { params: { userId } });
            const wd = Array.isArray(w?.data?.data) ? w.data.data[0] : (w?.data?.data ?? w?.data);
            return {
              userId,
              name: u.name,
              status: wd?.status ?? "Active",
              balance: wd?.balance ?? 0,
            };
          } catch {
            return { userId, name: u.name, status: "—", balance: 0 };
          }
        });

        setRows(merged);
      })
      .catch((e) => {
        console.error(e);
        setRows([]);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [page]);

  const currency = (n) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n || 0);

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">User Management</h2>
        <p className="text-sm text-gray-500">View and manage all registered users</p>
      </div>

      <div className="overflow-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Balance</th>
              <th className="px-4 py-3">Create Limit</th>
              <th className="px-4 py-3">Show Limit</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-gray-500">
                  Loading users…
                </td>
              </tr>
            )}
            {!loading && rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
            {!loading &&
              rows.map((r) => (
                <tr key={r.userId} className="border-t">
                  <td className="px-4 py-3">{r.userId}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-medium">{r.name}</span>
                      
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                        (r.status || "").toLowerCase() === "active"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{currency(r.balance)}</td>
                  <td className="px-4 py-3">

                    <button
                        onClick={() => navigate(`/limits/create?userId=${encodeURIComponent(r.userId)}`)}
                        className="px-3 py-1.5 rounded-md text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                        Create Limit
                    </button>
                  </td>

                  <td className="px-4 py-3">

                    <button
                        onClick={() => navigate(`/limits/${encodeURIComponent(r.userId)}`)}
                        className="px-3 py-1.5 rounded-md text-white bg-emerald-500 hover:bg-emerald-600 shadow-sm
                                focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    >
                        Show Limit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pager */}
      <div className="flex items-center justify-end gap-3 mt-3">
        <button
          className="px-3 py-1.5 border rounded-md disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {page} / {totalPages} &nbsp;•&nbsp; Showing {rows.length} of {total}
        </span>
        <button
          className="px-3 py-1.5 border rounded-md disabled:opacity-50"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}