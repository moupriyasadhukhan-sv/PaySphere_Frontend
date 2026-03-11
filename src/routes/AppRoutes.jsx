// // src/routes/AppRoutes.jsx
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// import Login from "../pages/entrypages/login";
// import Register from "../pages/entrypages/registration";

// import UserDashboard from "../pages/Dashboards/UserDashboard";
// import MerchantDashboard from "../pages/Dashboards/MerchantDashboard";
// import AdminDashboard from "../pages/Dashboards/AdminDashboard";
// import RiskDashboard from "../pages/Dashboards/RiskDashboard";
// import OpsDashboard from "../pages/Dashboards/OpsDashboard";
// import OpsAdminDashboard from "../pages/Dashboards/OpsAdminDashboard";

// import ProtectedRoute from "../components/ProtectedRoute";

// export default function AppRoutes() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Public */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         {/* Protected & Role-guarded */}
//         <Route
//           path="/dashboard/user"
//           element={
//             <ProtectedRoute>
//               <RequireRole allowed={["User"]}>
//                 <UserDashboard />
//               </RequireRole>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/merchant"
//           element={
//             <ProtectedRoute>
//               <RequireRole allowed={["Merchant"]}>
//                 <MerchantDashboard />
//               </RequireRole>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/admin"
//           element={
//             <ProtectedRoute>
//               <RequireRole allowed={["Admin"]}>
//                 <AdminDashboard />
//               </RequireRole>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/risk"
//           element={
//             <ProtectedRoute>
//               <RequireRole allowed={["Risk"]}>
//                 <RiskDashboard />
//               </RequireRole>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/ops"
//           element={
//             <ProtectedRoute>
//               <RequireRole allowed={["Ops"]}>
//                 <OpsDashboard />
//               </RequireRole>
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/dashboard/ops-admin"
//           element={
//             <ProtectedRoute>
//               {/* ⬇️ Allow BOTH Admin and Ops to access */}
//               <RequireRole allowed={["Admin", "Ops"]}>
//                 <OpsAdminDashboard />
//               </RequireRole>
//             </ProtectedRoute>
//           }
//         />

//         {/* 404 */}
//         <Route path="*" element={<div className="p-6">Not found</div>} />
//       </Routes>
//     </BrowserRouter>
//   );
// }


// src/routes/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/entrypages/login";
import Register from "../pages/entrypages/registration";

// ⚠️ Make sure casing matches your folder on disk: "Dashboards" vs "dashboards"
import UserDashboard from "../pages/Dashboards/UserDashboard";
import MerchantDashboard from "../pages/Dashboards/MerchantDashboard";
import AdminDashboard from "../pages/Dashboards/AdminDashboard";
import RiskDashboard from "../pages/Dashboards/RiskDashboard";
import OpsDashboard from "../pages/Dashboards/OpsDashboard";
import OpsAdminDashboard from "../pages/Dashboards/OpsAdminDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected + role-guarded via one component */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowed={["User"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/merchant"
          element={
            <ProtectedRoute allowed={["Merchant"]}>
              <MerchantDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowed={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/risk"
          element={
            <ProtectedRoute allowed={["Risk"]}>
              <RiskDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/ops"
          element={
            <ProtectedRoute allowed={["Ops"]}>
              <OpsDashboard />
            </ProtectedRoute>
          }
        />
        {/* Shared endpoint: Admin OR Ops */}
        <Route
          path="/dashboard/ops-admin"
          element={
            <ProtectedRoute allowed={["Admin", "Ops"]}>
              <OpsAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<div className="p-6">Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}