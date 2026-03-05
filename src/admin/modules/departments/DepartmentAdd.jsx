import React, { useEffect, useState } from "react";
import { getOrganizations } from "../organizations/OrganizationService";
import { getDepartmentsByOrganization } from "./DepartmentService";
import "./Department.css";

function DepartmentAdd() {

  const [organizations, setOrganizations] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [organization, setOrganization] = useState("");
  const [department, setDepartment] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await getOrganizations();
      setOrganizations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOrganizationChange = async (e) => {

    const orgId = e.target.value;

    setOrganization(orgId);

    try {

      const res = await getDepartmentsByOrganization(orgId);

      setDepartments(res.data);

    } catch (error) {

      console.error("Failed to fetch departments", error);

    }
  };

  return (
    <div className="department-container">

      <h3>Select Department</h3>

      <form className="department-form">

        {/* Organization Dropdown */}
        <select
          value={organization}
          onChange={handleOrganizationChange}
          required
        >
          <option value="">Select Organization</option>

          {organizations.map((org) => (
            <option key={org._id} value={org._id}>
              {org.name}
            </option>
          ))}

        </select>

        {/* Department Dropdown */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >

          <option value="">Select Department</option>

          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}

        </select>

      </form>

    </div>
  );
}

export default DepartmentAdd;