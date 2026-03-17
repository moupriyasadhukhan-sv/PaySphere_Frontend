// // // // src/components/merchants/MerchantsTable.jsx
// // // import { useEffect, useMemo, useState } from "react";
// // // import http from "../../services/http";
// // // import { useNavigate } from "react-router-dom";

// // // const PAGE_SIZE = 50;

// // // export default function MerchantsTable() {
// // //   const [data, setData] = useState([]);
// // //   const [page, setPage] = useState(1);
// // //   const [loading, setLoading] = useState(true);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     let mounted = true;
// // //     setLoading(true);
// // //     http
// // //       .get("/api/Merchant")
// // //       .then((res) => {
// // //         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
// // //         if (mounted) setData(items);
// // //       })
// // //       .catch(console.error)
// // //       .finally(() => mounted && setLoading(false));
// // //     return () => {
// // //       mounted = false;
// // //     };
// // //   }, []);

// // //   const total = data.length;
// // //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
// // //   const pageSafe = Math.min(Math.max(1, page), totalPages);

// // //   const current = useMemo(() => {
// // //     const start = (pageSafe - 1) * PAGE_SIZE;
// // //     return data.slice(start, start + PAGE_SIZE);
// // //   }, [data, pageSafe]);

// // //   return (
// // //     <div>
// // //       <div className="mb-3">
// // //         <h2 className="text-lg font-semibold">Merchants</h2>
// // //         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
// // //       </div>

// // //       <div className="overflow-auto border rounded-xl">
// // //         <table className="min-w-full text-sm">
// // //           <thead className="bg-gray-50">
// // //             <tr className="text-left">
// // //               <th className="px-4 py-3">Merchant ID</th>
// // //               <th className="px-4 py-3">Name</th>
// // //               <th className="px-4 py-3">Email</th>
// // //               <th className="px-4 py-3">Status</th>
// // //               <th className="px-4 py-3">Check Settlement</th>
// // //               <th className="px-4 py-3">Create Settlement</th>
// // //               <th className="px-4 py-3">Delete Settlement</th>
// // //               <th className="px-4 py-3">Delete Merchant</th>
// // //             </tr>
// // //           </thead>
// // //           <tbody>
// // //             {loading && (
// // //               <tr>
// // //                 <td colSpan={6} className="px-4 py-6 text-gray-500">
// // //                   Loading merchants…
// // //                 </td>
// // //               </tr>
// // //             )}
// // //             {!loading && current.length === 0 && (
// // //               <tr>
// // //                 <td colSpan={6} className="px-4 py-6 text-gray-500">
// // //                   No merchants found.
// // //                 </td>
// // //               </tr>
// // //             )}
// // //             {!loading &&
// // //               current.map((m) => {
// // //                 const id = m.merchantId ?? m.merchantID ?? m.MerchantId;
// // //                 return (
// // //                   <tr key={id} className="border-t">
// // //                     <td className="px-4 py-3">{id}</td>
// // //                     <td className="px-4 py-3">{m.name}</td>
// // //                     <td className="px-4 py-3">{m.email}</td>
// // //                     <td className="px-4 py-3">
// // //                       <span
// // //                         className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
// // //                           (m.status || "").toLowerCase() === "active"
// // //                             ? "bg-green-100 text-green-700"
// // //                             : "bg-gray-100 text-gray-700"
// // //                         }`}
// // //                       >
// // //                         {m.status ?? "—"}
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-4 py-3">—{/* fill once you expose an endpoint */}</td>
// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// // //                         onClick={() => {
// // //                           // If you have a route, navigate:
// // //                           // navigate(`/settlement/${id}`);
// // //                           alert(`Check Settlement for Merchant ${id} (placeholder)`);
// // //                         }}
// // //                       >
// // //                         Check Settlement
// // //                       </button>
// // //                     </td>
// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// // //                         onClick={() => {
// // //                           // If you have a route, navigate:
// // //                           // navigate(`/settlement/${id}`);
// // //                           alert(`Check Settlement for Merchant ${id} (placeholder)`);
// // //                         }}
// // //                       >
// // //                         Create Settlement
// // //                       </button>
// // //                     </td>

// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// // //                         onClick={() => {
// // //                           // If you have a route, navigate:
// // //                           // navigate(`/settlement/${id}`);
// // //                           alert(`Check Settlement for Merchant ${id} (placeholder)`);
// // //                         }}
// // //                       >
// // //                         Delete
// // //                       </button>
// // //                     </td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Pager */}
// // //       <div className="flex items-center justify-end gap-3 mt-3">
// // //         <button
// // //           className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// // //           disabled={pageSafe === 1}
// // //           onClick={() => setPage((p) => Math.max(1, p - 1))}
// // //         >
// // //           Previous
// // //         </button>
// // //         <span className="text-sm text-gray-600">
// // //           Page {pageSafe} / {totalPages} &nbsp;•&nbsp; Showing {current.length} of {total}
// // //         </span>
// // //         <button
// // //           className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// // //           disabled={pageSafe === totalPages}
// // //           onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
// // //         >
// // //           Next
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // src/components/merchants/MerchantsTable.jsx
// // import { useEffect, useMemo, useState, useCallback } from "react";
// // import http from "../../services/http";
// // import { useNavigate } from "react-router-dom";
// // import ConfirmDialog from "../../common/ConfirmDialog";
// // // const PAGE_SIZE = 50;

// // // export default function MerchantsTable() {
// // //   const [data, setData] = useState([]);
// // //   const [page, setPage] = useState(1);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const navigate = useNavigate();

// // //   // derive a normalized safe id from possible shapes
// // //   const getMerchantId = useCallback((m) => {
// // //     return m.merchantId ?? m.merchantID ?? m.MerchantId ?? m.id ?? m.ID ?? m.Id;
// // //   }, []);

