// // src/pages/MerchantSettlements.jsx
// import { useEffect, useMemo, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { http } from "../services/http"; // adjust path if needed
// import ConfirmDialog from "../common/ConfirmDialog"; // adjust path if needed

// export default function MerchantSettlements() {
//   const { merchantId } = useParams();
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);  // settlements list
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // confirm dialog state
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [confirmConfig, setConfirmConfig] = useState({
//     title: "",
//     message: "",
//     onConfirm: null,
//     confirmText: "Confirm",
//     cancelText: "Cancel",
//   });

//   const openConfirm = ({ title, message, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
//     setConfirmConfig({ title, message, onConfirm, confirmText, cancelText });
//     setConfirmOpen(true);
//   };
//   const closeConfirm = () => {
//     if (confirming) return;
//     setConfirmOpen(false);
//     setConfirmConfig({ title: "", message: "", onConfirm: null, confirmText: "Confirm", cancelText: "Cancel" });
//   };

//   // Load settlements for merchant
//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");

//     const url = `/api/Settlement/merchant/${merchantId}`;
//     console.debug("GET settlements:", url);

//     http.get(url)
//       .then((res) => {
//         // expecting { success, message, data: [ ... ] }
//         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
//         if (mounted) setData(items);
//       })
//       .catch((e) => {
//         console.error(e);
//         if (mounted) setError("Failed to load settlements.");
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => { mounted = false; };
//   }, [merchantId]);

//   const handleDelete = async (settlementId) => {
//     const url = `/api/Settlement/${settlementId}`;
//     console.debug("DELETE settlement:", url);
//     await http.delete(url);
//     // optimistically update list
//     setData((prev) => prev.filter((s) => String(s.settlementId ?? s.id) !== String(settlementId)));
//   };

//   const handleUpdateStatus = async (settlementId, newStatus) => {
//     const url = `/api/Settlement/${settlementId}`;
//     console.debug("PUT settlement:", url, "payload:", { status: newStatus });
//     await http.put(url, { status: newStatus });
//     // update local state
//     setData((prev) =>
//       prev.map((s) => (String(s.settlementId ?? s.id) === String(settlementId) ? { ...s, status: newStatus } : s))
//     );
//   };

//   const statusOptions = ["Pending", "Settled", "Cancelled"];

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold">Merchant {merchantId} — Settlements</h2>
//           <p className="text-sm text-gray-500">View, update, or delete settlements for this merchant</p>
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="border rounded-md px-3 py-1" onClick={() => navigate(-1)} type="button">Back</button>
//           <button className="border rounded-md px-3 py-1" onClick={() => navigate(`/settlement/${merchantId}/create`)} type="button">
//             Create Settlement
//           </button>
//         </div>
//       </div>

//       <div className="overflow-auto border rounded-xl">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="px-4 py-3">Settlement ID</th>
//               <th className="px-4 py-3">Period</th>
//               <th className="px-4 py-3">Amount</th>
//               <th className="px-4 py-3">Settled Date</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr><td colSpan={6} className="px-4 py-6 text-gray-500">Loading settlements…</td></tr>
//             )}
//             {!loading && error && (
//               <tr><td colSpan={6} className="px-4 py-6 text-red-600">{error}</td></tr>
//             )}
//             {!loading && !error && data.length === 0 && (
//               <tr><td colSpan={6} className="px-4 py-6 text-gray-500">No settlements found.</td></tr>
//             )}

//             {!loading && !error && data.map((s) => {
//               const sid = s.settlementId ?? s.id;
//               return (
//                 <tr key={sid} className="border-t">
//                   <td className="px-4 py-3 whitespace-nowrap">{sid}</td>
//                   <td className="px-4 py-3">{s.period ?? "—"}</td>
//                   <td className="px-4 py-3">{s.amount ?? "—"}</td>
//                   <td className="px-4 py-3">{s.settledDate ?? "—"}</td>
//                   <td className="px-4 py-3">
//                     <select
//                       className="border rounded-md px-2 py-1"
//                       value={s.status ?? "Pending"}
//                       onChange={(e) => {
//                         const newStatus = e.target.value;
//                         openConfirm({
//                           title: "Update Status",
//                           message: <div>Change status of <strong>Settlement {sid}</strong> to <strong>{newStatus}</strong>?</div>,
//                           confirmText: "Update",
//                           onConfirm: async () => await handleUpdateStatus(sid, newStatus),
//                         });
//                       }}
//                     >
//                       {statusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
//                     </select>
//                   </td>
//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
//                       type="button"
//                       onClick={() =>
//                         openConfirm({
//                           title: "Delete Settlement",
//                           message: <div>Do you want to delete <strong>Settlement {sid}</strong>?</div>,
//                           confirmText: "Delete",
//                           onConfirm: async () => await handleDelete(sid),
//                         })
//                       }
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       <ConfirmDialog
//         open={confirmOpen}
//         title={confirmConfig.title}
//         message={confirmConfig.message}
//         confirmText={confirmConfig.confirmText}
//         cancelText={confirmConfig.cancelText}
//         confirming={confirming}
//         onCancel={closeConfirm}
//         onConfirm={async () => {
//           try {
//             setConfirming(true);
//             await confirmConfig.onConfirm?.();
//             setConfirmOpen(false);
//           } finally {
//             setConfirming(false);
//           }
//         }}
//       />
//     </div>
//   );
// }


// src/pages/MerchantSettlements.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../services/http";           // adjust if your path differs
import ConfirmDialog from "../../common/ConfirmDialog"; // adjust if needed

export default function MerchantSettlements() {
  const { merchantId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([]);   // settlements
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // confirm dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [confirmConfig, setConfirmConfig] = useState({
    title: "",
    message: "",
    onConfirm: null,
    confirmText: "Confirm",
    cancelText: "Cancel",
  });

  const openConfirm = ({ title, message, onConfirm, confirmText = "Confirm", cancelText = "Cancel" }) => {
    setConfirmConfig({ title, message, onConfirm, confirmText, cancelText });
    setConfirmOpen(true);
  };
  const closeConfirm = () => {
    if (confirming) return;
    setConfirmOpen(false);
    setConfirmConfig({ title: "", message: "", onConfirm: null, confirmText: "Confirm", cancelText: "Cancel" });
  };

  // Load settlements for merchant
  const fetchSettlements = async () => {
    setLoading(true);
    setError("");
    try {
      const url = `/api/Settlement/merchant/${merchantId}`;
      console.debug("GET settlements:", url);
      const res = await api.get(url);
      const items = Array.isArray(res?.data?.data) ? res.data.data : [];
      setData(items);
    } catch (e) {
      console.error(e);
      setError("Failed to load settlements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettlements();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [merchantId]);

  const handleDelete = async (settlementId) => {
    const url = `/api/Settlement/${settlementId}`;
    console.debug("DELETE settlement:", url);
    await api.delete(url);
    setData((prev) => prev.filter((s) => String(s.settlementId ?? s.id) !== String(settlementId)));
  };

  const handleUpdateStatus = async (settlementId, newStatus) => {
    const url = `/api/Settlement/${settlementId}`;
    console.debug("PUT settlement:", url, "payload:", { status: newStatus });
    await api.put(url, { status: newStatus });
    setData((prev) =>
      prev.map((s) => (String(s.settlementId ?? s.id) === String(settlementId) ? { ...s, status: newStatus } : s))
    );
  };

  const statusOptions = ["Pending", "Settled"];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Merchant {merchantId} — Settlements</h2>
          <p className="text-sm text-gray-500">View, update, or delete settlements for this merchant</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="border rounded-md px-3 py-1" onClick={() => navigate(-1)} type="button">Back</button>
        </div>
      </div>

      <div className="overflow-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">Settlement ID</th>
              <th className="px-4 py-3">Period</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Settled Date</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={6} className="px-4 py-6 text-gray-500">Loading settlements…</td></tr>
            )}
            {!loading && error && (
              <tr><td colSpan={6} className="px-4 py-6 text-red-600">{error}</td></tr>
            )}
            {!loading && !error && data.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-6 text-gray-500">No settlements found.</td></tr>
            )}

            {!loading && !error && data.map((s) => {
              const sid = s.settlementId ?? s.id;
              return (
                <tr key={sid} className="border-t">
                  <td className="px-4 py-3 whitespace-nowrap">{sid}</td>
                  <td className="px-4 py-3">{s.period ?? "—"}</td>
                  <td className="px-4 py-3">{s.amount ?? "—"}</td>
                  <td className="px-4 py-3">{s.settledDate ?? "—"}</td>
                  <td className="px-4 py-3">
                    <select
                      className="border rounded-md px-2 py-1"
                      value={s.status ?? "Pending"}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        openConfirm({
                          title: "Update Status",
                          message: <div>Change status of <strong>Settlement {sid}</strong> to <strong>{newStatus}</strong>?</div>,
                          confirmText: "Update",
                          onConfirm: async () => await handleUpdateStatus(sid, newStatus),
                        });
                      }}
                    >
                      {statusOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                  <td className="px-4 py-3">
                    <button
                      className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
                      type="button"
                      onClick={() =>
                        openConfirm({
                          title: "Delete Settlement",
                          message: <div>Do you want to delete <strong>Settlement {sid}</strong>?</div>,
                          confirmText: "Delete",
                          onConfirm: async () => await handleDelete(sid),
                        })
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        cancelText={confirmConfig.cancelText}
        confirming={confirming}
        onCancel={closeConfirm}
        onConfirm={async () => {
          try {
            setConfirming(true);
            await confirmConfig.onConfirm?.();
            setConfirmOpen(false);
          } finally {
            setConfirming(false);
          }
        }}
      />
    </div>
  );
}