import React, { useEffect, useState } from "react";
import { getOrganizations } from "./OrganizationService";
import "./Organization.css";

function ViewOrganizations() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getOrganizations();
      setOrganizations(res.data || []);
    } catch (error) {
      console.error("Error fetching organizations:", error);
    }
  };

  return (
    <div className="org-container">
      <h3>View Organizations</h3>

      {organizations.length > 0 ? (
        <table className="org-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {organizations.map((org) => (
              <tr key={org._id}>
                <td>{org.code}</td>
                <td>{org.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ textAlign: "center", padding: "10px", color: "#64748b" }}>
          No organizations added yet.
        </p>
      )}
    </div>
  );
}

export default ViewOrganizations;