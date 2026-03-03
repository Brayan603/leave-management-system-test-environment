import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./admin/modules/pages/AdminHome";
import Entitlements from "./admin/modules/pages/Entitlements";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminHome />} />

        {/* Entitlements section with nested pages */}
        <Route path="/admin/entitlements" element={<Entitlements />}>
          <Route
            path="organization"
            element={<h3>Organization Page</h3>}
          />
          <Route
            path="departments"
            element={<h3>Departments Page</h3>}
          />
          <Route
            path="leavetypes"
            element={<h3>Leave Types Page</h3>}
          />
          <Route
            path="users"
            element={<h3>Users Page</h3>}
          />
          <Route
            path="limits-roles"
            element={<h3>Limits Roles Page</h3>}
          />
          <Route
            path="workflows"
            element={<h3>Workflows Page</h3>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
