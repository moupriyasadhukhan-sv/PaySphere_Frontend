// import React, { useState } from "react";
// import Sidebar from "./Sidebar";

// /**
//  * DashboardShell
//  * Props:
//  * - brand?: string
//  * - navItems: Array<{ key: string, label: string, icon?: ReactNode }>
//  * - defaultKey?: string ("home")
//  * - variant?: "user" | "merchant"
//  * - onLogout?: () => void
//  */
// export default function DashboardShell({
//   brand = "PaSphere",
//   navItems = [],
//   defaultKey = "home",
//   variant = "user",
//   onLogout = () => console.log("Logout clicked"),
// }) {
//   const [active, setActive] = useState(defaultKey);

//   const handleChange = (key) => {
//     // Guard: run logout and do NOT set 'logout' as active tab
//     if (key === "logout") {
//       onLogout?.();
//       return;
//     }
//     setActive(key);
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 text-slate-900 flex">
//       {/* Sidebar */}
//       <Sidebar brand={brand} items={navItems} active={active} onChange={handleChange} />

//       {/* Main area */}
//       <main className="flex-1 flex flex-col">
//         {/* Top bar */}
//         <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
//           <div className="flex items-center gap-3">
//             <h1 className="text-lg font-semibold">
//               {variant === "merchant" ? "Merchant Dashboard" : "User Dashboard"}
//             </h1>
//             <span className="text-xs text-slate-500">/ {active[0]?.toUpperCase()}{active.slice(1)}</span>
//           </div>

//           <div className="flex items-center gap-3">
//             {/* Notification bell */}
//             <button
//               className="relative p-2 rounded-full hover:bg-slate-100 transition"
//               aria-label="Notifications"
//               title="Notifications"
//               type="button"
//             >
//               <BellIcon className="h-6 w-6 text-slate-600 hover:text-slate-800" />
//               {/* <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-teal-glow" /> */}
//             </button>

//             {/* Optional user avatar placeholder */}
//             <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300" aria-hidden />
//           </div>
//         </header>

//         {/* Body (NO CARDS) */}
//         <section className="p-8">
//           {/* Home page content */}
//           {active === "home" && (
//             <div className="max-w-3xl">
//               <h2 className="text-2xl sm:text-3xl font-bold">
//                 Welcome to <span className="text-emerald-500">PaYSphere</span>
//               </h2>
//               <p className="mt-2 text-slate-600">Use the navbar options for a smooth experience.</p>
//             </div>
//           )}

//           {/* For other tabs, keep it minimal as requested (no cards) */}
//           {active !== "home" && (
//             <div className="max-w-3xl">
//               <h3 className="text-xl font-semibold mb-1">
//                 {navItems.find((n) => n.key === active)?.label}
//               </h3>
//               <p className="text-slate-600">
//                 This section is intentionally minimal. Navigate using the sidebar.
//               </p>
//             </div>
//           )}
//         </section>
//       </main>
//     </div>
//   );
// }

// /** Inline bell icon */
// function BellIcon({ className = "h-6 w-6" }) {
//   return (
//     <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
//       <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22z" />
//       <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7z" />
//     </svg>
//   );
// }


import React, { useState } from "react";
import Sidebar from "./Sidebar";

export default function DashboardShell({
  brand = "PaySphere",
  navItems = [],
  defaultKey = "home",
  variant = "user",
  onLogout = () => console.log("Logout clicked"),
}) {
  const [active, setActive] = useState(defaultKey);

  const handleChange = (key) => {
    if (key === "logout") {
      onLogout?.();
      return;
    }
    setActive(key);
  };

  return (
    // Applied #F8FAFC for Neutral BG
    <div style={{ backgroundColor: '#F8FAFC', color: '#0F172A' }} className="min-h-screen flex">
      <Sidebar brand={brand} items={navItems} active={active} onChange={handleChange} />

      <main className="flex-1 flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold">
              {variant === "merchant" ? "Merchant Dashboard" : "User Dashboard"}
            </h1>
            <span className="text-xs text-slate-500">/ {active[0]?.toUpperCase()}{active.slice(1)}</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-full hover:bg-slate-100 transition">
              <BellIcon className="h-6 w-6 text-slate-600" />
            </button>
            <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300" />
          </div>
        </header>

        <section className="p-8">
          {active === "home" && (
            <div className="max-w-3xl">
              <h2 className="text-2xl sm:text-3xl font-bold">
                {/* Applied #10B981 for PaYSphere text */}
                Welcome to <span style={{ color: '#10B981' }}>PaySphere</span>
              </h2>
              <p className="mt-2 text-slate-600">Use the navbar options for a smooth experience.</p>
            </div>
          )}

          {active !== "home" && (
            <div className="max-w-3xl">
              <h3 className="text-xl font-semibold mb-1">
                {navItems.find((n) => n.key === active)?.label}
              </h3>
              <p className="text-slate-600">This section is intentionally minimal.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function BellIcon({ className = "h-6 w-6" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 22a2.5 2.5 0 0 0 2.45-2h-4.9A2.5 2.5 0 0 0 12 22z" />
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 7-3 7h18s-3 0-3-7z" />
    </svg>
  );
}