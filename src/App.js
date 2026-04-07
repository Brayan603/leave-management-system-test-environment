import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Login
import Login from "./auth/Login";

// Admin Pages
import AdminHome from "./admin/modules/pages/AdminHome";

// Employee Pages
import EmployeeDashboard from "./employees/pages/EmployeeDashboard"; 
import ApplyLeave from "./employees/pages/ApplyLeave";
import LeaveHistory from "./employees/pages/LeaveHistory";
import LeaveBalance from "./employees/pages/LeaveBalance";
import Calendar from "./employees/pages/Calendar";
import Settings from "./employees/pages/Settings";

// Manager Pages
import ManagerDashboard from "./manager/pages/ManagerDashboard";
import PendingTasks from "./manager/pages/PendingTasks";

// ✅ FIX: Import ManagerLayout
import ManagerLayout from "./manager/components/ManagerLayout";

// Admin Entitlements and Nested Pages
import Entitlements from "./admin/modules/pages/Entitlements";
import OrganizationAdd from "./admin/modules/organizations/OrganizationAdd";
import OrganizationView from "./admin/modules/organizations/OrganizationView";
import OrganizationModify from "./admin/modules/organizations/OrganizationModify";
import OrganizationDelete from "./admin/modules/organizations/OrganizationDelete";
import DepartmentAdd from "./admin/modules/departments/DepartmentAdd";
import DepartmentView from "./admin/modules/departments/DepartmentView";
import DepartmentModify from "./admin/modules/departments/DepartmentModify";
import DepartmentDelete from "./admin/modules/departments/DepartmentDelete";
import LeaveTypesAdd from "./admin/modules/leavetypes/LeaveTypesAdd";
import LeaveTypesView from "./admin/modules/leavetypes/LeaveTypesView";
import EntitlementAdd from "./admin/modules/entitlements/EntitlementsAdd";  
import UsersAdd from "./admin/modules/users/UsersAdd";
import UsersView from "./admin/modules/users/UsersView";
import EmployeeLayout from "./employees/components/EmployeeLayout";

// 🔐 Role Redirects Map (FIXED)
const roleRedirects = {
  admin: "/admin-home",
  employee: "/employees",
  manager: "/manager", // ✅ FIXED
};

// 🔐 Protected Route
const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to={roleRedirects[role]} replace />;

  return children;
};

// Layout for nested Admin routes
const EntitlementsLayout = () => <Outlet />;

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>

        {/* Default redirect */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to={roleRedirects[role]} replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        {/* ================= ADMIN ================= */}
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* Admin Entitlements */}
        <Route
          path="/admin/entitlements/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Entitlements />
            </ProtectedRoute>
          }
        >
          <Route element={<EntitlementsLayout />}>
            <Route path="organization/add" element={<OrganizationAdd />} />
            <Route path="organization/view" element={<OrganizationView />} />
            <Route path="organization/modify" element={<OrganizationModify />} />
            <Route path="organization/delete" element={<OrganizationDelete />} />
            <Route path="leavetypes/add" element={<LeaveTypesAdd />} />
            <Route path="leavetypes/view" element={<LeaveTypesView />} />
            <Route path="departments/add" element={<DepartmentAdd />} />
            <Route path="departments/view" element={<DepartmentView />} />
            <Route path="departments/modify" element={<DepartmentModify />} />
            <Route path="departments/delete" element={<DepartmentDelete />} />
            <Route path="entitlements/add" element={<EntitlementAdd />} />
            <Route path="users/add" element={<UsersAdd />} />
            <Route path="users/view" element={<UsersView />} />
          </Route>
        </Route>

        {/* ================= EMPLOYEE ================= */}
        <Route
          path="/employees/*"
          element={
            <ProtectedRoute allowedRoles={["employee"]}>
              <EmployeeLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<EmployeeDashboard />} />
          <Route path="apply-leave" element={<ApplyLeave />} />
          <Route path="leave-history" element={<LeaveHistory />} />
          <Route path="leave-balance" element={<LeaveBalance />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* ================= MANAGER (FIXED) ================= */}
        <Route
          path="/manager/*"
          element={
            <ProtectedRoute allowedRoles={["manager"]}>
              <ManagerLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ManagerDashboard />} />
          <Route path="pending-tasks" element={<PendingTasks />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;



