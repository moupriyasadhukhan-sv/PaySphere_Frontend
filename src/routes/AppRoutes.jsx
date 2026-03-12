// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import RegisterStaff from "../pages/Dashboards/RegisterStaff";
import MerchantDashboard from "../pages/Dashboards/MerchantDashboard";
import OpsAdminDashboard from "../pages/Dashboards/OpsAdminDashboard";
import OpsDashboard from "../pages/Dashboards/OpsDashboard";
import RiskDashboard from "../pages/Dashboards/RiskDashboard";
import UserDashboard from "../pages/Dashboards/UserDashboard";

import Login from "../pages/entrypages/login";
import Registration from "../pages/entrypages/registration";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Old scheme */}
      <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin/register-staff"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <RegisterStaff />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/merchant"
        element={
          <ProtectedRoute allowedRoles={["Merchant"]}>
            <MerchantDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ops"
        element={
          <ProtectedRoute allowedRoles={["Ops"]}>
            <OpsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/ops-admin"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Ops"]}>
            <OpsAdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/risk"
        element={
          <ProtectedRoute allowedRoles={["Risk"]}>
            <RiskDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/user"
        element={
          <ProtectedRoute allowedRoles={["User"]}>
            <UserDashboard />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route path="*" element={<div className="p-6">Not Found</div>} />
    </Routes>
  );
}