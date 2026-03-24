// // src/pages/Dashboards/AdminDashboard.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import LogoutButton from "../../common/LogoutButton";
// import { useAuth } from "../../context/AuthContext";
// import SummaryCards from "./SummaryCards";
// import UsersTable from "../../components/users/UsersTable";
// // If your file is MerchantTable.jsx (singular), import it singular:
// import MerchantTable from "../../components/merchants/MerchantsTable";
// import TransactionsTable from "../../components/transactions/TransactionsTable";
// import AuditLogsTable from "../../components/audit/AuditLogsTable";
// export default function AdminDashboard() {
//   const { auth } = useAuth();
//   const [tab, setTab] = useState("users");
//   const navigate = useNavigate();

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="w-full px-6 py-3 bg-white border-b flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//           <p className="text-sm text-gray-500">Manage users, merchants, and system operations</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
//             onClick={() => navigate("/dashboard/admin/register-staff")}
//           >
//             Register Staff
//           </button>
          
//           <LogoutButton />
//         </div>
//       </header>

//       <main className="p-6 space-y-6">
//         {/* Summary cards */}
//         <SummaryCards />

//         {/* Tabs */}
//         <div className="flex items-center gap-2">
//           {["users", "merchants", "transactions", "reports" ,"auditLog"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`px-4 py-2 rounded-full border text-sm ${
//                 tab === t
//                   ? "bg-indigo-50 border-indigo-300 text-indigo-700"
//                   : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {t[0].toUpperCase() + t.slice(1)}
//             </button>
//           ))}
//         </div>

//         {/* Panels */}
//         <section className="bg-white border rounded-xl p-4">
//           {tab === "users" && <UsersTable />}
//           {tab === "merchants" && <MerchantTable />}
          
//             {tab === "transactions" && (
//               <div>
//                 <h2 className="text-lg font-semibold mb-3">Transaction History</h2>
//                 <TransactionsTable />
//               </div>
//             )}

//           {tab === "reports" && (
//             <div>
//               <h2 className="text-lg font-semibold mb-1">Report</h2>
//               <p className="text-sm text-gray-500">
//                 Wire to <code>/api/AuditLogs</code> once you share the response shape.
//               </p>
//             </div>
//           )}

           
//           {tab === "users" && <AuditLogsTable />}

//         </section>
//       </main>
//     </div>
//   );
// }

// src/pages/Dashboards/AdminDashboard.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// import LogoutButton from "../../common/LogoutButton";
// import { useAuth } from "../../context/AuthContext";
// import SummaryCards from "./SummaryCards";
// import UsersTable from "../../components/users/UsersTable";
// import MerchantTable from "../../components/merchants/MerchantsTable";
// import TransactionsTable from "../../components/transactions/TransactionsTable";
// import AuditLogsTable from "../../components/audit/AuditLogsTable";

// export default function AdminDashboard() {
//   const { auth } = useAuth();
//   const [tab, setTab] = useState("users");
//   const navigate = useNavigate();
//   const outlet = useOutlet();
//   // Single source of truth for tab keys
//   const tabs = ["users", "merchants", "transactions", "reports", "auditLog"];

//   const renderLabel = (t) => {
//     // Make "auditLog" look nice -> "Audit Log"
//     if (t === "auditLog") return "Audit Log";
//     return t[0].toUpperCase() + t.slice(1);
//   };
// if (outlet) {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <header className="w-full px-6 py-3 bg-white border-b flex items-center justify-between">
//         <div>
//           <h1 className="text-xl font-semibold">Admin Dashboard</h1>
//           <p className="text-sm text-gray-500">Manage users, merchants, and system operations</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             type="button"
//             className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3 py-2 text-white hover:bg-indigo-700"
//             onClick={() => navigate("/dashboard/admin/register-staff")}
//           >
//             Register Staff
//           </button>
//           <LogoutButton />
//         </div>
//       </header>

//       <main className="p-6 space-y-6">
//         {/* Summary cards */}
//         <SummaryCards />

//         {/* Tabs */}
//         <div className="flex items-center gap-2">
//           {tabs.map((t) => (
//             <button
//               key={t}
//               onClick={() => setTab(t)}
//               className={`px-4 py-2 rounded-full border text-sm ${
//                 tab === t
//                   ? "bg-indigo-50 border-indigo-300 text-indigo-700"
//                   : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {renderLabel(t)}
//             </button>
//           ))}
//         </div>

//         {/* Panels */}
//         <section className="bg-white border rounded-xl p-4">
//           {tab === "users" && <UsersTable />}

//           {tab === "merchants" && <MerchantTable />}

//           {tab === "transactions" && (
//             <div>
//               <h2 className="text-lg font-semibold mb-3">Transaction History</h2>
//               <TransactionsTable />
//             </div>
//           )}

//           {tab === "reports" && (
//             <div>
//               <h2 className="text-lg font-semibold mb-1">Report</h2>
//               <p className="text-sm text-gray-500">
//                 Wire to <code>/api/AuditLogs</code> once you share the response shape.
//               </p>
//             </div>
//           )}

