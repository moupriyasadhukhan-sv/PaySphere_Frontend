// src/components/dashboard/DashboardShell.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import * as signalR from "@microsoft/signalr";
import { buildNotificationsHub, getConnection } from "../../services/notifications/notificationsHub";
import {
  listMerchantRefundRequests,
  approveRefundRequest,
  rejectRefundRequest,
} from "../../services/refunds/refundRequestsApi";
 
/* ---------------- Icons & helpers ---------------- */
function BellIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22z" />
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7z" />
    </svg>
  );
}
function localKey(prefix = "n") {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}
function normalize(type, payload) {
  const key = String(payload?.id || payload?.requestId || localKey("evt"));
  return { _key: key, type, ...payload, read: false };
}
 
/* ---------------- Shell ---------------- */
export default function DashboardShell({
  brand = "PaySphere",
  navItems = [],
  variant = "user", // 'user' | 'merchant'
  onLogout = () => console.log("Logout clicked"),
}) {
  const location = useLocation();
  console.log("navItems",navItems);
  // Redux auth (no AuthContext)
  const accessToken = useSelector((s) => s.auth?.accessToken);
  const role = useSelector((s) => s.auth?.role);
  const isMerchant = role === "Merchant";
 
  // Notifications (local state; no NotificationContext)
  const [items, setItems] = useState([]);
  const [bellOpen, setBellOpen] = useState(false);
 
  // Start SignalR hub + preload merchant pending requests
  useEffect(() => {
  if (!accessToken) return;   // wait until token is available

  let mounted = true;

  // Always get the SAME hub instance
  const conn = buildNotificationsHub();

  // Remove old listeners (prevents duplication and memory leaks)
  conn.off("refundRequested");
  conn.off("refundApproved");
  conn.off("refundRejected");

  // Register listeners
  conn.on("refundRequested", (payload) => {
    if (!mounted) return;
    setItems((prev) => [normalize("refundRequested", payload), ...prev]);
  });

  conn.on("refundApproved", (payload) => {
    if (!mounted) return;
    setItems((prev) => [normalize("refundApproved", payload), ...prev]);
  });

  conn.on("refundRejected", (payload) => {
    if (!mounted) return;
    setItems((prev) => [normalize("refundRejected", payload), ...prev]);
  });

  // Start connection ONLY if currently disconnected
  if (conn.state === signalR.HubConnectionState.Disconnected) {
    conn.start().catch(err => {
      console.error("SignalR start error:", err);
    });
  }

  // Merchant preload logic
  (async () => {
    if (!mounted || !isMerchant) return;

    try {
      const pending = await listMerchantRefundRequests();
      const normalized = pending.map((p) =>
        normalize("refundRequested", { ...p, id: p.id })
      );

      setItems((prev) => {
        const existingKeys = new Set(prev.map((x) => x._key));
        return [
          ...normalized.filter((n) => !existingKeys.has(n._key)),
          ...prev,
        ];
      });
    } catch {
      // ignore preload errors
    }
  })();

  // Cleanup: remove listeners only
  return () => {
    mounted = false;
    conn.off("refundRequested");
    conn.off("refundApproved");
    conn.off("refundRejected");
    // ❗ DO NOT conn.stop() — stopping breaks negotiation next time
  };

}, [accessToken, isMerchant]);
 
  // Badge = unread refundRequested needing attention
  const badge = useMemo(
    () => items.filter((n) => n.type === "refundRequested" && !n.read).length,
    [items]
  );
 
  // Notification helpers
  function markAsRead(key) {
    setItems((prev) => prev.map((n) => (n._key === key ? { ...n, read: true } : n)));
  }
  function clearOne(key) {
    setItems((prev) => prev.filter((n) => n._key !== key));
  }
  function clearAll() {
    setItems([]);
  }
  async function onApprove(id) {
    await approveRefundRequest(id);
    setItems((prev) => prev.filter((n) => n.id !== id)); // remove the request item
  }
  async function onReject(id) {
    await rejectRefundRequest(id);
    setItems((prev) => prev.filter((n) => n.id !== id));
  }
 
  // Navigation helpers (breadcrumbs)
  const activeItem =
    navItems.find(
      (i) => i.path && location.pathname.toLowerCase().startsWith(i.path.toLowerCase())
    ) ||
    navItems.find((i) => i.path && i.path.toLowerCase() === location.pathname.toLowerCase());
 
  const isHome =
    (variant === "user" && location.pathname === "/dashboard/user") ||
    (variant === "merchant" && location.pathname === "/dashboard/merchant");
 
  const sectionTitle = variant === "merchant" ? "Merchant Dashboard" : "User Dashboard";
  const crumb =
    activeItem?.label || (isHome ? "Home" : location.pathname.split("/").slice(-1)[0] || "Home");
 
  return (
    <div style={{ backgroundColor: "#F8FAFC", color: "#0F172A" }} className="min-h-screen flex">
      <Sidebar brand={brand} items={navItems} onLogout={onLogout} />
 
      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">{sectionTitle}</h1>
            <span className="text-xs text-slate-500">/ {crumb}</span>
          </div>
 
          <div className="flex items-center gap-3 relative">
            {/* Bell */}
            <button
              onClick={() => setBellOpen((o) => !o)}
              className="relative p-2 rounded-full hover:bg-slate-100 transition"
              aria-label="Notifications"
            >
              <BellIcon className="h-6 w-6 text-slate-600" />
              {badge > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] leading-none bg-red-600 text-white rounded-full px-1 py-0.5">
                  {badge}
                </span>
              )}
            </button>
 
            {/* Dropdown */}
            {bellOpen && (
              <div className="absolute right-0 top-10 w-96 bg-white border rounded shadow-lg max-h-96 overflow-auto z-50">
                <div className="p-2 font-semibold border-b flex items-center justify-between">
                  <span>Notifications</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => items.forEach((n) => markAsRead(n._key))}
                      className="text-xs text-slate-600 hover:text-slate-800"
                      title="Mark all read"
                    >
                      Mark all read
                    </button>
                    <button
                      onClick={clearAll}
                      className="text-xs text-slate-600 hover:text-slate-800"
                      title="Clear all"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
 
                {items.length === 0 && <div className="p-3 text-slate-500">No notifications</div>}
 
                {items.map((n) => (
                  <div key={n._key} className="p-3 border-b">
                    <div className="flex items-start justify-between">
                      <div
                        className="font-medium cursor-pointer"
                        onClick={() => markAsRead(n._key)}
                        title="Mark as read"
                      >
                        {n.type === "refundRequested" && "Refund requested"}
                        {n.type === "refundApproved" && "Refund approved"}
                        {n.type === "refundRejected" && "Refund rejected"}
                        {!n.read && (
                          <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500 align-middle" />
                        )}
                      </div>
                      <button
                        onClick={() => clearOne(n._key)}
                        className="text-xs text-slate-500 hover:text-slate-800"
                        title="Dismiss"
                      >
                        Dismiss
                      </button>
                    </div>
 
                    {/* Body */}
                    {n.type === "refundRequested" && (
                      <>
                        <div
                          className="text-sm text-slate-600 mt-1 cursor-pointer"
                          onClick={() => markAsRead(n._key)}
                          title="Mark as read"
                        >
                          Txn #{n.originalTransactionID} • ₹{n.amount} • Phone: {n.phone}
                        </div>
                        {isMerchant && (
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => onApprove(n.id)}
                              className="px-2 py-1 rounded bg-green-600 text-white"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => onReject(n.id)}
                              className="px-2 py-1 rounded bg-slate-200"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </>
                    )}
 
                    {n.type === "refundApproved" && (
                      <div
                        className="text-green-700 text-sm mt-1 cursor-pointer"
                        onClick={() => markAsRead(n._key)}
                        title="Mark as read"
                      >
                        Refund approved • Txn #{n.originalTransactionID}
                      </div>
                    )}
 
                    {n.type === "refundRejected" && (
                      <div
                        className="text-amber-700 text-sm mt-1 cursor-pointer"
                        onClick={() => markAsRead(n._key)}
                        title="Mark as read"
                      >
                        Refund rejected • Txn #{n.originalTransactionID}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
 
            {/* Avatar placeholder */}
            <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300" />
          </div>
        </header>
 
        {/* Content */}
        <section className="p-8">
          {isHome ? (
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Welcome to <span style={{ color: "#10B981" }}>PaySphere</span>
              </h2>
              <p className="mt-2 text-slate-600">Use the navbar options for a smooth experience.</p>
            </div>
          ) : (
            <Outlet />
          )}
        </section>
      </main>
    </div>
  );
}
 