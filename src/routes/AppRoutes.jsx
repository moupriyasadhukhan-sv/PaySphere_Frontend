
// // src/routes/AppRoutes.jsx
// import { Routes, Route, Navigate } from "react-router-dom";
// import ProtectedRoute from "../components/ProtectedRoute";

// // Dashboards
// import AdminDashboard from "../pages/Dashboards/AdminDashboard";
// import RegisterStaff from "../pages/Dashboards/RegisterStaff";
// import MerchantDashboard from "../pages/Dashboards/MerchantDashboard";
// import OpsAdminDashboard from "../pages/Dashboards/OpsAdminDashboard";
// import OpsDashboard from "../pages/Dashboards/OpsDashboard";
// import RiskDashboard from "../pages/Dashboards/RiskDashboard";
// import UserDashboard from "../pages/Dashboards/UserDashboard";

// // Auth pages
// import Login from "../pages/entrypages/login";
// import Registration from "../pages/entrypages/registration";

// // Feature pages
// import ShowLimit from "../pages/Limits/ShowLimit";
// import CreateLimit from "../pages/Limits/CreateLimit";
// import UpdateLimit from "../pages/Limits/UpdateLimit";

// import MerchantSettlements from "../pages/settlements/MerchantSettlements";
// // Landing (public)
// import Landing from "../pages/landing/Landing";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       ===== Public =====
//       <Route path="/" element={<Landing />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Registration />} />

//       {/* Backward-compat: /dashboard -> /dashboard/admin */}
//       <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

//       {/* ===== Admin (nested) =====
//          NOTE: AdminDashboard MUST render nested routes via useOutlet() or <Outlet/>.
//          Example: const outlet = useOutlet(); return outlet ? <Shell>{outlet}</Shell> : <Shell>Home</Shell>
//       */}
//       <Route
//         path="/dashboard/admin"
//         element={
//           <ProtectedRoute allowedRoles={["admin"]}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       >
//         {/* Child pages under /dashboard/admin/... */}
//         <Route path="register-staff" element={<RegisterStaff />} />

//         {/* Limits nested group: /dashboard/admin/limits/create and /dashboard/admin/limits/:userId */}
//         <Route path="limits">
//           {/* <Route path="create" element={<CreateLimit />} />
//           <Route path=":userId" element={<ShowLimit />} /> */}
//           <Route path="create" element={<CreateLimit />} />
//           <Route path="update/:limitId" element={<UpdateLimit />} />   {/* <-- ADD THIS */}
//           <Route path=":userId" element={<ShowLimit />} />

          
//         </Route>
//         <Route path="settlements/merchant/:merchantId" element={<MerchantSettlements />} />
      
//       </Route>

//       {/* ===== Other role dashboards (top-level) ===== */}
//       <Route
//         path="/dashboard/merchant"
//         element={
//           <ProtectedRoute allowedRoles={["merchant"]}>
//             <MerchantDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/dashboard/ops"
//         element={
//           <ProtectedRoute allowedRoles={["ops"]}>
//             <OpsDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/dashboard/ops-admin"
//         element={
//           <ProtectedRoute allowedRoles={["admin", "ops"]}>
//             <OpsAdminDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/dashboard/risk"
//         element={
//           <ProtectedRoute allowedRoles={["risk"]}>
//             <RiskDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/dashboard/user"
//         element={
//           <ProtectedRoute allowedRoles={["user"]}>
//             <UserDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* ===== IMPORTANT =====
//           Remove old top-level /limits routes to avoid duplicate matches:
//           <Route path="/limits/create" ... />
//           <Route path="/limits/:userId" ... />
//       */}

//       {/* ===== 404 ===== */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }


// import { Routes, Route, Navigate } from "react-router-dom";
// import { Suspense, lazy } from "react";
// import ProtectedRoute from "../components/ProtectedRoute";

