import React from "react";
import DashboardShell from "../../components/dashboard/DashboardShell";
import useLogout from "../../hooks/useLogout";
// Simple inline icons (to avoid external deps). Replace with Heroicons if you like.
const HomeIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 3l9 8h-3v9H6v-9H3l9-8z"/></svg>;
const TxIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M6 7h12v2H6zM6 11h12v2H6zM6 15h12v2H6z"/></svg>;
const PayIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M20 4H4a2 2 0 0 0-2 2v2h20V6a2 2 0 0 0-2-2zM2 10v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-8H2zm4 5h6v2H6v-2z"/></svg>;
const WalletIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M21 7H5a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm-2 8h-4a2 2 0 1 1 0-4h4v4z"/></svg>;
const SettingsIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm9 4a7.8 7.8 0 0 0-.1-1l2-1.6-2-3.5-2.4.8a8.3 8.3 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a8.3 8.3 0 0 0-1.7 1l-2.4-.8-2 3.5 2 1.6a7.8 7.8 0 0 0 0 2l-2 1.6 2 3.5 2.4-.8a8.3 8.3 0 0 0 1.7 1l.4 2.5h4l.4-2.5c.6-.3 1.2-.6 1.7-1l2.4.8 2-3.5-2-1.6c.1-.3.1-.7.1-1z"/></svg>;
const LogoutIcon = () => <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 3h-8v2h8v14h-8v2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2z"/></svg>;

export default function UserDashboard() {
  const logout = useLogout("/login");
  const navItems = [
    { key: "home", label: "Home", icon: <HomeIcon /> },
    { key: "transactions", label: "Transactions", icon: <TxIcon /> },
    { key: "payment", label: "Payment", icon: <PayIcon /> },
    { key: "wallet", label: "Wallet", icon: <WalletIcon /> },
    { key: "settings", label: "Settings", icon: <SettingsIcon /> },
    { key: "logout", label: "Logout", icon: <LogoutIcon /> },
  ];

  return (
    <DashboardShell
      variant="user"
      navItems={navItems}
      defaultKey="home"
      onLogout={logout}
    />
  );
}