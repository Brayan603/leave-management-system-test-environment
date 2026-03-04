import React, { useState, useEffect } from "react";
import { getOrganizations } from "./OrganizationService";
import "./Organization.css";

function AddOrganization() {
  const [organizations, setOrganizations] = useState([]);
  const [selectedOrgCode, setSelectedOrgCode] = useState("");

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const res = await getOrganizations(); // [{ _id, name, code, ... }]
      console.log("Fetched organizations:", res.data);
      setOrganizations(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
      alert("Failed to fetch organizations");
    }
  };

  const handleSelect = (e) => {
    const selectedName = e.target.value;
    const org = organizations.find((o) => o.name === selectedName);
    setSelectedOrgCode(org ? org.code : "");
  };

  const handleConfirm = () => {
    if (!selectedOrgCode) {
      alert("Please select an organization");
      return;
    }

    console.log("Selected Organization Code:", selectedOrgCode);
    alert(`Organization selected successfully! Code: ${selectedOrgCode}`);
  };

  return (
    <div className="org-fullscreen-container">
      <div className="org-card">
        <h2>Select Organization</h2>

        <form className="org-form" onSubmit={(e) => e.preventDefault()}>
          <div className="org-field">
            <label>Organization Name</label>
            <select onChange={handleSelect} required>
              <option value="">-- Select Organization --</option>
              {organizations.map((org) => (
                <option key={org._id} value={org.name}>
                  {org.name}
                </option>
              ))}
            </select>
          </div>

          <div className="org-field">
            <label>Organization Code</label>
            <input
              type="text"
              value={selectedOrgCode}
              readOnly
              placeholder="Organization code will appear here"
            />
          </div>

          <div className="org-buttons">
            <button
              type="button"
              className="submit-btn"
              disabled={!selectedOrgCode}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddOrganization;