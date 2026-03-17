// // src/routes/AppRoutes.jsx
// import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";

// import AdminDashboard from "../pages/Dashboards/AdminDashboard";
// import RegisterStaff from "../pages/Dashboards/RegisterStaff";
// import MerchantDashboard from "../pages/Dashboards/MerchantDashboard";
// import OpsAdminDashboard from "../pages/Dashboards/OpsAdminDashboard";
// import OpsDashboard from "../pages/Dashboards/OpsDashboard";
// import RiskDashboard from "../pages/Dashboards/RiskDashboard";
// import UserDashboard from "../pages/Dashboards/UserDashboard";

// import Login from "../pages/entrypages/login";
// import Registration from "../pages/entrypages/registration";

// import Landing from "../pages/landing/Landing";

// import ShowLimit from "../pages/Limits/ShowLimit";
// import CreateLimit from "../pages/Limits/CreateLimit";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public */}
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Registration />} />

//       {/* Old scheme */}
//       <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

//       {/* <Route
//         path="/dashboard/admin"
//         element={
//           <ProtectedRoute allowedRoles={["Admin"]}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/admin/register-staff"
//         element={
//           <ProtectedRoute allowedRoles={["Admin"]}>
//             <RegisterStaff />
//           </ProtectedRoute>
//         }
//       /> */}

//         <Route
//         path="/dashboard/admin"
//         element={
//           <ProtectedRoute allowedRoles={["Admin"]}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       >
//         {/* Index (Admin home) at /dashboard/admin */}
//         {/* <Route index element={<AdminDashboard />} /> */}

//         {/* Register staff at /dashboard/admin/register-staff */}
//         <Route path="register-staff" element={<RegisterStaff />} />

//         {/* Limits pages now nested under /dashboard/admin/limits/... */}
//         <Route path="limits/create" element={<CreateLimit />} />
//         <Route path="limits/:userId" element={<ShowLimit />} />
//       </Route>




//       <Route
//         path="/dashboard/merchant"
//         element={
//           <ProtectedRoute allowedRoles={["Merchant"]}>
//             <MerchantDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/ops"
//         element={
//           <ProtectedRoute allowedRoles={["Ops"]}>
//             <OpsDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/ops-admin"
//         element={
//           <ProtectedRoute allowedRoles={["Admin", "Ops"]}>
//             <OpsAdminDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/risk"
//         element={
//           <ProtectedRoute allowedRoles={["Risk"]}>
//             <RiskDashboard />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/dashboard/user"
//         element={
//           <ProtectedRoute allowedRoles={["User"]}>
//             <UserDashboard />
//           </ProtectedRoute>
//         }
//       />

      
//       <Route
//         path="/limits/create"
//         element={
//           <ProtectedRoute allowedRoles={["Admin"]}>
//             <CreateLimit />
//           </ProtectedRoute>
//         }
//       />

      
//       <Route
//         path="/limits/:userId"
//         element={
//           <ProtectedRoute allowedRoles={["Admin", "Ops", "Risk"]}>
//             <ShowLimit />
//           </ProtectedRoute>
//         }
//       />



        
//       {/* 404 */}
//       <Route path="*" element={<div className="p-6">Not Found</div>} />
//     </Routes>
//   );
// }



// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Dashboards
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import RegisterStaff from "../pages/Dashboards/RegisterStaff";
import MerchantDashboard from "../pages/Dashboards/MerchantDashboard";
import OpsAdminDashboard from "../pages/Dashboards/OpsAdminDashboard";
import OpsDashboard from "../pages/Dashboards/OpsDashboard";
import RiskDashboard from "../pages/Dashboards/RiskDashboard";
import UserDashboard from "../pages/Dashboards/UserDashboard";

// Auth pages
import Login from "../pages/entrypages/login";
import Registration from "../pages/entrypages/registration";

// Feature pages
import ShowLimit from "../pages/Limits/ShowLimit";
import CreateLimit from "../pages/Limits/CreateLimit";

import MerchantSettlements from "../pages/settlements/MerchantSettlements";
// Landing (public)
import Landing from "../pages/landing/Landing";

export default function AppRoutes() {
  return (
    <Routes>
      ===== Public =====
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Registration />} />

      {/* Backward-compat: /dashboard -> /dashboard/admin */}
      <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

      {/* ===== Admin (nested) =====
         NOTE: AdminDashboard MUST render nested routes via useOutlet() or <Outlet/>.
         Example: const outlet = useOutlet(); return outlet ? <Shell>{outlet}</Shell> : <Shell>Home</Shell>
      */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        {/* Child pages under /dashboard/admin/... */}
        <Route path="register-staff" element={<RegisterStaff />} />

        {/* Limits nested group: /dashboard/admin/limits/create and /dashboard/admin/limits/:userId */}
        <Route path="limits">
          <Route path="create" element={<CreateLimit />} />
          <Route path=":userId" element={<ShowLimit />} />
        </Route>
        <Route path="settlements/merchant/:merchantId" element={<MerchantSettlements />} />
      
      </Route>

      {/* ===== Other role dashboards (top-level) ===== */}
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

      {/* ===== IMPORTANT =====
          Remove old top-level /limits routes to avoid duplicate matches:
          <Route path="/limits/create" ... />
          <Route path="/limits/:userId" ... />
      */}

      {/* ===== 404 ===== */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}