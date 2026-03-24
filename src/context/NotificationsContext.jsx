// // src/context/NotificationsContext.jsx
// import { createContext, useContext, useEffect, useMemo, useState } from "react";
// import { buildNotificationsHub, getConnection } from "../services/notifications/notificationsHub";
// import { useAuth } from "./AuthContext.jsx";
// import {
//   listMerchantRefundRequests,
//   approveRefundRequest,
//   rejectRefundRequest,
// } from "../services/refunds/refundRequestsApi";

// /**
//  * A small helper to make a local id for events that might not carry an id.
//  * In your current flow, refundRequested/approved/rejected carry a request id,
//  * so this is mostly a fallback.
//  */
// function localKey(prefix = "n") {
//   return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
// }

// /**
//  * Normalize inbound payloads from SignalR or preload list
//  * and add client-side fields for UI: read=false, _key (unique)
//  */
// function normalizeIncoming(item) {
//   const key = item?.id || item?.requestId || localKey("evt");
//   return {
//     ...item,
//     _key: key,
//     read: false,
//   };
// }

// const NotificationsContext = createContext();

// export function NotificationsProvider({ children }) {
//   const { auth } = useAuth();
//   const [items, setItems] = useState([]); // [{ type, id, originalTransactionID, amount, phone, read, _key, ... }]
//   const isMerchant = auth?.role === "Merchant";

//   useEffect(() => {
//     let mounted = true;
//     if (!auth?.token) return;

//     const conn = buildNotificationsHub(() => auth.token);

//     // Incoming events
//     conn.on("refundRequested", (payload) => {
//       if (!mounted) return;
//       const n = normalizeIncoming({ type: "refundRequested", ...payload });
//       setItems((prev) => [n, ...prev]);
//     });
//     conn.on("refundApproved", (payload) => {
//       if (!mounted) return;
//       const n = normalizeIncoming({ type: "refundApproved", ...payload });
//       setItems((prev) => [n, ...prev]);
//     });
//     conn.on("refundRejected", (payload) => {
//       if (!mounted) return;
//       const n = normalizeIncoming({ type: "refundRejected", ...payload });
//       setItems((prev) => [n, ...prev]);
//     });

//     conn.start().catch(() => {});

//     // Preload pending (merchant only) on refresh so bell shows current requests
//     (async () => {
//       if (!mounted || !isMerchant) return;
//       try {
//         const pending = await listMerchantRefundRequests();
//         // Preload as unread "refundRequested" items
//         const normalized = pending.map((p) =>
//           normalizeIncoming({
//             type: "refundRequested",
//             ...p,
//             id: p.id, // ensure id is present
//           })
//         );
//         // Avoid duplicating already-present items by _key
//         setItems((prev) => {
//           const existingKeys = new Set(prev.map((x) => x._key));
//           const merged = [...normalized.filter((n) => !existingKeys.has(n._key)), ...prev];
//           return merged;
//         });
//       } catch {
//         // swallow preload errors silently
//       }
//     })();

//     return () => {
//       mounted = false;
//       try {
//         getConnection()?.stop();
//       } catch {}
//     };
//   }, [auth?.token, auth?.role]);

//   // Badge shows only UNREAD refundRequested items (what needs attention)
//   const badge = items.filter((n) => n.type === "refundRequested" && !n.read).length;

//   // ----- New helpers -----
//   function markAsRead(key) {
//     setItems((prev) => prev.map((n) => (n._key === key ? { ...n, read: true } : n)));
//   }
//   function markAllAsRead() {
//     setItems((prev) => prev.map((n) => ({ ...n, read: true })));
//   }
//   function clearOne(key) {
//     setItems((prev) => prev.filter((n) => n._key !== key));
//   }
//   function clearAll() {
//     setItems([]);
//   }

//   const value = useMemo(
//     () => ({
//       items,
//       setItems,
//       badge,
//       isMerchant,
//       // existing actions
//       async approve(id) {
//         await approveRefundRequest(id);
//         // On success, remove the matching "refundRequested" item for this id
//         setItems((prev) => prev.filter((n) => n.id !== id));
//       },
//       async reject(id) {
//         await rejectRefundRequest(id);
//         // On success, remove the matching "refundRequested" item for this id
//         setItems((prev) => prev.filter((n) => n.id !== id));
//       },
//       // new actions for clearing/marking
//       markAsRead,
//       markAllAsRead,
//       clearOne,
//       clearAll,
//     }),
//     [items, isMerchant]
//   );

//   return <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>;
// }

// export const useNotifications = () => useContext(NotificationsContext);