// // //   useEffect(() => {
// // //     let mounted = true;
// // //     setLoading(true);
// // //     setError("");
// // //     http
// // //       .get("/api/Merchant")
// // //       .then((res) => {
// // //         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
// // //         if (mounted) setData(items);
// // //       })
// // //       .catch((e) => {
// // //         console.error(e);
// // //         if (mounted) setError("Failed to load merchants.");
// // //       })
// // //       .finally(() => mounted && setLoading(false));

// // //     return () => {
// // //       mounted = false;
// // //     };
// // //   }, []);

// // //   const total = data.length;
// // //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
// // //   const pageSafe = Math.min(Math.max(1, page), totalPages);

// // //   const current = useMemo(() => {
// // //     const start = (pageSafe - 1) * PAGE_SIZE;
// // //     return data.slice(start, start + PAGE_SIZE);
// // //   }, [data, pageSafe]);

// // //   // Actions
// // //   const goToSettlement = (merchantId) => {
// // //     // Navigate to your settlement page; implement routes like /settlement/:id
// // //     navigate(`/settlement/${merchantId}`);
// // //   };

// // //   const handleCreateSettlement = (merchantId) => {
// // //     // Example: navigate to a create form prefilled with merchantId
// // //     navigate(`/settlement/${merchantId}/create`);
// // //   };

// // //   const handleDeleteSettlement = async (merchantId) => {
// // //     // example: call DELETE /api/Settlement/{id}
// // //     if (!window.confirm(`Delete settlement for Merchant ${merchantId}?`)) return;
// // //     try {
// // //       await http.delete(`/api/Settlement/${merchantId}`);
// // //       // Optionally refresh merchant list or settlement list
// // //       alert(`Settlement deleted for Merchant ${merchantId}`);
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to delete settlement");
// // //     }
// // //   };

// // //   const handleDeleteMerchant = async (merchantId) => {
// // //     // If you expose a DELETE for merchant (e.g. DELETE /api/Merchant/{id})
// // //     if (!window.confirm(`Delete merchant ${merchantId}? This cannot be undone.`)) return;
// // //     try {
// // //       await http.delete(`/api/Merchant/${merchantId}`);
// // //       // Remove locally
// // //       setData((prev) => prev.filter((m) => getMerchantId(m) !== merchantId));
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Failed to delete merchant");
// // //     }
// // //   };

// // //   const HEAD_COLS = 8; // Keep this in sync with <th> count

// // //   return (
// // //     <div className="space-y-3">
// // //       <div className="mb-1">
// // //         <h2 className="text-lg font-semibold">Merchants</h2>
// // //         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
// // //       </div>

// // //       <div className="overflow-auto border rounded-xl">
// // //         <table className="min-w-full text-sm">
// // //           <thead className="bg-gray-50">
// // //             <tr className="text-left">
// // //               <th className="px-4 py-3">Merchant ID</th>
// // //               <th className="px-4 py-3">Name</th>
// // //               <th className="px-4 py-3">Email</th>
// // //               <th className="px-4 py-3">Status</th>
// // //               <th className="px-4 py-3">Check Settlement</th>
// // //               <th className="px-4 py-3">Create Settlement</th>
// // //               <th className="px-4 py-3">Delete Settlement</th>
// // //               <th className="px-4 py-3">Delete Merchant</th>
// // //             </tr>
// // //           </thead>

// // //           <tbody>
// // //             {loading && (
// // //               <tr>
// // //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
// // //                   Loading merchants…
// // //                 </td>
// // //               </tr>
// // //             )}

// // //             {!loading && error && (
// // //               <tr>
// // //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">
// // //                   {error}
// // //                 </td>
// // //               </tr>
// // //             )}

// // //             {!loading && !error && current.length === 0 && (
// // //               <tr>
// // //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
// // //                   No merchants found.
// // //                 </td>
// // //               </tr>
// // //             )}

// // //             {!loading &&
// // //               !error &&
// // //               current.map((m) => {
// // //                 const id = getMerchantId(m);
// // //                 const status = (m.status || "").toLowerCase();
// // //                 const isActive = status === "active";

// // //                 return (
// // //                   <tr key={id} className="border-t">
// // //                     <td className="px-4 py-3 whitespace-nowrap">{id}</td>
// // //                     <td className="px-4 py-3">{m.name ?? "—"}</td>
// // //                     <td className="px-4 py-3">
// // //                       <span className="block truncate max-w-[240px]" title={m.email}>
// // //                         {m.email ?? "—"}
// // //                       </span>
// // //                     </td>
// // //                     <td className="px-4 py-3">
// // //                       <span
// // //                         className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
// // //                           isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
// // //                         }`}
// // //                       >
// // //                         {m.status ?? "—"}
// // //                       </span>
// // //                     </td>

// // //                     {/* Check Settlement: navigate to details page */}
// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// // //                         onClick={() => goToSettlement(id)}
// // //                         title="Open settlement details"
// // //                       >
// // //                         Check Settlement
// // //                       </button>
// // //                     </td>

// // //                     {/* Create Settlement */}
// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// // //                         onClick={() => handleCreateSettlement(id)}
// // //                         title="Create a new settlement"
// // //                       >
// // //                         Create Settlement
// // //                       </button>
// // //                     </td>

// // //                     {/* Delete Settlement (API: DELETE /api/Settlement/{id}) */}
// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// // //                         onClick={() => handleDeleteSettlement(id)}
// // //                         title="Delete an existing settlement"
// // //                       >
// // //                         Delete Settlement
// // //                       </button>
// // //                     </td>

