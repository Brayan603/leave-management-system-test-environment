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
      setOrganizations(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="org-container">
      <h3>View Organizations</h3>

      <select className="org-dropdown">
        <option value="">Select Organization</option>
        {organizations.map((org) => (
          <option key={org._id} value={org._id}>
            {org.name}
          </option>
        ))}
      </select>

      <table className="org-table">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((org) => (
            <tr key={org._id}>
              <td>{org.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewOrganizations;