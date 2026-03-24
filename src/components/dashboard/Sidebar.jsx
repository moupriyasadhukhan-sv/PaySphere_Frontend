import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

/**
 * Sidebar that navigates with React Router.
 * - If item.path exists -> navigate to it.
 * - If item.key === 'logout' -> call onLogout.
 * - Active item is inferred from location.pathname.
 */
export default function Sidebar({
  brand = "PaySphere",
  items = [],
  onLogout, // optional
}) {
  const [hovered, setHovered] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveByPath = (item) => {
    if (!item.path) return false;
    // Mark active when current path starts with provided path (keeps section highlighted for nested routes)
    return location.pathname.toLowerCase().startsWith(item.path.toLowerCase());
  };

  const handleClick = (item, e) => {
    if (item.key === "logout") {
      e.preventDefault();
      onLogout?.();
      return;
    }
    if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside
      style={{ backgroundColor: "#0A1128" }}
      className="h-screen w-64 text-slate-100 flex flex-col border-r border-white/10"
    >
      {/* Brand */}
      <div className="flex items-center gap-2 px-5 h-16 border-b border-white/10">
        <div
          className="h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: "#10B981",
            boxShadow: "0 0 15px rgba(16, 185, 129, 0.4)",
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
          const isActive = isActiveByPath(item);
          const isHovered = hovered === item.key;

          return (
            <NavLink
              key={item.key}
              to={item.path || "#"}
              onClick={(e) => handleClick(item, e)}
              onMouseEnter={() => setHovered(item.key)}
              onMouseLeave={() => setHovered(null)}
              className="group relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor:
                  isActive || isHovered ? "rgba(255, 255, 255, 0.08)" : "transparent",
                outline: "none",
              }}
            >
              {/* Active/Hover glow bar */}
              <span
                className="absolute left-0 h-6 w-1 rounded-r-full transition-all duration-300"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: isActive || isHovered ? "#10B981" : "transparent",
                  boxShadow: isActive || isHovered ? "0 0 12px #10B981" : "none",
                  opacity: isActive || isHovered ? 1 : 0,
                }}
              />

              {/* Icon */}
              <span
                className="transition-colors duration-200"
                style={{ color: isActive || isHovered ? "#10B981" : "#94a3b8" }}
              >
                {item.icon ?? <DotIcon />}
              </span>

              {/* Label */}
              <span
                className="font-medium transition-colors duration-200"
                style={{ color: isActive || isHovered ? "#FFFFFF" : "#cbd5e1" }}
              >
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto mb-4 px-3 text-xs text-slate-500">
        <span className="opacity-75">© {new Date().getFullYear()} PaySphere</span>
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