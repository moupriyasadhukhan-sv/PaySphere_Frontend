// src/components/merchants/MerchantsTable.jsx
import { useEffect, useMemo, useState } from "react";
import http from "../../services/http";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 50;

export default function MerchantsTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    http
      .get("/api/Merchant")
      .then((res) => {
        const items = Array.isArray(res?.data?.data) ? res.data.data : [];
        if (mounted) setData(items);
      })
      .catch(console.error)
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);

  const current = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, pageSafe]);

  return (
    <div>
      <div className="mb-3">
        <h2 className="text-lg font-semibold">Merchants</h2>
        <p className="text-sm text-gray-500">View and manage merchant accounts</p>
      </div>

      <div className="overflow-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">Merchant ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Transactions</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-gray-500">
                  Loading merchants…
                </td>
              </tr>
            )}
            {!loading && current.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-gray-500">
                  No merchants found.
                </td>
              </tr>
            )}
            {!loading &&
              current.map((m) => {
                const id = m.merchantId ?? m.merchantID ?? m.MerchantId;
                return (
                  <tr key={id} className="border-t">
                    <td className="px-4 py-3">{id}</td>
                    <td className="px-4 py-3">{m.name}</td>
                    <td className="px-4 py-3">{m.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                          (m.status || "").toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {m.status ?? "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3">—{/* fill once you expose an endpoint */}</td>
                    <td className="px-4 py-3">
                      <button
                        className="border rounded-md px-3 py-1 hover:bg-gray-50"
                        onClick={() => {
                          // If you have a route, navigate:
                          // navigate(`/settlement/${id}`);
                          alert(`Check Settlement for Merchant ${id} (placeholder)`);
                        }}
                      >
                        Check Settlement
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* Pager */}
      <div className="flex items-center justify-end gap-3 mt-3">
        <button
          className="px-3 py-1.5 border rounded-md disabled:opacity-50"
          disabled={pageSafe === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </button>
        <span className="text-sm text-gray-600">
          Page {pageSafe} / {totalPages} &nbsp;•&nbsp; Showing {current.length} of {total}
        </span>
        <button
          className="px-3 py-1.5 border rounded-md disabled:opacity-50"
          disabled={pageSafe === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </button>
      </div>
    </div>
  );
}