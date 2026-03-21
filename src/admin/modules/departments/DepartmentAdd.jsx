// DepartmentSelect.jsx
import React, { useState, useEffect } from "react";
import { getOrganizations } from "../organizations/OrganizationService";
import { getDepartmentsByOrganization } from "./DepartmentService";
import { getSubDepartmentsByDepartment } from "./subDepartmentService";

const DepartmentSelect = () => {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedOrgObj, setSelectedOrgObj] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [subdepartments, setSubdepartments] = useState([]);
  const [selectedSubDept, setSelectedSubDept] = useState("");
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [loadingSubdepartments, setLoadingSubdepartments] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch organizations
  useEffect(() => {
    const fetchOrgs = async () => {
      try {
        const res = await getOrganizations();
        const orgArray = res?.data || res?.organizations || (Array.isArray(res) ? res : []);
        setOrganizations(orgArray);
      } catch (error) {
        console.error(error);
      }
    };
    fetchOrgs();
  }, []);

  // When organization changes
  useEffect(() => {
    const orgObj = organizations.find((o) => o._id === selectedOrg) || null;
    setSelectedOrgObj(orgObj);

    if (!selectedOrg) {
      setDepartments([]);
      setSelectedDept("");
      setSubdepartments([]);
      setSelectedSubDept("");
      return;
    }

    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);
        const res = await getDepartmentsByOrganization(selectedOrg);
        const deptArray = res?.data || res?.departments || (Array.isArray(res) ? res : []);
        setDepartments(deptArray);
        setSelectedDept("");
        setSubdepartments([]);
        setSelectedSubDept("");
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingDepartments(false);
      }
    };
    fetchDepartments();
  }, [selectedOrg, organizations]);

  // Fetch subdepartments when department changes
  useEffect(() => {
    if (!selectedDept) {
      setSubdepartments([]);
      setSelectedSubDept("");
      return;
    }

    const fetchSubdepartments = async () => {
      try {
        setLoadingSubdepartments(true);
        const subs = await getSubDepartmentsByDepartment(selectedDept);
        setSubdepartments(subs || []);
        setSelectedSubDept("");
      } catch (error) {
        console.error(error);
        setSubdepartments([]);
      } finally {
        setLoadingSubdepartments(false);
      }
    };
    fetchSubdepartments();
  }, [selectedDept]);

  // Handle submit locally + save to localStorage
  const handleSubmit = () => {
    if (!selectedOrg || !selectedDept || !selectedSubDept) {
      setMessage("Please select organization, department, and subdepartment.");
      return;
    }

    const deptName = departments.find((d) => d._id === selectedDept)?.name;
    const subName = subdepartments.find((s) => s._id === selectedSubDept)?.name;

    const selection = {
      organization: selectedOrgObj?.name,
      organizationCode: selectedOrgObj?.code || "",
      department: deptName,
      subdepartment: subName,
    };

    // Get previous selections from localStorage
    const prevSelections = JSON.parse(localStorage.getItem("selections")) || [];
    localStorage.setItem("selections", JSON.stringify([...prevSelections, selection]));

    setMessage("Selection submitted successfully!");
    handleClear();
  };

  // Handle clear
  const handleClear = () => {
    setSelectedOrg("");
    setSelectedOrgObj(null);
    setSelectedDept("");
    setSelectedSubDept("");
    setDepartments([]);
    setSubdepartments([]);
    setMessage("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2>Select Organization, Department & Subdepartment</h2>

      <label>Organization:</label>
      <select
        value={selectedOrg}
        onChange={(e) => setSelectedOrg(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "5px" }}
      >
        <option value="">Select Organization</option>
        {organizations.map((org) => (
          <option key={org._id} value={org._id}>{org.name}</option>
        ))}
      </select>

      {selectedOrgObj && <p style={{ margin: "5px 0", fontWeight: "bold" }}>Code: {selectedOrgObj.code}</p>}

      <label>Department:</label>
      <select
        value={selectedDept}
        onChange={(e) => setSelectedDept(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        disabled={!selectedOrg || loadingDepartments}
      >
        <option value="">{loadingDepartments ? "Loading departments..." : "Select Department"}</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>{dept.name}</option>
        ))}
      </select>

      <label>Subdepartment:</label>
      <select
        value={selectedSubDept}
        onChange={(e) => setSelectedSubDept(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        disabled={!selectedDept || loadingSubdepartments}
      >
        <option value="">{loadingSubdepartments ? "Loading subdepartments..." : "Select Subdepartment"}</option>
        {subdepartments.map((sub) => (
          <option key={sub._id} value={sub._id}>{sub.name}</option>
        ))}
      </select>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        <button onClick={handleSubmit} style={{ flex: 1, padding: "10px", backgroundColor: "#4caf50", color: "#fff", border: "none", borderRadius: "4px" }}>Submit</button>
        <button onClick={handleClear} style={{ flex: 1, padding: "10px", backgroundColor: "#f44336", color: "#fff", border: "none", borderRadius: "4px" }}>Clear</button>
      </div>

      {message && <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
    </div>
  );
};

export default DepartmentSelect;