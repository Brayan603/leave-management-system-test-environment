import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";

// Login
import Login from "./auth/Login";

// Admin Pages
import AdminHome from "./admin/modules/pages/AdminHome";

// Employee Pages
import EmployeeDashboard from "./employees/pages/EmployeeDashboard";


// Entitlements and Nested Pages
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
import UsersAdd from "./admin/modules/users/UsersAdd"; // ✅ Correct import
import UsersView from "./admin/modules/users/UsersView"; // ✅ View users page


// 🔐 Protected Route by role
const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(role)) return <Navigate to={`/${role}-home`} replace />;

  return children;
};

// Layout component for nested routes under Entitlements
const EntitlementsLayout = () => <Outlet />;

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const role = localStorage.getItem("role");

  return (
    <Router>
      <Routes>
        {/* Default route: redirect based on role */}
        <Route
          path="/"
          element={
            token
              ? role === "admin"
                ? <Navigate to="/admin-home" replace />
                : <Navigate to="/employee-dashboard" replace />
              : <Navigate to="/login" replace />
          }
        />

        {/* Login route */}
        <Route path="/login" element={<Login setToken={setToken} />} />

        {/* Admin protected routes */}
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* Entitlements nested routes (admin only) */}
        <Route
          path="/admin/entitlements"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Entitlements />
            </ProtectedRoute>
          }
        >
          <Route element={<EntitlementsLayout />}>
            {/* Organization */}
            <Route path="organization/add" element={<OrganizationAdd />} />
            <Route path="organization/view" element={<OrganizationView />} />
            <Route path="organization/modify" element={<OrganizationModify />} />
            <Route path="organization/delete" element={<OrganizationDelete />} />

            {/* Leave Types */}
            <Route path="leavetypes/add" element={<LeaveTypesAdd />} />
            <Route path="leavetypes/view" element={<LeaveTypesView />} />

            {/* Departments */}
            <Route path="departments/add" element={<DepartmentAdd />} />
            <Route path="departments/view" element={<DepartmentView />} />
            <Route path="departments/modify" element={<DepartmentModify />} />
            <Route path="departments/delete" element={<DepartmentDelete />} />
          
            {/* Entitlements */}
            <Route path="entitlements/add" element={<EntitlementAdd />} />
            
            {/* Users */}
            <Route path="users/add" element={<UsersAdd />} /> {/* ✅ Fixed */}
            <Route path="users/view" element={<UsersView />} /> {/* ✅ Fixed */}

          </Route>
        </Route>

        {/* Employee protected route */}
        <Route
          path="/employee-dashboard"
          element={
            <ProtectedRoute allowedRoles={["employee", "manager"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        />

          {/* Employee apply leave route */}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