// // //                     {/* Delete Merchant (API: DELETE /api/Merchant/{id}) */}
// // //                     <td className="px-4 py-3">
// // //                       <button
// // //                         className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
// // //                         onClick={async () => {
// // //                           const id = getMerchantId(m);
// // //                           if (!window.confirm(`Delete merchant ${id}? This cannot be undone.`)) return;
// // //                           try {
// // //                             await http.delete(`/api/Merchant/${id}`);
// // //                             setData(prev => prev.filter(x => getMerchantId(x) !== id));
// // //                           } catch (err) {
// // //                             console.error(err);
// // //                             alert("Failed to delete merchant");
// // //                           }
// // //                         }}
// // //                       >
// // //                         Delete
// // //                       </button>
// // //                   </td>
// // //                   </tr>
// // //                 );
// // //               })}
// // //           </tbody>
// // //         </table>
// // //       </div>

// // //       {/* Pager */}
// // //       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
// // //         <span className="text-sm text-gray-600">
// // //           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
// // //         </span>

// // //         <div className="flex items-center gap-3">
// // //           <button
// // //             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// // //             disabled={pageSafe === 1}
// // //             onClick={() => setPage((p) => Math.max(1, p - 1))}
// // //           >
// // //             Previous
// // //           </button>
// // //           <button
// // //             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// // //             disabled={pageSafe === totalPages}
// // //             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
// // //           >
// // //             Next
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }


// // const PAGE_SIZE = 50;

// // export default function MerchantsTable() {
// //   const [data, setData] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [confirmOpen, setConfirmOpen] = useState(false);
// //   const [confirmConfig, setConfirmConfig] = useState({
// //     title: "",
// //     message: "",
// //     onConfirm: null,
// //   });

// //   const navigate = useNavigate();

// //   const getMerchantId = useCallback((m) => {
// //     return m.merchantId ?? m.merchantID ?? m.MerchantId ?? m.id ?? m.ID ?? m.Id;
// //   }, []);

// //   useEffect(() => {
// //     let mounted = true;
// //     setLoading(true);
// //     setError("");
// //     http
// //       .get("/api/Merchant")
// //       .then((res) => {
// //         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
// //         if (mounted) setData(items);
// //       })
// //       .catch((e) => {
// //         console.error(e);
// //         if (mounted) setError("Failed to load merchants.");
// //       })
// //       .finally(() => mounted && setLoading(false));

// //     return () => {
// //       mounted = false;
// //     };
// //   }, []);

// //   const total = data.length;
// //   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
// //   const pageSafe = Math.min(Math.max(1, page), totalPages);

// //   const current = useMemo(() => {
// //     const start = (pageSafe - 1) * PAGE_SIZE;
// //     return data.slice(start, start + PAGE_SIZE);
// //   }, [data, pageSafe]);

// //   // Navigation
// //   const goToSettlement = (merchantId) => navigate(`/settlement/${merchantId}`);
// //   const handleCreateSettlement = (merchantId) => navigate(`/settlement/${merchantId}/create`);

// //   // Open confirm helper
// //   const openConfirm = ({ title, message, onConfirm }) => {
// //     setConfirmConfig({ title, message, onConfirm });
// //     setConfirmOpen(true);
// //   };
// //   const closeConfirm = () => {
// //     setConfirmOpen(false);
// //     setConfirmConfig({ title: "", message: "", onConfirm: null });
// //   };

// //   // API actions
// //   const deleteSettlement = async (merchantId) => {
// //     await http.delete(`/api/Settlement/${merchantId}`);
// //   };
// //   const deleteMerchant = async (merchantId) => {
// //     await http.delete(`/api/Merchant/${merchantId}`);
// //   };

// //   const HEAD_COLS = 8;

// //   return (
// //     <div className="space-y-3">
// //       <div className="mb-1">
// //         <h2 className="text-lg font-semibold">Merchants</h2>
// //         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
// //       </div>

// //       <div className="overflow-auto border rounded-xl">
// //         <table className="min-w-full text-sm">
// //           <thead className="bg-gray-50">
// //             <tr className="text-left">
// //               <th className="px-4 py-3">Merchant ID</th>
// //               <th className="px-4 py-3">Name</th>
// //               <th className="px-4 py-3">Email</th>
// //               <th className="px-4 py-3">Status</th>
// //               <th className="px-4 py-3">Check Settlement</th>
// //               <th className="px-4 py-3">Create Settlement</th>
// //               <th className="px-4 py-3">Delete Settlement</th>
// //               <th className="px-4 py-3">Delete Merchant</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {loading && (
// //               <tr>
// //                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
// //                   Loading merchants…
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
// //                   No merchants found.
// //                 </td>
// //               </tr>
// //             )}

// //             {!loading &&
// //               !error &&
// //               current.map((m) => {
// //                 const id = getMerchantId(m);
// //                 const status = (m.status || "").toLowerCase();
// //                 const isActive = status === "active";

// //                 return (
// //                   <tr key={id} className="border-t">
// //                     <td className="px-4 py-3 whitespace-nowrap">{id}</td>
// //                     <td className="px-4 py-3">{m.name ?? "—"}</td>
// //                     <td className="px-4 py-3">
// //                       <span className="block truncate max-w-[240px]" title={m.email}>
// //                         {m.email ?? "—"}
// //                       </span>
// //                     </td>
// //                     <td className="px-4 py-3">
// //                       <span
// //                         className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
// //                           isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
// //                         }`}
// //                       >
// //                         {m.status ?? "—"}
// //                       </span>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <button
// //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// //                         onClick={() => goToSettlement(id)}
// //                         title="Open settlement details"
// //                       >
// //                         Check Settlement
// //                       </button>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <button
// //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// //                         onClick={() => handleCreateSettlement(id)}
// //                         title="Create a new settlement"
// //                       >
// //                         Create Settlement
// //                       </button>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <button
// //                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
// //                         onClick={() =>
// //                           openConfirm({
// //                             title: "Delete Settlement",
// //                             message: (
// //                               <div>
// //                                 Do you really want to delete the settlement for{" "}
// //                                 <strong>Merchant {id}</strong>?
// //                               </div>
// //                             ),
// //                             onConfirm: async () => {
// //                               try {
// //                                 await deleteSettlement(id);
// //                                 closeConfirm();
// //                                 alert(`Settlement deleted for Merchant ${id}`);
// //                               } catch (err) {
// //                                 console.error(err);
// //                                 closeConfirm();
// //                                 alert("Failed to delete settlement");
// //                               }
// //                             },
// //                           })
// //                         }
// //                         title="Delete an existing settlement"
// //                       >
// //                         Delete Settlement
// //                       </button>
// //                     </td>

