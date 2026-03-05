import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AdminHome from "./admin/modules/pages/AdminHome";
import Entitlements from "./admin/modules/pages/Entitlements";

// Organization Pages
import OrganizationAdd from "./admin/modules/organizations/OrganizationAdd";
import OrganizationView from "./admin/modules/organizations/OrganizationView";
import OrganizationModify from "./admin/modules/organizations/OrganizationModify";
import OrganizationDelete from "./admin/modules/organizations/OrganizationDelete";

//department pages
import DepartmentAdd from "./admin/modules/departments/DepartmentAdd";
import DepartmentView from "./admin/modules/departments/DepartmentView";
import DepartmentModify from "./admin/modules/departments/DepartmentModify";
import DepartmentDelete from "./admin/modules/departments/DepartmentDelete";

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