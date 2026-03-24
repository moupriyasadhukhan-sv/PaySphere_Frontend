import { useEffect, useMemo, useState, useCallback } from "react";
import { api } from "../../services/http";
import { useNavigate } from "react-router-dom";
import ConfirmDialog from "../../common/ConfirmDialog";

const PAGE_SIZE = 2;

export default function MerchantsTable() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Delete",
    cancelText: "Cancel",
  });

  const navigate = useNavigate();

  const getMerchantId = useCallback(
    (m) => m.merchantId ?? m.merchantID ?? m.MerchantId ?? m.id ?? m.ID ?? m.Id,
    []
  );

  // Load table
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    api
      .get("/api/Merchant")
      .then((res) => {
        const items = Array.isArray(res?.data?.data) ? res.data.data : [];
        if (mounted) setData(items);
      })
      .catch((e) => {
        console.error(e);
        if (mounted) setError("Failed to load merchants.");
      })
      .finally(() => mounted && setLoading(false));

    return () => { mounted = false; };
  }, []);

  // Pagination
  const total = data.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);
  const current = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  }, [data, pageSafe]);

  const canPrev = useMemo(() => !loading && pageSafe > 1, [loading, pageSafe]);
  const canNext = useMemo(() => !loading && pageSafe < totalPages, [loading, pageSafe, totalPages]);
  const gotoPrev = () => canPrev && setPage((p) => Math.max(1, p - 1));
  const gotoNext = () => canNext && setPage((p) => Math.min(totalPages, p + 1));
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);

  // ✅ Navigate to the nested settlements page
  const goToSettlement = (merchantId) =>
    navigate(`/dashboard/admin/settlements/merchant/${merchantId}`);

  
  const createSettlement=(merchantId)=> navigate(`/dashboard/admin/settlements/create/${merchantId}`)


  const openConfirm = ({ title, message, onConfirm, confirmText = "Delete", cancelText = "Cancel" }) => {
    setConfirmConfig({ title, message, onConfirm, confirmText, cancelText });
    setConfirmOpen(true);
  };
  const closeConfirm = () => {
    if (confirming) return;
    setConfirmOpen(false);
    setConfirmConfig({ title: "", message: "", onConfirm: null, confirmText: "Delete", cancelText: "Cancel" });
  };

  const deleteMerchant = async (merchantId) => {
    if (merchantId == null) throw new Error("merchantId is missing");
    const url = `/api/Merchant/${merchantId}`;
    console.debug("DELETE Merchant URL:", url, "ID Type:", typeof merchantId);
    await api.delete(url);
  };

  // 👇 columns: removed Create Settlement (so -1)
  const HEAD_COLS = 7;

