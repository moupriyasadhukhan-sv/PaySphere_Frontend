// import { useEffect, useMemo, useState } from "react";
// import { getTransactionsEnriched } from "../../services/transactions/transactionsApi";

// function formatCurrency(amount, currency) {
//   if (amount == null) return "-";
//   try {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency: currency || "INR",
//       maximumFractionDigits: 2,
//     }).format(Number(amount));
//   } catch {
//     return `${amount} ${currency || ""}`.trim();
//   }
// }

// function Pager({ page, pageSize, total, onPageChange }) {
//   const totalPages = Math.max(1, Math.ceil(total / pageSize));
//   const canPrev = page > 1;
//   const canNext = page < totalPages;

//   return (
//     <div className="flex items-center justify-between mt-3 text-sm">
//       <button
//         onClick={() => canPrev && onPageChange(page - 1)}
//         disabled={!canPrev}
//         className={`px-3 py-1 rounded border ${canPrev ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400"}`}
//       >
//         Previous
//       </button>

//       <div className="text-gray-600">
//         Page <span className="font-medium">{page}</span> / {totalPages} • Showing{" "}
//         <span className="font-medium">
//           {(page - 1) * pageSize + 1}
//         </span>{" "}
//         -{" "}
//         <span className="font-medium">
//           {Math.min(page * pageSize, total)}
//         </span>{" "}
//         of <span className="font-medium">{total}</span>
//       </div>

//       <button
//         onClick={() => canNext && onPageChange(page + 1)}
//         disabled={!canNext}
//         className={`px-3 py-1 rounded border ${canNext ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400"}`}
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default function TransactionsTable() {
//   const [allRows, setAllRows] = useState([]); // full dataset (client-side join)
//   const [loading, setLoading] = useState(true);
//   const [err, setErr] = useState("");

//   // Client-side pagination state
//   const [page, setPage] = useState(1);
//   const [pageSize] = useState(10);           // change to 20/50 if you prefer

//   // (Optional) filters – wire later if needed
//   const [typeFilter] = useState("");          // e.g., "P2M" / "P2P"
//   const [statusFilter] = useState("");        // e.g., "Completed"
//   const [searchText] = useState("");          // free text search on names

//   useEffect(() => {
//     let mounted = true;
//     (async () => {
//       try {
//         setLoading(true);
//         const data = await getTransactionsEnriched();
//         if (mounted) {
//           // Sort newest first
//           data.sort((a, b) => new Date(b.transactionDate) - new Date(a.transactionDate));
//           setAllRows(data);
//         }
//       } catch (e) {
//         console.error(e);
//         setErr(
//           e?.response?.data?.message ||
//           e?.response?.data?.title ||
//           e?.message || "Failed to load transactions."
//         );
//       } finally {
//         if (mounted) setLoading(false);
//       }
//     })();
//     return () => { mounted = false; };
//   }, []);

//   // Filter rows (client-side)
//   const filtered = useMemo(() => {
//     let rows = allRows;
//     if (typeFilter) {
//       rows = rows.filter(r => (r.transactionType || "").toLowerCase() === typeFilter.toLowerCase());
//     }
//     if (statusFilter) {
//       rows = rows.filter(r => (r.status || "").toLowerCase() === statusFilter.toLowerCase());
//     }
//     if (searchText) {
//       const q = searchText.toLowerCase();
//       rows = rows.filter(r =>
//         (r.fromName || "").toLowerCase().includes(q) ||
//         (r.toName || "").toLowerCase().includes(q) ||
//         String(r.transactionId || "").includes(q)
//       );
//     }
//     return rows;
//   }, [allRows, typeFilter, statusFilter, searchText]);

//   // Paginate
//   const total = filtered.length;
//   const totalPages = Math.max(1, Math.ceil(total / pageSize));
//   const safePage = Math.min(page, totalPages);
//   const start = (safePage - 1) * pageSize;
//   const pageRows = filtered.slice(start, start + pageSize);

//   if (loading) return <div className="text-sm text-gray-500 p-4">Loading…</div>;
//   if (err)     return <div className="text-sm text-red-600 p-4">{err}</div>;
//   if (!allRows.length) return <div className="text-sm text-gray-500 p-4">No transactions found.</div>;

//   return (
//     <div className="w-full">
//       {/* (Optional) tiny filter row – uncomment when you add filters
//       <div className="flex gap-3 mb-3">
//         <select className="border rounded px-2 py-1 bg-white">
//           <option value="">All Types</option>
//           <option value="P2P">P2P</option>
//           <option value="P2M">P2M</option>
//         </select>
//         <select className="border rounded px-2 py-1 bg-white">
//           <option value="">All Status</option>
//           <option value="Completed">Completed</option>
//           <option value="Initiated">Initiated</option>
//           <option value="Pending">Pending</option>
//         </select>
//         <input className="border rounded px-2 py-1" placeholder="Search name or TXN ID" />
//       </div>
//       */}

//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="text-left text-gray-600 border-b">
//               <th className="py-2 pr-3">Transaction ID</th>
//               <th className="py-2 pr-3">From</th>
//               <th className="py-2 pr-3">To</th>
//               <th className="py-2 pr-3">Amount</th>
//               <th className="py-2 pr-3">Type</th>
//               <th className="py-2 pr-3">Status</th>
//               <th className="py-2 pr-3">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageRows.map((r) => (
//               <tr key={r.transactionId} className="border-b last:border-0">
//                 <td className="py-2 pr-3">TXN{String(r.transactionId).padStart(4, "0")}</td>
//                 <td className="py-2 pr-3">
//                   <div className="flex flex-col">
//                     <span className="font-medium">{r.fromName || "-"}</span>
//                     <span className="text-xs text-gray-500">
//                       {r.fromPartyType} (WID {r.fromWalletId})
//                     </span>
//                   </div>
//                 </td>
//                 <td className="py-2 pr-3">
//                   <div className="flex flex-col">
//                     <span className="font-medium">{r.toName || "-"}</span>
//                     <span className="text-xs text-gray-500">
//                       {r.toPartyType} (WID {r.toWalletId})
//                     </span>
//                   </div>
//                 </td>
//                 <td className="py-2 pr-3">{formatCurrency(r.amount, r.currency)}</td>
//                 <td className="py-2 pr-3">
//                   <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5">
//                     {r.transactionType}
//                   </span>
//                 </td>
//                 <td className="py-2 pr-3">
//                   <span className={`inline-flex items-center rounded-full px-2 py-0.5 ${
//                     (r.status || "").toLowerCase() === "completed"
//                       ? "bg-indigo-700 text-white"
//                       : (r.status || "").toLowerCase() === "initiated"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : "bg-gray-100 text-gray-800"
//                   }`}>
//                     {r.status}
//                   </span>
//                 </td>
//                 <td className="py-2 pr-3">{new Date(r.transactionDate).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <Pager
//         page={safePage}
//         pageSize={pageSize}
//         total={total}
//         onPageChange={(p) => setPage(p)}
//       />
//     </div>
//   );
// }





// src/components/transactions/TransactionsTable.jsx
// Renders transactions in the Admin -> Transactions tab WITH pagination.
// No redirects, no table joins. It just shows what the API returns.
//
// Depends on: getTransactionsSimple(page, pageSize)

import { useEffect, useMemo, useState } from "react";
import { getTransactionsSimple } from "../../services/transactions/transactionsApi";

function formatCurrency(amount, currency) {
  if (amount == null) return "-";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount));
  } catch {
    return `${amount} ${currency || ""}`.trim();
  }
}

