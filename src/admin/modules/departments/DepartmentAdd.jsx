import React, { useState, useEffect } from "react";
import { getDepartmentsByOrganization } from "./DepartmentService";
import { getOrganizations } from "../organizations/OrganizationService"; // adjust path if needed

const DepartmentSelect = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [loadingDepartments, setLoadingDepartments] = useState(false);

  /* Fetch organizations */
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const res = await getOrganizations();

        // Ensure we always set an array
        const orgArray =
          res?.data || res?.organizations || (Array.isArray(res) ? res : []);

        setOrganizations(orgArray);
      } catch (error) {
        console.error("Error fetching organizations:", error);
        setOrganizations([]);
      }
    };

    fetchOrganizations();
  }, []);

  /* Fetch departments when organization changes */
  useEffect(() => {
    if (!selectedOrg) {
      setDepartments([]);
      setSelectedDept("");
      return;
    }

    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);

        const res = await getDepartmentsByOrganization(selectedOrg);

        const deptArray =
          res?.data || res?.departments || (Array.isArray(res) ? res : []);

        setDepartments(deptArray);
        setSelectedDept("");
      } catch (error) {
        console.error("Error fetching departments:", error);
        setDepartments([]);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, [selectedOrg]);

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "20px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
      }}
    >
      <h2>Select Department</h2>

      {/* Organization Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label>Organization:</label>

        <select
          value={selectedOrg}
          onChange={(e) => setSelectedOrg(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
        >
          <option value="">Select Organization</option>

          {Array.isArray(organizations) &&
            organizations.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name} ({org.code})
              </option>
            ))}
        </select>
      </div>

      {/* Department Dropdown */}
      <div style={{ marginBottom: "10px" }}>
        <label>Department:</label>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          disabled={!selectedOrg || loadingDepartments}
        >
          <option value="">
            {loadingDepartments ? "Loading departments..." : "Select Department"}
          </option>

          {Array.isArray(departments) &&
            departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
        </select>
      </div>

      {/* Selected Department */}
      {selectedDept && (
        <p>
          Selected Department:{" "}
          <strong>
            {departments.find((d) => d._id === selectedDept)?.name}
          </strong>
        </p>
      )}
    </div>
  );
};

export default DepartmentSelect;