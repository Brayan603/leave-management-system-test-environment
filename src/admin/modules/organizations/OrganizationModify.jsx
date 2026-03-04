import React, { useState } from "react";
import { updateOrganization } from "./OrganizationService";
import "./Organization.css";

function EditOrganization() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleUpdate = async () => {
    try {
      await updateOrganization(id, { name });
      alert("Updated successfully");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="org-container">
      <h3>Edit Organization</h3>
      <input
        type="text"
        placeholder="Organization ID"
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="text"
        placeholder="New Name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default EditOrganization;