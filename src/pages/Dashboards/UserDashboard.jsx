// src/pages/dashboards/UserDashboard.jsx
import LogoutButton from "../../common/LogoutButton";
import { useAuth } from "../../context/AuthContext";

export default function UserDashboard() {
  const { auth } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="w-full px-6 py-3 bg-white border-b flex items-center justify-between">
        <h1 className="text-lg font-semibold">User Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">Role: {auth.role}</span>
          <LogoutButton />
        </div>
      </header>
      <main className="p-6">User content…</main>
    </div>
  );
}