// // Lazy-loaded components
// const AdminDashboard = lazy(() => import("../pages/Dashboards/AdminDashboard"));
// const RegisterStaff = lazy(() => import("../pages/Dashboards/RegisterStaff"));
// const MerchantDashboard = lazy(() => import("../pages/Dashboards/MerchantDashboard"));
// const OpsAdminDashboard = lazy(() => import("../pages/Dashboards/OpsAdminDashboard"));
// const OpsDashboard = lazy(() => import("../pages/Dashboards/OpsDashboard"));
// const RiskDashboard = lazy(() => import("../pages/Dashboards/RiskDashboard"));
// const UserDashboard = lazy(() => import("../pages/Dashboards/UserDashboard"));

// const Login = lazy(() => import("../pages/entrypages/login"));
// const Registration = lazy(() => import("../pages/entrypages/registration"));

// const ShowLimit = lazy(() => import("../pages/Limits/ShowLimit"));
// const CreateLimit = lazy(() => import("../pages/Limits/CreateLimit"));
// const UpdateLimit = lazy(() => import("../pages/Limits/UpdateLimit"));

// const MerchantSettlements = lazy(() => import("../pages/settlements/MerchantSettlements"));


// //new add-


// const UserTransactionsPage = lazy(() =>import("../pages/transactions/UserTransactionsPage"));

// const MerchantRefundPage = lazy(() =>import("../pages/Payment/MerchantRefundPage"));

// const UserRefundPage = lazy(() =>import("../pages/Payment/UserRefundPage"));

// const UserPaymentPage = lazy(() =>import("../pages/Payment/UserPaymentPage"));


// const Landing = lazy(() => import("../pages/landing/Landing"));


// export default function AppRoutes() {
//   return (
//     <Suspense
//       fallback={
//         <div className="text-white text-center mt-10 text-lg">
//           Loading…
//         </div>
//       }
//     >
//       <Routes>

//         {/* Public */}
//         <Route path="/" element={<Landing />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Registration />} />

//         {/* Default redirect */}
//         <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

//         {/* Admin routes */}
//         <Route
//           path="/dashboard/admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin"]}>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         >
//           <Route path="register-staff" element={<RegisterStaff />} />

//           <Route path="limits">
//             <Route path="create" element={<CreateLimit />} />
//             <Route path="update/:limitId" element={<UpdateLimit />} />
//             <Route path=":userId" element={<ShowLimit />} />
//           </Route>

//           <Route
//             path="settlements/merchant/:merchantId"
//             element={<MerchantSettlements />}
//           />
//         </Route>

//         {/* Other role dashboards */}
//         <Route
//           path="/dashboard/merchant"
//           element={
//             <ProtectedRoute allowedRoles={["merchant"]}>
//               <MerchantDashboard />
//             </ProtectedRoute>
//           }
//         />
//           {/* index (home) is rendered by MerchantDashboard shell when path === /dashboard/merchant */}
//           <Route index element={<div />} />
//           <Route path="refund" element={<MerchantRefundPage />} />
//         <Route
//           path="/dashboard/ops"
//           element={
//             <ProtectedRoute allowedRoles={["ops"]}>
//               <OpsDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard/ops-admin"
//           element={
//             <ProtectedRoute allowedRoles={["admin", "ops"]}>
//               <OpsAdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/dashboard/risk"
//           element={
//             <ProtectedRoute allowedRoles={["risk"]}>
//               <RiskDashboard />
//             </ProtectedRoute>
//           }
//         />

//          <Route
//         path="/dashboard/user"
//         element={
//           <ProtectedRoute allowedRoles={["User"]}>
//             <UserDashboard />
//           </ProtectedRoute>
//         }
//       >
//         {/* index (home) is rendered by UserDashboard shell when path === /dashboard/user */}
//         <Route index element={<div />} />
//         <Route path="transactions" element={<UserTransactionsPage />} />
//         <Route path="payment" element={<UserPaymentPage />} />
        
