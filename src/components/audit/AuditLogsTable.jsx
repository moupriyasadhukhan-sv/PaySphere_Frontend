// import { useEffect, useMemo, useState } from "react";
// import http from "../../services/http";
// // src/components/audit/AuditLogsTable.jsx
// const PAGE_SIZE = 10; // fixed

// export default function AuditLogsTable() {
//   const [rows, setRows] = useState([]);        // current page rows
//   const [pageNumber, setPageNumber] = useState(1);
//   const [total, setTotal] = useState(null);    // number | null when API doesn't return it
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Filters
//   const [filterUserId, setFilterUserId] = useState("");
//   const [filterAction, setFilterAction] = useState("");

//   // Last-page detection when 'total' is unknown
//   const [lastPageReached, setLastPageReached] = useState(false);

//   const HEAD_COLS = 4; // Audit ID, User ID, Action, Timestamp

//   const buildQuery = () => {
//     const qs = new URLSearchParams();
//     qs.set("pageNumber", String(pageNumber));
//     qs.set("pageSize", String(PAGE_SIZE));
//     // If backend supports these, pass them; harmless if ignored
//     if (filterUserId.trim()) qs.set("userId", filterUserId.trim());
//     if (filterAction.trim()) qs.set("action", filterAction.trim());
//     return qs.toString();
//   };

//   const load = async (opts = { cameFromNext: false }) => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await http.get(`/api/AuditLogs?${buildQuery()}`);
//       const body = res?.data;

//       let pageRows = [];
//       let apiTotal = null;

//       if (Array.isArray(body)) {
//         pageRows = body;
//         apiTotal = null; // unknown
//       } else if (body && Array.isArray(body.data)) {
//         pageRows = body.data;
//         // try typical names for total
//         apiTotal = Number(
//           body.total ?? body.count ?? body.totalCount ?? Number.isFinite(body.total) ? body.total : null
//         );
//         if (!Number.isFinite(apiTotal)) apiTotal = null;
//       } else {
//         // fallback
//         const possible = body?.data ?? body?.items;
//         if (Array.isArray(possible)) {
//           pageRows = possible;
//           apiTotal = Number(body?.total ?? body?.count ?? body?.totalCount);
//           if (!Number.isFinite(apiTotal)) apiTotal = null;
//         } else {
//           pageRows = [];
//           apiTotal = null;
//         }
//       }

//       setRows(pageRows);
//       setTotal(apiTotal);

//       // If total is unknown, infer last page: < PAGE_SIZE means last page
//       setLastPageReached(apiTotal == null ? pageRows.length < PAGE_SIZE : pageNumber >= Math.ceil(apiTotal / PAGE_SIZE));

//       // Guard: If we navigated Next but got 0 items (because we fell off the end),
//       // step back automatically and mark last page.
//       if (opts.cameFromNext && pageRows.length === 0 && pageNumber > 1) {
//         setPageNumber((p) => p - 1);
//         setLastPageReached(true);
//       }
//     } catch (e) {
//       console.error(e);
//       setError("Failed to load audit logs.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Load whenever page or filters change
//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pageNumber, filterUserId, filterAction]);

//   // Helpers
//   const formatTs = (ts) => {
//     if (!ts) return "—";
//     try {
//       const d = new Date(ts);
//       return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
//     } catch {
//       return ts;
//     }
//   };

//   const totalPages = total != null ? Math.max(1, Math.ceil(total / PAGE_SIZE)) : null;

//   const canGoPrev = pageNumber > 1;
//   const canGoNext =
//     total != null
//       ? pageNumber < totalPages
//       : !lastPageReached && rows.length > 0; // unknown total: allow Next if page seems full

//   const onNext = () => {
//     if (!canGoNext) return;
//     setPageNumber((p) => p + 1);
//     // load will run via useEffect; we’ll detect empty pages and step back automatically
//   };

//   const onPrev = () => {
//     if (!canGoPrev) return;
//     setPageNumber((p) => Math.max(1, p - 1));
//   };

//   // When filters change, reset to page 1
//   const onChangeUserId = (e) => {
//     setPageNumber(1);
//     setFilterUserId(e.target.value);
//   };
//   const onChangeAction = (e) => {
//     setPageNumber(1);
//     setFilterAction(e.target.value);
//   };

//   // Footer text: "Showing X" or "Showing X of Y"
//   const showingText =
//     total != null
//       ? `Showing ${rows.length} of ${total}`
//       : `Showing ${rows.length}`;

//   return (
//     <div className="space-y-3">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-lg font-semibold">Audit Logs</h2>
//           <p className="text-sm text-gray-500">System audit trail</p>
//         </div>