// //                     <td className="px-4 py-3">
// //                       <button
// //                         className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
// //                         onClick={() =>
// //                           openConfirm({
// //                             title: "Delete Merchant",
// //                             message: (
// //                               <div>
// //                                 This action cannot be undone. Delete{" "}
// //                                 <strong>Merchant {id}</strong>?
// //                               </div>
// //                             ),
// //                             onConfirm: async () => {
// //                               try {
// //                                 await deleteMerchant(id);
// //                                 setData((prev) => prev.filter((x) => getMerchantId(x) !== id));
// //                                 closeConfirm();
// //                               } catch (err) {
// //                                 console.error(err);
// //                                 closeConfirm();
// //                                 alert("Failed to delete merchant");
// //                               }
// //                             },
// //                           })
// //                         }
// //                         title="Delete merchant"
// //                       >
// //                         Delete
// //                       </button>
// //                     </td>
// //                   </tr>
// //                 );
// //               })}
// //           </tbody>
// //         </table>
// //       </div>

// //       {/* Pager */}
// //       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
// //         <span className="text-sm text-gray-600">
// //           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
// //         </span>

// //         <div className="flex items-center gap-3">
// //           <button
// //             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// //             disabled={pageSafe === 1}
// //             onClick={() => setPage((p) => Math.max(1, p - 1))}
// //           >
// //             Previous
// //           </button>
// //           <button
// //             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
// //             disabled={pageSafe === totalPages}
// //             onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
// //           >
// //             Next
// //           </button>
// //         </div>
// //       </div>

// //       {/* Confirm Dialog */}
// //       <ConfirmDialog
// //         open={confirmOpen}
// //         title={confirmConfig.title}
// //         message={confirmConfig.message}
// //         onCancel={closeConfirm}
// //         onConfirm={confirmConfig.onConfirm || closeConfirm}
// //         confirmText="Okay"
// //         cancelText="Cancel"
// //       />
// //     </div>
// //   );
// // }



// // src/components/merchants/MerchantsTable.jsx
// import { useEffect, useMemo, useState, useCallback } from "react";
// import http from "../../services/http";
// import { useNavigate } from "react-router-dom";
// import ConfirmDialog from "../../common/ConfirmDialog";

// const PAGE_SIZE = 2;

// export default function MerchantsTable() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirmConfig, setConfirmConfig] = useState({
//     title: "",
//     message: "",
//     onConfirm: null,
//   });

//   const navigate = useNavigate();

//   const getMerchantId = useCallback((m) => {
//     return m.merchantId ?? m.merchantID ?? m.MerchantId ?? m.id ?? m.ID ?? m.Id;
//   }, []);

//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");
//     http
//       .get("/api/Merchant")
//       .then((res) => {
//         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
//         if (mounted) setData(items);
//       })
//       .catch((e) => {
//         console.error(e);
//         if (mounted) setError("Failed to load merchants.");
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   const total = data.length;
//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

//   // Clamp the visualized page to bounds safely
//   const pageSafe = Math.min(Math.max(1, page), totalPages);

//   // Slice current page
//   const current = useMemo(() => {
//     const start = (pageSafe - 1) * PAGE_SIZE;
//     return data.slice(start, start + PAGE_SIZE);
//   }, [data, pageSafe]);

//   // ---- Pagination helpers (same pattern as UsersTable) ----
//   const canPrev = useMemo(() => !loading && pageSafe > 1, [loading, pageSafe]);
//   const canNext = useMemo(
//     () => !loading && pageSafe < (totalPages || 1),
//     [loading, pageSafe, totalPages]
//   );

//   const gotoPrev = () => {
//     if (canPrev) setPage((p) => Math.max(1, p - 1));
//   };
//   const gotoNext = () => {
//     if (canNext) setPage((p) => Math.min((totalPages || 1), p + 1));
//   };

//   // If data shrinks (e.g., deletions), ensure we don't get stuck on an empty page
//   useEffect(() => {
//     if (page > totalPages) {
//       setPage(totalPages);
//     }
//   }, [totalPages, page]);

//   // Navigation
//   const goToSettlement = (merchantId) => navigate(`/settlement/${merchantId}`);
//   const handleCreateSettlement = (merchantId) =>
//     navigate(`/settlement/${merchantId}/create`);

//   // Open confirm helper
//   const openConfirm = ({ title, message, onConfirm }) => {
//     setConfirmConfig({ title, message, onConfirm });
//     setConfirmOpen(true);
//   };
//   const closeConfirm = () => {
//     setConfirmOpen(false);
//     setConfirmConfig({ title: "", message: "", onConfirm: null });
//   };

//   // API actions
//   const deleteSettlement = async (merchantId) => {
//     await http.delete(`/api/Settlement/${merchantId}`);
//   };
//   const deleteMerchant = async (merchantId) => {
//     await http.delete(`/api/Merchant/${merchantId}`);
//   };

//   const HEAD_COLS = 8;

//   return (
//     <div className="space-y-3">
//       <div className="mb-1">
//         <h2 className="text-lg font-semibold">Merchants</h2>
//         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
//       </div>