//         <Route path="refund" element={<UserRefundPage />} /> {/* <-- moved form here */}
     


//       </Route>

//       {/* 404 */}
//       <Route path="*" element={<div className="p-6">Not Found</div>} />
//     </Routes>
//     </Suspense>
//   );
// }


import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy-loaded pages
const AdminDashboard = lazy(() => import("../pages/Dashboards/AdminDashboard"));
const RegisterStaff = lazy(() => import("../pages/Dashboards/RegisterStaff"));
const MerchantDashboard = lazy(() => import("../pages/Dashboards/MerchantDashboard"));
const OpsAdminDashboard = lazy(() => import("../pages/Dashboards/OpsAdminDashboard"));
const OpsDashboard = lazy(() => import("../pages/Dashboards/OpsDashboard"));
const RiskDashboard = lazy(() => import("../pages/Dashboards/RiskDashboard"));
const UserDashboard = lazy(() => import("../pages/Dashboards/UserDashboard"));

const Login = lazy(() => import("../pages/entrypages/login"));
const Registration = lazy(() => import("../pages/entrypages/registration"));

const ShowLimit = lazy(() => import("../pages/Limits/ShowLimit"));
const CreateLimit = lazy(() => import("../pages/Limits/CreateLimit"));
const UpdateLimit = lazy(() => import("../pages/Limits/UpdateLimit"));

const MerchantSettlements = lazy(() =>
  import("../pages/settlements/MerchantSettlements")
);

// Newly added pages
const UserTransactionsPage = lazy(() =>
  import("../pages/transactions/UserTransactionsPage")
);

const MerchantRefundPage = lazy(() =>
  import("../pages/Payment/MerchantRefundPage")
);

const UserRefundPage = lazy(() =>
  import("../pages/Payment/UserRefundPage")
);

const UserPaymentPage = lazy(() =>
  import("../pages/Payment/UserPaymentPage")
);

const Landing = lazy(() => import("../pages/landing/Landing"));

export default function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="text-white text-center mt-10 text-lg">
          Loading…
        </div>
      }
    >
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />

        {/* Default redirect */}
        <Route path="/dashboard" element={<Navigate to="/dashboard/admin" replace />} />

        {/* ADMIN ROUTES */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="register-staff" element={<RegisterStaff />} />

          <Route path="limits">
            <Route path="create" element={<CreateLimit />} />
            <Route path="update/:limitId" element={<UpdateLimit />} />
            <Route path=":userId" element={<ShowLimit />} />
          </Route>

          <Route
            path="settlements/merchant/:merchantId"
            element={<MerchantSettlements />}
          />
        </Route>

        {/* MERCHANT ROUTES */}
        <Route
          path="/dashboard/merchant"
          element={
            <ProtectedRoute allowedRoles={["merchant"]}>
              <MerchantDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<div />} />
          <Route path="refund" element={<MerchantRefundPage />} />
        </Route>

        {/* OPS ROUTES */}
        <Route
          path="/dashboard/ops"
          element={
            <ProtectedRoute allowedRoles={["ops"]}>
              <OpsDashboard />
            </ProtectedRoute>
          }
        />

        {/* OPS ADMIN ROUTES */}
        <Route
          path="/dashboard/ops-admin"
          element={
            <ProtectedRoute allowedRoles={["admin", "ops"]}>
              <OpsAdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* RISK ROUTES */}
        <Route
          path="/dashboard/risk"
          element={
            <ProtectedRoute allowedRoles={["risk"]}>
              <RiskDashboard />
            </ProtectedRoute>
          }
        />

        {/* USER ROUTES */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<div />} />
          <Route path="transactions" element={<UserTransactionsPage />} />
          <Route path="payment" element={<UserPaymentPage />} />
          <Route path="refund" element={<UserRefundPage />} />
        </Route>

        {/* Catch-all 404 route */}
        <Route path="*" element={<div className="p-6">Not Found</div>} />

      </Routes>
    </Suspense>
  );
}