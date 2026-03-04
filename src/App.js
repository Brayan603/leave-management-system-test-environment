import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminHome from "./admin/modules/pages/AdminHome";
import Entitlements from "./admin/modules/pages/Entitlements";

// Organization Pages
import OrganizationAdd from "./admin/modules/organizations/OrganizationAdd";
import OrganizationView from "./admin/modules/organizations/OrganizationView";
import OrganizationModify from "./admin/modules/organizations/OrganizationModify";
import OrganizationDelete from "./admin/modules/organizations/OrganizationDelete";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminHome />} />

        {/* Entitlements Main Section */}
        <Route path="/admin/entitlements" element={<Entitlements />}>

          {/* Organization Routes */}
          <Route path="organization/add" element={<OrganizationAdd />} />
          <Route path="organization/view" element={<OrganizationView />} />
          <Route path="organization/modify" element={<OrganizationModify />} />
          <Route path="organization/delete" element={<OrganizationDelete />} />

          {/* Other Entitlement Sections */}
          <Route path="departments" element={<h3>Departments Page</h3>} />
          <Route path="leavetypes" element={<h3>Leave Types Page</h3>} />
          <Route path="users" element={<h3>Users Page</h3>} />
          <Route path="limits-roles" element={<h3>Limits Roles Page</h3>} />
          <Route path="workflows" element={<h3>Workflows Page</h3>} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;