//       <div className="overflow-auto border rounded-xl">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="px-4 py-3">Merchant ID</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Check Settlement</th>
//               <th className="px-4 py-3">Create Settlement</th>
//               <th className="px-4 py-3">Delete Settlement</th>
//               <th className="px-4 py-3">Delete Merchant</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
//                   Loading merchants…
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

//             {!loading && !error && current.length === 0 && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">
//                   No merchants found.
//                 </td>
//               </tr>
//             )}

//             {!loading &&
//               !error &&
//               current.map((m) => {
//                 const id = getMerchantId(m);
//                 const status = (m.status || "").toLowerCase();
//                 const isActive = status === "active";

//                 return (
//                   <tr key={id} className="border-t">
//                     <td className="px-4 py-3 whitespace-nowrap">{id}</td>
//                     <td className="px-4 py-3">{m.name ?? "—"}</td>
//                     <td className="px-4 py-3">
//                       <span className="block truncate max-w-[240px]" title={m.email}>
//                         {m.email ?? "—"}
//                       </span>
//                     </td>
//                     <td className="px-4 py-3">
//                       <span
//                         className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
//                           isActive
//                             ? "bg-green-100 text-green-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {m.status ?? "—"}
//                       </span>
//                     </td>

//                     <td className="px-4 py-3">
//                       <button
//                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
//                         onClick={() => goToSettlement(id)}
//                         title="Open settlement details"
//                       >
//                         Check Settlement
//                       </button>
//                     </td>

//                     <td className="px-4 py-3">
//                       <button
//                         className="border rounded-md px-3 py-1 hover:bg-gray-50"
//                         onClick={() => handleCreateSettlement(id)}
//                         title="Create a new settlement"
//                       >
//                         Create Settlement
//                       </button>
//                     </td>

//                     <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-gray-50"
//                       onClick={() =>
//                         openConfirm({
//                           title: "Delete Settlement",
//                           message: (
//                             <div>
//                               Do you really want to delete the settlement for <strong>Merchant {id}</strong>?
//                             </div>
//                           ),
//                           onConfirm: async () => {
//                             await deleteSettlement(id);
//                             // optionally update local UI if you keep settlement state
//                           },
//                           confirmText: "Delete",
//                           cancelText: "Cancel",
//                         })
//                       }
//                     >
//                       Delete Settlement
//                     </button>
//                   </td>

//                     <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
//                       onClick={() =>
//                         openConfirm({
//                           title: "Delete Merchant",
//                           message: (
//                             <div>
//                               This action cannot be undone. Delete <strong>Merchant {id}</strong>?
//                             </div>
//                           ),
//                           onConfirm: async () => {
//                             await deleteMerchant(id);
//                             // Update list locally
//                             setData((prev) => prev.filter((x) => getMerchantId(x) !== id));
//                           },
//                           confirmText: "Delete",
//                           cancelText: "Cancel",
//                         })
//                       }
//                       title="Delete merchant"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pager */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
//         <span className="text-sm text-gray-600">
//           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
//         </span>

//         <div className="flex items-center gap-3">
//           <button
//             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
//             disabled={!canPrev}
//             onClick={gotoPrev}
//           >
//             Previous
//           </button>
//           <button
//             className="px-3 py-1.5 border rounded-md disabled:opacity-50"
//             disabled={!canNext}
//             onClick={gotoNext}
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Confirm Dialog */}
//       <ConfirmDialog
//         open={confirmOpen}
//         title={confirmConfig.title}
//         message={confirmConfig.message}
//         onCancel={closeConfirm}
//         onConfirm={confirmConfig.onConfirm || closeConfirm}
//         confirmText="Okay"
//         cancelText="Cancel"
//       />
//     </div>
//   );
// }


// src/components/merchants/MerchantsTable.jsx
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { http } from "../../services/http";
// import { useNavigate } from "react-router-dom";
// import ConfirmDialog from "../../common/ConfirmDialog";

// const PAGE_SIZE = 2;