function Pager({ page, pageSize, total, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between mt-3 text-sm">
      <button
        onClick={() => canPrev && onPageChange(page - 1)}
        disabled={!canPrev}
        className={`px-3 py-1 rounded border ${canPrev ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400"}`}
      >
        Previous
      </button>

      <div className="text-gray-600">
        Page <span className="font-medium">{page}</span> / {totalPages} • Showing{" "}
        <span className="font-medium">
          {total === 0 ? 0 : (page - 1) * pageSize + 1}
        </span>{" "}
        -{" "}
        <span className="font-medium">
          {Math.min(page * pageSize, total)}
        </span>{" "}
        of <span className="font-medium">{total}</span>
      </div>

      <button
        onClick={() => canNext && onPageChange(page + 1)}
        disabled={!canNext}
        className={`px-3 py-1 rounded border ${canNext ? "bg-white hover:bg-gray-50" : "bg-gray-100 text-gray-400"}`}
      >
        Next
      </button>
    </div>
  );
}

export default function TransactionsTable() {
  // Server-side pagination state
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  // Data
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);

  // UI state
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        setErr("");
        // Fetch current page directly from API (no joins)
        const { items, totalCount } = await getTransactionsSimple(page, pageSize);

        if (!mounted) return;
        setRows(items);
        setTotal(totalCount);
      } catch (e) {
        console.error("[TX TABLE] fetch error:", e);
        if (!mounted) return;
        setErr(
          e?.response?.data?.message ||
          e?.response?.data?.title ||
          e?.message ||
          "Failed to load transactions."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => { mounted = false; };
  }, [page, pageSize]);

  const pageRows = useMemo(() => rows ?? [], [rows]);

  if (loading) return <div className="text-sm text-gray-500 p-4">Loading…</div>;
  if (err)     return <div className="text-sm text-red-600 p-4">{err}</div>;
  if (!total || !pageRows.length) return <div className="text-sm text-gray-500 p-4">No transactions found.</div>;

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="py-2 pr-3">Transaction ID</th>
              <th className="py-2 pr-3">From Wallet</th>
              <th className="py-2 pr-3">To Wallet</th>
              <th className="py-2 pr-3">Amount</th>
              <th className="py-2 pr-3">Type</th>
              <th className="py-2 pr-3">Status</th>
              <th className="py-2 pr-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.map((r) => (
              <tr key={r.transactionId ?? r.transactionID ?? Math.random()} className="border-b last:border-0">
                <td className="py-2 pr-3">TXN{r.transactionId ?? r.transactionID ?? "-"}</td>
                <td className="py-2 pr-3">{r.fromWalletId ?? r.fromWalletID ?? "-"}</td>
                <td className="py-2 pr-3">{r.toWalletId ?? r.toWalletID ?? "-"}</td>
                <td className="py-2 pr-3">{formatCurrency(r.amount, r.currency)}</td>
                <td className="py-2 pr-3">
                  <span className="inline-flex items-center rounded-full bg-indigo-50 text-indigo-700 px-2 py-0.5">
                    {r.transactionType}
                  </span>
                </td>
                <td className="py-2 pr-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 ${
                      (r.status || "").toLowerCase() === "completed"
                        ? "bg-indigo-700 text-white"
                        : (r.status || "").toLowerCase() === "initiated"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {r.status}
                  </span>
                </td>
                <td className="py-2 pr-3">
                  {r.transactionDate ? new Date(r.transactionDate).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pager
        page={page}
        pageSize={pageSize}
        total={total}
        onPageChange={(p) => setPage(p)}
      />
    </div>
  );
}