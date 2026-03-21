import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Login
import Login from "./auth/Login";

// Admin Pages
import AdminHome from "./admin/modules/pages/AdminHome";
import Entitlements from "./admin/modules/pages/Entitlements";

// Organization Pages
import OrganizationAdd from "./admin/modules/organizations/OrganizationAdd";
import OrganizationView from "./admin/modules/organizations/OrganizationView";
import OrganizationModify from "./admin/modules/organizations/OrganizationModify";
import OrganizationDelete from "./admin/modules/organizations/OrganizationDelete";

// Department Pages
import DepartmentAdd from "./admin/modules/departments/DepartmentAdd";
import DepartmentView from "./admin/modules/departments/DepartmentView";
import DepartmentModify from "./admin/modules/departments/DepartmentModify";
import DepartmentDelete from "./admin/modules/departments/DepartmentDelete";

// Leave Types
import LeaveTypesAdd from "./admin/modules/leavetypes/LeaveTypesAdd";
import LeaveTypesView from "./admin/modules/leavetypes/LeaveTypesView";

// 🔐 Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>

        {/* ✅ Default Route */}
        <Route
          path="/"
          element={token ? <Navigate to="/admin-home" /> : <Navigate to="/login" />}
        />

        {/* ✅ Login */}
        <Route path="/login" element={<Login />} />

        {/* ✅ Protected Admin Routes */}
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />

        {/* Entitlements */}
        <Route
          path="/admin/entitlements"
          element={
            <ProtectedRoute>
              <Entitlements />
            </ProtectedRoute>
          }
        >
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
        </Route>

      </Routes>
    </Router>
  );
}

export default App;