// export default function MerchantsTable() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Confirm state
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [confirmConfig, setConfirmConfig] = useState({
//     title: "",
//     message: "",
//     onConfirm: null,
//     confirmText: "Delete",
//     cancelText: "Cancel",
//   });

//   const navigate = useNavigate();

//   const getMerchantId = useCallback(
//     (m) => m.merchantId ?? m.merchantID ?? m.MerchantId ?? m.id ?? m.ID ?? m.Id,
//     []
//   );

//   // Load table
//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");

//     http
//       .get("/api/Merchant") // make sure this matches Swagger; if it's /api/Merchants, change it here
//       .then((res) => {
//         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
//         if (mounted) setData(items);
//       })
//       .catch((e) => {
//         console.error(e);
//         if (mounted) setError("Failed to load merchants.");
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => { mounted = false; };
//   }, []);

//   // Pagination
//   const total = data.length;
//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
//   const pageSafe = Math.min(Math.max(1, page), totalPages);
//   const current = useMemo(() => {
//     const start = (pageSafe - 1) * PAGE_SIZE;
//     return data.slice(start, start + PAGE_SIZE);
//   }, [data, pageSafe]);

//   const canPrev = useMemo(() => !loading && pageSafe > 1, [loading, pageSafe]);
//   const canNext = useMemo(() => !loading && pageSafe < totalPages, [loading, pageSafe, totalPages]);
//   const gotoPrev = () => canPrev && setPage((p) => Math.max(1, p - 1));
//   const gotoNext = () => canNext && setPage((p) => Math.min(totalPages, p + 1));
//   useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);

//   // Nav helpers
//   const goToSettlement = (merchantId) => navigate(`/settlement/${merchantId}`);
//   const handleCreateSettlement = (merchantId) => navigate(`/settlement/${merchantId}/create`);

//   // Confirm helpers
//   const openConfirm = ({ title, message, onConfirm, confirmText = "Delete", cancelText = "Cancel" }) => {
//     setConfirmConfig({ title, message, onConfirm, confirmText, cancelText });
//     setConfirmOpen(true);
//   };
//   const closeConfirm = () => {
//     if (confirming) return; // avoid closing while running
//     setConfirmOpen(false);
//     setConfirmConfig({ title: "", message: "", onConfirm: null, confirmText: "Delete", cancelText: "Cancel" });
//   };
//   const runConfirm = async () => {
//     if (!confirmConfig.onConfirm) return;
//     try {
//       setConfirming(true);
//       await confirmConfig.onConfirm(); // Yes clicked — run the specific action
//       setConfirmOpen(false);
//     } catch (e) {
//       console.error(e);
//       alert(e?.response?.data?.message || e?.message || "Operation failed");
//     } finally {
//       setConfirming(false);
//     }
//   };

//   // API actions (log URL for sanity)
//   const deleteSettlement = async (merchantId) => {
//     const url = `/api/Settlement/${merchantId}`; // per your Swagger screenshot
//     console.debug("DELETE Settlement:", url);
//     await http.delete(url);
//   };
//  const deleteMerchant = async (merchantId) => {
//   if (merchantId == null) throw new Error("merchantId is missing");
//   const url = `/api/Merchant/${merchantId}`;
//   console.debug("DELETE Merchant URL:", url, "ID Type:", typeof merchantId);
//   await http.delete(url);
// };

//   const HEAD_COLS = 8;

//   return (
//     <div className="space-y-3">
//       <div className="mb-1">
//         <h2 className="text-lg font-semibold">Merchants</h2>
//         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
//       </div>

//       <div className="overflow-auto border rounded-xl">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="px-4 py-3">Merchant ID</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Check Settlement</th>
//               <th className="px-4 py-3">Create Settlement</th>
//               <th className="px-4 py-3">Delete Settlement</th>
//               <th className="px-4 py-3">Delete Merchant</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">Loading merchants…</td>
//               </tr>
//             )}

//             {!loading && error && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">{error}</td>
//               </tr>
//             )}

//             {!loading && !error && current.length === 0 && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">No merchants found.</td>
//               </tr>
//             )}

//             {!loading && !error && current.map((m) => {
//               const id = getMerchantId(m);
//               const status = (m.status || "").toLowerCase();
//               const isActive = status === "active";

//               return (
//                 <tr key={id} className="border-t">
//                   <td className="px-4 py-3 whitespace-nowrap">{id}</td>
//                   <td className="px-4 py-3">{m.name ?? "—"}</td>
//                   <td className="px-4 py-3">
//                     <span className="block truncate max-w-[240px]" title={m.email}>{m.email ?? "—"}</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
//                       isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
//                     }`}>
//                       {m.status ?? "—"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button className="border rounded-md px-3 py-1 hover:bg-gray-50" type="button"
//                       onClick={() => goToSettlement(id)}>
//                       Check Settlement
//                     </button>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button className="border rounded-md px-3 py-1 hover:bg-gray-50" type="button"
//                       onClick={() => handleCreateSettlement(id)}>
//                       Create Settlement
//                     </button>
//                   </td>

//                   {/* Delete Settlement — uses same dialog, different action */}
//                   <td className="px-4 py-3">
//                     <button className="border rounded-md px-3 py-1 hover:bg-gray-50" type="button"
//                       onClick={() => openConfirm({
//                         title: "Delete Settlement",
//                         message: (
//                           <div>
//                             Do you really want to delete the settlement for <strong>Merchant {id}</strong>?
//                           </div>
//                         ),
//                         onConfirm: async () => {
//                           await deleteSettlement(id);
//                           // If you maintain settlement state locally, update it here
//                         },
//                         confirmText: "Delete",
//                         cancelText: "Cancel",
//                       })}
//                       title="Delete an existing settlement">
//                       Delete Settlement
//                     </button>
//                   </td>

//                   {/* Delete Merchant — uses same dialog, different action */}
//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
//                       type="button"
//                       onClick={() => openConfirm({
//                         title: "Delete Merchant",
//                         message: (
//                           <div>
//                             This action cannot be undone. Delete <strong>Merchant {id}</strong>?
//                           </div>
//                         ),
//                         onConfirm: async () => {
//                           await deleteMerchant(id);
//                           setData((prev) => prev.filter((x) => getMerchantId(x) !== id));
//                         },
//                         confirmText: "Delete",
//                         cancelText: "Cancel",
//                       })}
//                       title="Delete merchant"
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

//       {/* Pager */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
//         <span className="text-sm text-gray-600">
//           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
//         </span>

//         <div className="flex items-center gap-3">
//           <button className="px-3 py-1.5 border rounded-md disabled:opacity-50" disabled={!canPrev} onClick={gotoPrev} type="button">
//             Previous
//           </button>
//           <button className="px-3 py-1.5 border rounded-md disabled:opacity-50" disabled={!canNext} onClick={gotoNext} type="button">
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Confirm Dialog (shared) */}
//       <ConfirmDialog
//         open={confirmOpen}
//         title={confirmConfig.title}
//         message={confirmConfig.message}
//         confirmText={confirmConfig.confirmText}
//         cancelText={confirmConfig.cancelText}
//         confirming={confirming}
//         onCancel={closeConfirm}
//         onConfirm={async () => {
//           // The *only* function the Yes button calls
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



// ...imports remain same
// import { useEffect, useMemo, useState, useCallback } from "react";
// import { http } from "../../services/http";
// import { useNavigate } from "react-router-dom";
// import ConfirmDialog from "../../common/ConfirmDialog";

// const PAGE_SIZE = 2;

// export default function MerchantsTable() {
//   const [data, setData] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Confirm state — keep as-is for Merchant delete use
//   const [confirmOpen, setConfirmOpen] = useState(false);
//   const [confirming, setConfirming] = useState(false);
//   const [confirmConfig, setConfirmConfig] = useState({
//     title: "",
//     message: "",
//     onConfirm: null,
//     confirmText: "Delete",
//     cancelText: "Cancel",
//   });

//   const navigate = useNavigate();

//   const getMerchantId = useCallback(
//     (m) => m.merchantId ?? m.merchantID ?? m.MerchantId ?? m.id ?? m.ID ?? m.Id,
//     []
//   );

//   // Load table — unchanged
//   useEffect(() => {
//     let mounted = true;
//     setLoading(true);
//     setError("");

//     http
//       .get("/api/Merchant")
//       .then((res) => {
//         const items = Array.isArray(res?.data?.data) ? res.data.data : [];
//         if (mounted) setData(items);
//       })
//       .catch((e) => {
//         console.error(e);
//         if (mounted) setError("Failed to load merchants.");
//       })
//       .finally(() => mounted && setLoading(false));

//     return () => { mounted = false; };
//   }, []);

//   // Pagination — unchanged
//   const total = data.length;
//   const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
//   const pageSafe = Math.min(Math.max(1, page), totalPages);
//   const current = useMemo(() => {
//     const start = (pageSafe - 1) * PAGE_SIZE;
//     return data.slice(start, start + PAGE_SIZE);
//   }, [data, pageSafe]);

//   const canPrev = useMemo(() => !loading && pageSafe > 1, [loading, pageSafe]);
//   const canNext = useMemo(() => !loading && pageSafe < totalPages, [loading, pageSafe, totalPages]);
//   const gotoPrev = () => canPrev && setPage((p) => Math.max(1, p - 1));
//   const gotoNext = () => canNext && setPage((p) => Math.min(totalPages, p + 1));
//   useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);

//   // 🔗 NEW: go to the dedicated settlements page for this merchant
//   const goToSettlement = (merchantId) => navigate(`/settlements/merchant/${merchantId}`);

//   const openConfirm = ({ title, message, onConfirm, confirmText = "Delete", cancelText = "Cancel" }) => {
//     setConfirmConfig({ title, message, onConfirm, confirmText, cancelText });
//     setConfirmOpen(true);
//   };
//   const closeConfirm = () => {
//     if (confirming) return;
//     setConfirmOpen(false);
//     setConfirmConfig({ title: "", message: "", onConfirm: null, confirmText: "Delete", cancelText: "Cancel" });
//   };

//   // Only keep merchant delete here
//   const deleteMerchant = async (merchantId) => {
//     if (merchantId == null) throw new Error("merchantId is missing");
//     const url = `/api/Merchant/${merchantId}`;
//     console.debug("DELETE Merchant URL:", url, "ID Type:", typeof merchantId);
//     await http.delete(url);
//   };

//   // 👇 HEAD_COLS reduced by one (we removed Delete Settlement column)
//   const HEAD_COLS = 7;

//   return (
//     <div className="space-y-3">
//       <div className="mb-1">
//         <h2 className="text-lg font-semibold">Merchants</h2>
//         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
//       </div>

//       <div className="overflow-auto border rounded-xl">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="px-4 py-3">Merchant ID</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Check Settlement</th>
//               <th className="px-4 py-3">Create Settlement</th>
//               <th className="px-4 py-3">Delete Merchant</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">Loading merchants…</td>
//               </tr>
//             )}

//             {!loading && error && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">{error}</td>
//               </tr>
//             )}

//             {!loading && !error && current.length === 0 && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">No merchants found.</td>
//               </tr>
//             )}

//             {!loading && !error && current.map((m) => {
//               const id = getMerchantId(m);
//               const status = (m.status || "").toLowerCase();
//               const isActive = status === "active";

//               return (
//                 <tr key={id} className="border-t">
//                   <td className="px-4 py-3 whitespace-nowrap">{id}</td>
//                   <td className="px-4 py-3">{m.name ?? "—"}</td>
//                   <td className="px-4 py-3">
//                     <span className="block truncate max-w-[240px]" title={m.email}>{m.email ?? "—"}</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
//                       isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
//                     }`}>
//                       {m.status ?? "—"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-gray-50"
//                       type="button"
//                       onClick={() => goToSettlement(id)}
//                     >
//                       Check Settlement
//                     </button>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-gray-50"
//                       type="button"
//                       onClick={() => navigate(`/settlement/${id}/create`)}
//                     >
//                       Create Settlement
//                     </button>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
//                       type="button"
//                       onClick={() => openConfirm({
//                         title: "Delete Merchant",
//                         message: (
//                           <div>
//                             This action cannot be undone. Delete <strong>Merchant {id}</strong>?
//                           </div>
//                         ),
//                         onConfirm: async () => {
//                           await deleteMerchant(id);
//                           setData((prev) => prev.filter((x) => getMerchantId(x) !== id));
//                         },
//                         confirmText: "Delete",
//                         cancelText: "Cancel",
//                       })}
//                       title="Delete merchant"
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

//       {/* Pager */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
//         <span className="text-sm text-gray-600">
//           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
//         </span>

//         <div className="flex items-center gap-3">
//           <button className="px-3 py-1.5 border rounded-md disabled:opacity-50" disabled={!canPrev} onClick={gotoPrev} type="button">
//             Previous
//           </button>
//           <button className="px-3 py-1.5 border rounded-md disabled:opacity-50" disabled={!canNext} onClick={gotoNext} type="button">
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Confirm Dialog (shared) */}
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
  const HEAD_COLS = 6;