//         {/* Simple filters (no page size control) */}
//         <div className="flex flex-wrap items-end gap-2">
//           <div className="flex flex-col">
//             <label className="text-xs text-gray-600">User ID</label>
//             <input
//               className="border rounded-md px-2 py-1 text-sm"
//               placeholder="e.g. 43"
//               value={filterUserId}
//               onChange={onChangeUserId}
//             />
//           </div>
//           <div className="flex flex-col">
//             <label className="text-xs text-gray-600">Action</label>
//             <input
//               className="border rounded-md px-2 py-1 text-sm"
//               placeholder='e.g. "Login"'
//               value={filterAction}
//               onChange={onChangeAction}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-auto border rounded-xl">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="px-4 py-3">Audit ID</th>
//               <th className="px-4 py-3">User ID</th>
//               <th className="px-4 py-3">Action</th>
//               <th className="px-4 py-3">Timestamp (Local)</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
//                   Loading audit logs…
//                 </td>
//               </tr>
//             )}

//             {!loading && error && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">
//                   {error}
//                 </td>
//               </tr>
//             )}

//             {!loading && !error && rows.length === 0 && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
//                   No audit records found.
//                 </td>
//               </tr>
//             )}

//             {!loading &&
//               !error &&
//               rows.map((row) => (
//                 <tr key={row.auditId ?? `${row.userId}-${row.timestampUtc}`} className="border-t">
//                   <td className="px-4 py-3 whitespace-nowrap">{row.auditId ?? "—"}</td>
//                   <td className="px-4 py-3 whitespace-nowrap">{row.userId ?? "—"}</td>
//                   <td className="px-4 py-3">{row.action ?? "—"}</td>
//                   <td className="px-4 py-3">{formatTs(row.timestampUtc)}</td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pager */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
//         <span className="text-sm text-gray-600">
//           {showingText}
//           {" \u00A0|\u00A0 "}
//           Page {pageNumber}
//           {totalPages != null ? ` / ${totalPages}` : ""}
//         </span>

//         <div className="flex items-center gap-3">
//           <button
//             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
//             disabled={!canGoPrev}
//             onClick={onPrev}
//           >
//             Previous
//           </button>
//           <button
//             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
//             disabled={!canGoNext}
//             onClick={() => load({ cameFromNext: true }) || setPageNumber((p) => p + 1)}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// // const PAGE_SIZE = 10;

// // export default function AuditLogsTable() {
// //   const [rows, setRows] = useState([]);
// //   const [pageNumber, setPageNumber] = useState(1);
// //   const [pageSize, setPageSize] = useState(PAGE_SIZE);
// //   const [total, setTotal] = useState(0);

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   // Optional filters (only keep if your API supports them; otherwise remove this block)
// //   const [filterUserId, setFilterUserId] = useState("");
// //   const [filterAction, setFilterAction] = useState("");

// //   const HEAD_COLS = 4; // AuditId, UserId, Action, Timestamp

// //   const load = async () => {
// //     setLoading(true);
// //     setError("");

// //     const params = new URLSearchParams();
// //     params.set("pageNumber", String(pageNumber));
// //     params.set("pageSize", String(pageSize));
// //     // Only append filters if present (and if your backend supports them)
// //     if (filterUserId) params.set("userId", filterUserId.trim());
// //     if (filterAction) params.set("action", filterAction.trim());

// //     try {
// //       const res = await http.get(`/api/AuditLogs?${params.toString()}`);

// //       // Try to be tolerant with shapes:
// //       // - shape A: { data: [...], total: 123 }
// //       // - shape B: just an array [...], with no total
// //       const body = res?.data;

// //       if (Array.isArray(body)) {
// //         setRows(body);
// //         setTotal(body.length); // best effort when API doesn't send total
// //       } else if (body && Array.isArray(body.data)) {
// //         setRows(body.data);
// //         setTotal(Number(body.total ?? body.count ?? body.totalCount ?? body.data.length));
// //       } else {
// //         // Maybe Swagger example: the controller returns array directly
// //         const possibleArray = body?.data ?? body?.items;
// //         if (Array.isArray(possibleArray)) {
// //           setRows(possibleArray);
// //           setTotal(Number(body.total ?? possibleArray.length));
// //         } else {
// //           setRows([]);
// //           setTotal(0);
// //         }
// //       }
// //     } catch (e) {
// //       console.error(e);
// //       setError("Failed to load audit logs.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     load();
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [pageNumber, pageSize /* filters included below */ , filterUserId, filterAction]);

// //   const totalPages = Math.max(1, Math.ceil(total / pageSize));
// //   const pageSafe = Math.min(Math.max(1, pageNumber), totalPages);

