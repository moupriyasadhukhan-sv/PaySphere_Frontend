// src/pages/Dashboards/AdminDashboard.jsx
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import LogoutButton from "../../common/LogoutButton";
import { useAuth } from "../../context/AuthContext";
import SummaryCards from "./SummaryCards";
import UsersTable from "../../components/users/UsersTable";
import MerchantsTable from "../../components/merchants/MerchantsTable";

export default function AdminDashboard() {
  const { auth } = useAuth();
  const [tab, setTab] = useState("users");
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="w-full px-6 py-3 bg-white border-b flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage users, merchants, and system operations</p>
        </div>
        <div className="flex items-center gap-3">
          
        <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"

            onClick={() => navigate("/dashboard/admin/register-staff")}
            
          >
            Register Staff
          </button>

          <span className="text-sm text-gray-600">Role: {auth?.role}</span>
          <LogoutButton />
        </div>
      </header>

      <main className="p-6 space-y-6">
        {/* Summary cards */}
        <SummaryCards />

        {/* Tabs */}
        <div className="flex items-center gap-2">
          {["users", "merchants", "transactions", "reports"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full border text-sm ${
                tab === t
                  ? "bg-indigo-50 border-indigo-300 text-indigo-700"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Panels */}
        <section className="bg-white border rounded-xl p-4">
          {tab === "users" && <UsersTable />}
          {tab === "merchants" && <MerchantsTable />}
          {tab === "transactions" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">Transaction History</h2>
              <p className="text-sm text-gray-500">
                Plug your transactions endpoint when ready (e.g., <code>/api/Transactions</code>).
              </p>
            </div>
          )}
          {tab === "reports" && (
            <div>
              <h2 className="text-lg font-semibold mb-1">Audit Logs</h2>
              <p className="text-sm text-gray-500">
                Wire to <code>/api/AuditLogs</code> once you share the response shape.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}