//   return (
//     <div className="space-y-3">
//       <div className="mb-1">
//         <h2 className="text-lg font-semibold">Merchants</h2>
//         <p className="text-sm text-gray-500">View and manage merchant accounts</p>
//       </div>

//       <div className="overflow-auto border rounded-xl">
//         <table className="min-w-full text-sm">
//           <thead className="bg-gray-50">
//             <tr className="text-left">
//               <th className="px-4 py-3">Merchant ID</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Status</th>
//               <th className="px-4 py-3">Check Settlement</th>
//               <th className="px-4 py-3">Delete Merchant</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">Loading merchants…</td>
//               </tr>
//             )}

//             {!loading && error && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-red-600">{error}</td>
//               </tr>
//             )}

//             {!loading && !error && current.length === 0 && (
//               <tr>
//                 <td colSpan={HEAD_COLS} className="px-4 py-6 text-gray-500">No merchants found.</td>
//               </tr>
//             )}

//             {!loading && !error && current.map((m) => {
//               const id = getMerchantId(m);
//               const status = (m.status || "").toLowerCase();
//               const isActive = status === "active";

//               return (
//                 <tr key={id} className="border-t">
//                   <td className="px-4 py-3 whitespace-nowrap">{id}</td>
//                   <td className="px-4 py-3">{m.name ?? "—"}</td>
//                   <td className="px-4 py-3">
//                     <span className="block truncate max-w-[240px]" title={m.email}>{m.email ?? "—"}</span>
//                   </td>
//                   <td className="px-4 py-3">
//                     <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
//                       isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
//                     }`}>
//                       {m.status ?? "—"}
//                     </span>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-gray-50"
//                       type="button"
//                       onClick={() => goToSettlement(id)}
//                     >
//                       Check Settlement
//                     </button>
//                   </td>