// //   // If server already paginates, rows is just the current page.
// //   // If server returns ALL rows (rare for audit logs), you can client-slice:
// //   const current = useMemo(() => {
// //     // Assume server-side paging; return rows as-is.
// //     return rows;

// //     // If you need client-side paging instead:
// //     // const start = (pageSafe - 1) * pageSize;
// //     // return rows.slice(start, start + pageSize);
// //   }, [rows, pageSafe, pageSize]);

// //   const formatTs = (ts) => {
// //     if (!ts) return "—";
// //     try {
// //       const d = new Date(ts);
// //       // Local date/time
// //       return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
// //     } catch {
// //       return ts;
// //     }
// //   };

// //   return (
// //     <div className="space-y-3">
// //       <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
// //         <div>
// //           <h2 className="text-lg font-semibold">Audit Logs</h2>
// //           <p className="text-sm text-gray-500">System audit trail with pagination</p>
// //         </div>

// //         {/* Optional filters row */}
// //         <div className="flex flex-wrap items-end gap-2">
// //           <div className="flex flex-col">
// //             <label className="text-xs text-gray-600">User ID</label>
// //             <input
// //               className="border rounded-md px-2 py-1 text-sm"
// //               placeholder="e.g. 42"
// //               value={filterUserId}
// //               onChange={(e) => {
// //                 setPageNumber(1);
// //                 setFilterUserId(e.target.value);
// //               }}
// //             />
// //           </div>

// //           <div className="flex flex-col">
// //             <label className="text-xs text-gray-600">Action</label>
// //             <input
// //               className="border rounded-md px-2 py-1 text-sm"
// //               placeholder='e.g. "Login"'
// //               value={filterAction}
// //               onChange={(e) => {
// //                 setPageNumber(1);
// //                 setFilterAction(e.target.value);
// //               }}
// //             />
// //           </div>

// //           <div className="flex flex-col">
// //             <label className="text-xs text-gray-600">Page Size</label>
// //             <select
// //               className="border rounded-md px-2 py-1 text-sm"
// //               value={pageSize}
// //               onChange={(e) => {
// //                 setPageNumber(1);
// //                 setPageSize(Number(e.target.value));
// //               }}
// //             >
// //               {[10, 20, 50, 100].map((n) => (
// //                 <option key={n} value={n}>
// //                   {n}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="overflow-auto border rounded-xl">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-gray-50">
// //             <tr className="text-left">
// //               <th className="px-4 py-3">Audit ID</th>
// //               <th className="px-4 py-3">User ID</th>
// //               <th className="px-4 py-3">Action</th>
// //               <th className="px-4 py-3">Timestamp (Local)</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {loading && (
// //               <tr>
// //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
// //                   Loading audit logs…
// //                 </td>
// //               </tr>
// //             )}

// //             {!loading && error && (
// //               <tr>
// //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">
// //                   {error}
// //                 </td>
// //               </tr>
// //             )}

// //             {!loading && !error && current.length === 0 && (
// //               <tr>
// //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
// //                   No audit records found.
// //                 </td>
// //               </tr>
// //             )}

// //             {!loading &&
// //               !error &&
// //               current.map((row) => (
// //                 <tr key={row.auditId ?? `${row.userId}-${row.timestampUtc}`} className="border-t">
// //                   <td className="px-4 py-3 whitespace-nowrap">{row.auditId ?? "—"}</td>
// //                   <td className="px-4 py-3 whitespace-nowrap">{row.userId ?? "—"}</td>
// //                   <td className="px-4 py-3">{row.action ?? "—"}</td>
// //                   <td className="px-4 py-3">{formatTs(row.timestampUtc)}</td>
// //                 </tr>
// //               ))}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pager */}
// //       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
// //         <span className="text-sm text-gray-600">
// //           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {Math.max(1, Math.ceil(total / pageSize))}
// //         </span>

// //         <div className="flex items-center gap-3">
// //           <button
// //             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// //             disabled={pageSafe === 1}
// //             onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
// //           >
// //             Previous
// //           </button>
// //           <button
// //             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// //             disabled={pageSafe >= Math.max(1, Math.ceil(total / pageSize))}
// //             onClick={() => setPageNumber((p) => p + 1)}
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// src/components/audit/AuditLogsTable.jsx
import { useEffect, useMemo, useState, useRef } from "react";
import http from "../../services/http";

const PAGE_SIZE = 10;          // fixed, as requested
const MAX_PAGES_TO_FETCH = 100; // safety cap
const HEAD_COLS = 4;           // column count for colSpan

