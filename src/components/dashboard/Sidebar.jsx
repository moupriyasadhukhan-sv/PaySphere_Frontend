// // import React from "react";

// // /**
// //  * Sidebar
// //  * Props:
// //  * - brand?: string ("PaSphere")
// //  * - items: Array<{ key: string, label: string, icon?: ReactNode, onClick?: () => void }>
// //  * - active: string
// //  * - onChange: (key: string) => void
// //  */
// // export default function Sidebar({ brand = "PaYSphere", items = [], active, onChange }) {
// //   return (
// //     <aside className="h-screen w-64 bg-navy-900 text-slate-100 flex flex-col border-r border-white/10">
// //       {/* Brand */}
// //       <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
// //         <div className="h-8 w-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-teal-glow">
// //           {/* Simple brand glyph */}
// //           <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
// //             <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM7 9.5l5 2.8 5-2.8M7 14.5l5 2.8 5-2.8" />
// //           </svg>
// //         </div>
// //         <span className="font-semibold tracking-wide">{brand}</span>
// //       </div>

// //       {/* Nav */}
// //       <nav className="mt-4 px-3 space-y-1 overflow-y-auto">
// //         {items.map((item) => {
// //           const isActive = item.key === active;
// //           const base =
// //             "group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition";
// //           const state = isActive
// //             ? "bg-white/5 text-white"
// //             : "text-slate-200 hover:bg-white/5 hover:text-white";

// //           return (
// //             <button
// //               key={item.key}
// //               onClick={() => {
// //                 // support optional per-item click (rare), then default to onChange
// //                 if (typeof item.onClick === "function") item.onClick();
// //                 onChange(item.key);
// //               }}
// //               className={[base, state].join(" ")}
// //               aria-current={isActive ? "page" : undefined}
// //               type="button"
// //             >
// //               {/* Active glow bar */}
// //               <span
// //                 className={[
// //                   "absolute left-0 h-6 w-1 rounded-r-full",
// //                   isActive ? "bg-emerald-500 shadow-teal-glow" : "bg-transparent",
// //                 ].join(" ")}
// //                 style={{ top: "50%", transform: "translateY(-50%)" }}
// //               />

// //               {/* Icon */}
// //               <span className={isActive ? "text-emerald-500" : "text-slate-400 group-hover:text-emerald-500"}>
// //                 {item.icon ?? <DotIcon />}
// //               </span>

// //               {/* Label */}
// //               <span className="font-medium">{item.label}</span>
// //             </button>
// //           );
// //         })}
// //       </nav>

// //       {/* Footer spacer */}
// //       <div className="mt-auto mb-4 px-3 text-xs text-slate-400">
// //         <span className="opacity-75">© {new Date().getFullYear()} PaSphere</span>
// //       </div>
// //     </aside>
// //   );
// // }

// // /** Simple fallback dot icon */
// // function DotIcon() {
// //   return (
// //     <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
// //       <circle cx="12" cy="12" r="4" />
// //     </svg>
// //   );
// // }


// import React from "react";

// export default function Sidebar({ brand = "PaYSphere", items = [], active, onChange }) {
//   return (
//     // Applied #0A1128 for Corporate Navy
//     <aside 
//       style={{ backgroundColor: '#0A1128' }} 
//       className="h-screen w-64 text-slate-100 flex flex-col border-r border-white/10"
//     >
//       {/* Brand */}
//       <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
//         <div 
//           className="h-8 w-8 rounded-lg flex items-center justify-center"
//           style={{ backgroundColor: '#10B981', boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' }}
//         >
//           <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
//             <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM7 9.5l5 2.8 5-2.8M7 14.5l5 2.8 5-2.8" />
//           </svg>
//         </div>
//         <span className="font-semibold tracking-wide text-white">{brand}</span>
//       </div>

//       {/* Nav */}
//       <nav className="mt-4 px-3 space-y-1 overflow-y-auto">
//         {items.map((item) => {
//           const isActive = item.key === active;
//           const base = "group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition";
          