//                   <td className="px-4 py-3">
//                     <button
//                       className="border rounded-md px-3 py-1 hover:bg-red-50 text-red-700 border-red-300"
//                       type="button"
//                       onClick={() =>
//                         openConfirm({
//                           title: "Delete Merchant",
//                           message: (
//                             <div>
//                               This action cannot be undone. Delete <strong>Merchant {id}</strong>?
//                             </div>
//                           ),
//                           onConfirm: async () => {
//                             await deleteMerchant(id);
//                             setData((prev) => prev.filter((x) => getMerchantId(x) !== id));
//                           },
//                           confirmText: "Delete",
//                           cancelText: "Cancel",
//                         })
//                       }
//                       title="Delete merchant"
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

//       {/* Pager */}
//       <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
//         <span className="text-sm text-gray-600">
//           Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
//         </span>

//         <div className="flex items-center gap-3">
//           <button className="px-3 py-1.5 border rounded-md disabled:opacity-50" disabled={!canPrev} onClick={gotoPrev} type="button">
//             Previous
//           </button>
//           <button className="px-3 py-1.5 border rounded-md disabled:opacity-50" disabled={!canNext} onClick={gotoNext} type="button">
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Confirm Dialog (shared) */}
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

  return (
  <div className="space-y-3">
    <div className="mb-1">
      <h2 className="text-lg font-semibold">Merchants</h2>
      <p className="text-sm text-slate-500">View and manage merchant accounts</p>
    </div>

    <div className="overflow-auto border border-cyan-100 rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-cyan-50">
          <tr className="text-left">
            <th className="px-4 py-3">Merchant ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Check Settlement</th>
            <th className="px-4 py-3">Delete Merchant</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan={HEAD_COLS} className="px-4 py-6 text-slate-500">Loading merchants…</td>
            </tr>
          )}

          {!loading && error && (
            <tr>
              <td colSpan={HEAD_COLS} className="px-4 py-6 text-rose-700">{error}</td>
            </tr>
          )}

          {!loading && !error && current.length === 0 && (
            <tr>
              <td colSpan={HEAD_COLS} className="px-4 py-6 text-slate-500">No merchants found.</td>
            </tr>
          )}

          {!loading && !error && current.map((m) => {
            const id = getMerchantId(m);
            const status = (m.status || "").toLowerCase();
            const isActive = status === "active";

            return (
              <tr key={id} className="border-t hover:bg-cyan-50/50">
                <td className="px-4 py-3 whitespace-nowrap">{id}</td>
                <td className="px-4 py-3">{m.name ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className="block truncate max-w-[240px]" title={m.email}>{m.email ?? "—"}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${
                    isActive ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                  }`}>
                    {m.status ?? "—"}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <button
                    className="border border-cyan-200 rounded-md px-3 py-1 bg-white text-slate-700 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                    type="button"
                    onClick={() => goToSettlement(id)}
                  >
                    Check Settlement
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button
                    className="rounded-md px-3 py-1 bg-rose-800 text-white hover:bg-rose-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400/40"
                    type="button"
                    onClick={() =>
                      openConfirm({
                        title: "Delete Merchant",
                        message: (
                          <div>
                            This action cannot be undone. Delete <strong>Merchant {id}</strong>?
                          </div>
                        ),
                        onConfirm: async () => {
                          await deleteMerchant(id);
                          setData((prev) => prev.filter((x) => getMerchantId(x) !== id));
                        },
                        confirmText: "Delete",
                        cancelText: "Cancel",
                      })
                    }
                    title="Delete merchant"
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

    {/* Pager */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-between">
      <span className="text-sm text-slate-600">
        Showing {current.length} of {total} &nbsp;|&nbsp; Page {pageSafe} / {totalPages}
      </span>

      <div className="flex items-center gap-3">
        <button
          className="px-3 py-1.5 border border-cyan-200 rounded-md disabled:opacity-50 bg-white hover:bg-cyan-50"
          disabled={!canPrev}
          onClick={gotoPrev}
          type="button"
        >
          Previous
        </button>
        <button
          className="px-3 py-1.5 border border-cyan-200 rounded-md disabled:opacity-50 bg-white hover:bg-cyan-50"
          disabled={!canNext}
          onClick={gotoNext}
          type="button"
        >
          Next
        </button>
      </div>
    </div>

    {/* ConfirmDialog props unchanged */}
  </div>
);

}