export default function AuditLogsTable() {
  // All rows loaded from server (we’ll fetch in pages and merge)
  const [allRows, setAllRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // UI state
  const [page, setPage] = useState(1); // 1-based
  const [filterUserId, setFilterUserId] = useState("");
  const [filterAction, setFilterAction] = useState("");

  // prevent double fetch on strict mode mounts
  const fetchedRef = useRef(false);

  // -------- Fetch ALL audit logs once (in pages), then filter & paginate client-side --------
  const fetchAll = async () => {
    setLoading(true);
    setError("");
    try {
      const merged = [];
      let pageNumber = 1;

      while (pageNumber <= MAX_PAGES_TO_FETCH) {
        const qs = new URLSearchParams();
        qs.set("pageNumber", String(pageNumber));
        qs.set("pageSize", String(PAGE_SIZE));

        const res = await http.get(`/api/AuditLogs?${qs.toString()}`);
        const body = res?.data;

        let pageRows = [];
        if (Array.isArray(body)) {
          pageRows = body;
        } else if (body && Array.isArray(body.data)) {
          pageRows = body.data;
        } else {
          const possible = body?.data ?? body?.items;
          pageRows = Array.isArray(possible) ? possible : [];
        }

        merged.push(...pageRows);

        // stop if we got less than a full page (last page reached)
        if (pageRows.length < PAGE_SIZE) break;

        pageNumber += 1;
      }

      setAllRows(merged);
    } catch (e) {
      console.error(e);
      setError("Failed to load audit logs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchedRef.current) return;
    fetchedRef.current = true;
    fetchAll();
  }, []);

  // --------- Client-side filtering ----------
  const filtered = useMemo(() => {
    const uid = filterUserId.trim().toLowerCase();
    const act = filterAction.trim().toLowerCase();

    return allRows.filter((r) => {
      // userId check (substring match on stringified id)
      const userOk = uid
        ? String(r.userId ?? "").toLowerCase().includes(uid)
        : true;

      // action check (case-insensitive substring)
      const actionOk = act
        ? String(r.action ?? "").toLowerCase().includes(act)
        : true;

      return userOk && actionOk;
    });
  }, [allRows, filterUserId, filterAction]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [filterUserId, filterAction]);

  // --------- Client-side paging over filtered rows ----------
  const total = filtered.length; // real total after filters
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const pageSafe = Math.min(Math.max(1, page), totalPages);

  const current = useMemo(() => {
    const start = (pageSafe - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, pageSafe]);

  const canPrev = pageSafe > 1;
  const canNext = pageSafe < totalPages;

  const onPrev = () => canPrev && setPage((p) => Math.max(1, p - 1));
  const onNext = () => canNext && setPage((p) => Math.min(totalPages, p + 1));

  const formatTs = (ts) => {
    if (!ts) return "—";
    try {
      const d = new Date(ts);
      return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
    } catch {
      return ts;
    }
  };

  return (
    <div className="space-y-3">
      {/* Header + filters */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Audit Logs</h2>
          <p className="text-sm text-gray-500">System audit trail</p>
        </div>

        <div className="flex flex-wrap items-end gap-2">
          <div className="flex flex-col">
            <label className="text-xs text-gray-600">User ID</label>
            <input
              className="border rounded-md px-2 py-1 text-sm"
              placeholder="e.g. 43"
              value={filterUserId}
              onChange={(e) => setFilterUserId(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-gray-600">Action</label>
            <input
              className="border rounded-md px-2 py-1 text-sm"
              placeholder='e.g. "Logout"'
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left">
              <th className="px-4 py-3">Audit ID</th>
              <th className="px-4 py-3">User ID</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Timestamp (Local)</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
                  Loading audit logs…
                </td>
              </tr>
            )}

            {!loading && error && (
              <tr>
                <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">
                  {error}
                </td>
              </tr>
            )}

            {!loading && !error && current.length === 0 && (
              <tr>
                <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
                  No audit records found.
                </td>
              </tr>
            )}

            {!loading &&
              !error &&
              current.map((row) => (
                <tr key={row.auditId ?? `${row.userId}-${row.timestampUtc}`} className="border-t">
                  <td className="px-4 py-3 whitespace-nowrap">{row.auditId ?? "—"}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{row.userId ?? "—"}</td>
                  <td className="px-4 py-3">{row.action ?? "—"}</td>
                  <td className="px-4 py-3">{formatTs(row.timestampUtc)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pager */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
        <span className="text-sm text-gray-600">
          Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
        </span>

        <div className="flex items-center gap-3">
          <button
            className="px-3 py-1.5 border rounded-md disabled:opacity-50"
            disabled={!canPrev}
            onClick={onPrev}
          >
            Previous
          </button>
          <button
            className="px-3 py-1.5 border rounded-md disabled:opacity-50"
            disabled={!canNext}
            onClick={onNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}