//           return (
//             <button
//               key={item.key}
//               onClick={() => onChange(item.key)}
//               className={base}
//               style={{ backgroundColor: isActive ? 'rgba(255,255,255,0.05)' : 'transparent' }}
//               aria-current={isActive ? "page" : undefined}
//               type="button"
//             >
//               {/* Active glow bar - Applied #10B981 */}
//               <span
//                 className="absolute left-0 h-6 w-1 rounded-r-full transition-all"
//                 style={{ 
//                   top: "50%", 
//                   transform: "translateY(-50%)",
//                   backgroundColor: isActive ? '#10B981' : 'transparent',
//                   boxShadow: isActive ? '0 0 10px #10B981' : 'none'
//                 }}
//               />

//               {/* Icon - Applied #10B981 for active state */}
//               <span style={{ color: isActive ? '#10B981' : '#94a3b8' }} className="group-hover:text-emerald-400">
//                 {item.icon ?? <DotIcon />}
//               </span>

//               {/* Label */}
//               <span className="font-medium" style={{ color: isActive ? '#FFFFFF' : '#cbd5e1' }}>
//                 {item.label}
//               </span>
//             </button>
//           );
//         })}
//       </nav>

//       <div className="mt-auto mb-4 px-3 text-xs text-slate-400">
//         <span className="opacity-75">© {new Date().getFullYear()} PaYSphere</span>
//       </div>
//     </aside>
//   );
// }

// function DotIcon() {
//   return (
//     <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
//       <circle cx="12" cy="12" r="4" />
//     </svg>
//   );
// }

import React, { useState } from "react";

export default function Sidebar({ brand = "PaySphere", items = [], active, onChange }) {
  // Track which item is being hovered to apply colors dynamically
  const [hovered, setHovered] = useState(null);

  return (
    <aside 
      style={{ backgroundColor: '#0A1128' }} 
      className="h-screen w-64 text-slate-100 flex flex-col border-r border-white/10"
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
        <div 
          className="h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{ 
            backgroundColor: '#10B981', 
            boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)' 
          }}
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="currentColor">
            <path d="M12 2l9 5v10l-9 5-9-5V7l9-5zM7 9.5l5 2.8 5-2.8M7 14.5l5 2.8 5-2.8" />
          </svg>
        </div>
        <span className="font-semibold tracking-wide text-white">{brand}</span>
      </div>

      {/* Nav */}
      <nav className="mt-4 px-3 space-y-1 overflow-y-auto">
        {items.map((item) => {
          const isActive = item.key === active;
          const isHovered = hovered === item.key;
          
          return (
            <button
              key={item.key}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onChange(item.key)}
              className="group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer"
              style={{ 
                // Lighten background on hover or if active
                backgroundColor: isActive || isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                outline: 'none'
              }}
              type="button"
            >
              {/* Active/Hover glow bar */}
              <span
                className="absolute left-0 h-6 w-1 rounded-r-full transition-all duration-300"
                style={{ 
                  top: "50%", 
                  transform: "translateY(-50%)",
                  // Show bar if active OR hovered
                  backgroundColor: isActive || isHovered ? '#10B981' : 'transparent',
                  boxShadow: isActive || isHovered ? '0 0 12px #10B981' : 'none',
                  opacity: isActive || isHovered ? 1 : 0
                }}
              />

              {/* Icon */}
              <span 
                className="transition-colors duration-200"
                style={{ color: isActive || isHovered ? '#10B981' : '#94a3b8' }}
              >
                {item.icon ?? <DotIcon />}
              </span>

              {/* Label */}
              <span 
                className="font-medium transition-colors duration-200" 
                style={{ color: isActive || isHovered ? '#FFFFFF' : '#cbd5e1' }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto mb-4 px-3 text-xs text-slate-500">
        <span className="opacity-75">© {new Date().getFullYear()} PaYSphere</span>
      </div>
    </aside>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}