//           {/* ✅ Correct condition for Audit Logs tab */}
//           {tab === "auditLog" && <AuditLogsTable />}
//         </section>

//       </main>
//     </div>
//   );
// }


// src/pages/Dashboards/AdminDashboard.jsx
import { useState } from "react";
import { useNavigate, useOutlet } from "react-router-dom";

import LogoutButton from "../../common/LogoutButton";
//import { useAuth } from "../../context/AuthContext";
import SummaryCards from "./SummaryCards";
import UsersTable from "../../components/users/UsersTable";
import MerchantTable from "../../components/merchants/MerchantsTable";
import TransactionsTable from "../../components/transactions/TransactionsTable";
import AuditLogsTable from "../../components/audit/AuditLogsTable";

export default function AdminDashboard() {
 // const { auth } = useAuth();
  const [tab, setTab] = useState("users");
  const navigate = useNavigate();
  const outlet = useOutlet(); // 👈 IMPORTANT

  const tabs = ["users", "merchants", "transactions", "reports", "auditLog"];

  const renderLabel = (t) => (t === "auditLog" ? "Audit Log" : t[0].toUpperCase() + t.slice(1));
if (outlet) {
  return (
    <div className="min-h-screen 
      bg-gradient-to-br 
      from-black via-[#12021f] to-[#3d0057]
      text-white">

      {/* NAVBAR */}
      <header className="
        w-full px-6 py-3 
        bg-black/40 backdrop-blur-xl 
        shadow-lg border-b border-white/10
        flex items-center justify-between
      ">
        <div>
          <h1 className="text-xl font-semibold tracking-wide">Admin Dashboard</h1>
          <p className="text-sm text-gray-300">
            Manage users, merchants, and system operations
          </p>
        </div>

        <div className="flex items-center gap-3">

          {/* Register Staff Button */}
          <button
            type="button"
            onClick={() => navigate('/dashboard/admin/register-staff')}
            className="
              inline-flex items-center gap-2 
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-purple-500 to-pink-600
              text-white font-medium shadow-md 
              hover:scale-105 hover:shadow-[0_0_10px_#d946ef]
              transition-all duration-200
            "
          >
            Register Staff
          </button>

          <LogoutButton />
        </div>
      </header>

      {/* CONTENT */}
      <main className="p-6 space-y-6">{outlet}</main>
    </div>
  );
}

/* MAIN ADMIN DASHBOARD */
return (
  <div className="min-h-screen 
    bg-gradient-to-br 
    from-black via-[#12021f] to-[#3d0057]
    text-white">

    {/* NAVBAR */}
    <header className="
      w-full px-6 py-3 
      bg-black/40 backdrop-blur-xl 
      border-b border-white/10 shadow-lg
      flex items-center justify-between
    ">
      <div>
        <h1 className="text-xl font-semibold tracking-wide">Admin Dashboard</h1>
        <p className="text-sm text-gray-300">
          Manage users, merchants, and system operations
        </p>
      </div>

      <div className="flex items-center gap-3">

        {/* Register Staff Button */}
        <button
          type="button"
          onClick={() => navigate('/dashboard/admin/register-staff')}
          className="
            inline-flex items-center gap-2 
            px-4 py-2 rounded-lg
            bg-gradient-to-r from-purple-500 to-pink-600
            text-white font-medium shadow-md
            hover:scale-105 hover:shadow-[0_0_10px_#d946ef]
            transition-all duration-200
          "
        >
          Register Staff
        </button>

        <LogoutButton />
      </div>
    </header>

    <main className="p-6 space-y-6">

      {/* Summary Cards */}
      <SummaryCards />

      {/* TABS */}
      <div className="flex items-center gap-2">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`
              px-4 py-2 rounded-full text-sm border 
              transition-all duration-200 backdrop-blur-lg
              ${
                tab === t
                  ? "bg-purple-700/40 border-purple-400 text-purple-200 shadow-[0_0_12px_#a855f7]"
                  : "bg-white/5 text-gray-300 border-white/10 hover:bg-purple-800/30 hover:border-purple-400 hover:text-white"
              }
            `}
          >
            {renderLabel(t)}
          </button>
        ))}
      </div>

      {/* CONTENT PANEL */}
      <section className="
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        rounded-xl p-5 shadow-lg
      ">
        {tab === "users" && <UsersTable />}
        {tab === "merchants" && <MerchantTable />}
        {tab === "transactions" && (
          <div>
            <h2 className="text-lg font-semibold mb-3">Transaction History</h2>
            <TransactionsTable />
          </div>
        )}
        {tab === "reports" && (
          <div>
            <h2 className="text-lg font-semibold mb-1">Reports</h2>
            <p className="text-sm text-gray-400">
              Wire to <code>/api/AuditLogs</code> once you share the response shape.
            </p>
          </div>
        )}
        {tab === "auditLog" && <AuditLogsTable />}
      </section>
    </main>
  </div>
);
 }