//  
  return (
  <div className="space-y-3">

    {/* Header */}
    <div className="mb-1">
      <h2 className="text-lg font-semibold text-white">Merchants</h2>
      <p className="text-sm text-slate-300">View and manage merchant accounts</p>
    </div>

    {/* Table */}
    <div className="overflow-auto border border-white/10 rounded-xl bg-white/5 backdrop-blur-lg">
      <table className="min-w-full text-sm text-slate-200">
        <thead className="bg-white/10 text-slate-100">
          <tr className="text-left">
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Check Settlement</th>
            <th className="px-4 py-3">Create Settlement</th>
            <th className="px-4 py-3">Delete Merchant</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={HEAD_COLS} className="px-4 py-6 text-slate-400">
                Loading merchants…
              </td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={HEAD_COLS} className="px-4 py-6 text-rose-400">
                {error}
              </td>
            </tr>
          )}

          {!loading && !error && current.length === 0 && (
            <tr>
              <td colSpan={HEAD_COLS} className="px-4 py-6 text-slate-400">
                No merchants found.
              </td>
            </tr>
          )}

          {!loading &&
            !error &&
            current.map((m) => {
              const id = getMerchantId(m);
              const status = (m.status || "").toLowerCase();
              const isActive = status === "active";

              return (
                <tr
                  key={id}
                  className="border-t border-white/10 hover:bg-white/10 transition"
                >
                  <td className="px-4 py-3 whitespace-nowrap">{id}</td>
                  <td className="px-4 py-3">{m.name ?? "—"}</td>

                  <td className="px-4 py-3">
                    <span className="block truncate max-w-[240px]" title={m.email}>
                      {m.email ?? "—"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                        isActive
                          ? "bg-green-500/20 text-green-300"
                          : "bg-slate-500/20 text-slate-300"
                      }`}
                    >
                      {m.status ?? "—"}
                    </span>
                  </td>

                  {/* Check Settlement */}
                  <td className="px-4 py-3">
                    <button
                      className="px-3 py-1.5 rounded-md 
                                 text-white bg-blue-600 
                                 hover:bg-blue-700 
                                 shadow-[0_0_10px_rgba(59,130,246,0.4)]
                                 hover:shadow-[0_0_15px_rgba(59,130,246,0.7)]
                                 active:scale-95 transition"
                      type="button"
                      onClick={() => goToSettlement(id)}
                    >
                      Check Settlement
                    </button>
                  </td>


                  <td className="px-4 py-3">
                      <button
                        className="px-3 py-1.5 rounded-md 
                                  text-white bg-emerald-600 
                                  hover:bg-emerald-700 
                                  shadow-[0_0_10px_rgba(16,185,129,0.4)]
                                  hover:shadow-[0_0_15px_rgba(16,185,129,0.7)]
                                  active:scale-95 transition"
                        type="button"
                        onClick={() => createSettlement(id)}
                      >
                        Create Settlement
                      </button>
                  </td>

                  {/* Delete Merchant */}
                  <td className="px-4 py-3">
                    <button
                      className="
                      px-3 py-1.5 rounded-md text-white 
                        bg-rose-700 hover:bg-rose-800 
                        active:scale-95 transition"
                      type="button"
                      onClick={() =>
                        openConfirm({
                          title: "Delete Merchant",
                          message: (
                            <div>
                              This action cannot be undone. Delete{" "}
                              <strong>Merchant {id}</strong>?
                            </div>
                          ),
                          
                          onConfirm: async () => {
                            console.log("Delete ID:", id);
                            await deleteMerchant(id);
                            setData((prev) =>
                              prev.filter((x) => getMerchantId(x) !== id)
                            );
                          },
                          confirmText: "Delete",
                          cancelText: "Cancel",
                        })
                      }
                      title="Delete merchant"
                    >
                      Delete Merchat
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>

    {/* Pager */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <span className="text-sm text-slate-300">
        Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} /{" "}
        {totalPages}
      </span>

      <div className="flex items-center gap-3">
        <button
          className="px-3 py-1.5 rounded-md text-white 
                     border border-white/20 bg-white/10 
                     hover:bg-white/20 
                     shadow-[0_0_10px_rgba(255,255,255,0.15)]
                     hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                     disabled:opacity-40 active:scale-95 transition"
          disabled={!canPrev}
          onClick={gotoPrev}
        >
          Previous
        </button>

        <button
          className="px-3 py-1.5 rounded-md text-white 
                     border border-white/20 bg-white/10 
                     hover:bg-white/20 
                     shadow-[0_0_10px_rgba(255,255,255,0.15)]
                     hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]
                     disabled:opacity-40 active:scale-95 transition"
          disabled={!canNext}
          onClick={gotoNext}
        >
          Next
        </button>
      </div>
    </div>
    <ConfirmDialog
  open={confirmOpen}
  title={confirmConfig.title}
  message={confirmConfig.message}
  confirmText={confirmConfig.confirmText}
  cancelText={confirmConfig.cancelText}
  confirming={confirming}

  onCancel={() => {
    if (!confirming) setConfirmOpen(false);
  }}

  onConfirm={async () => {
    try {
      setConfirming(true);
      if (confirmConfig.onConfirm) {
        await confirmConfig.onConfirm();
      }
    } finally {
      setConfirming(false);
      setConfirmOpen(false);
    }
  }}
/>
  </div>
);
}