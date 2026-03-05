import React, { useState } from "react";
import { updateDepartment } from "./DepartmentService";
import "./Department.css";

function DepartmentModify() {

  const [id, setId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateDepartment(id, { name });
      alert("Department updated");
    } catch (error) {
      alert("Update failed");
    }
  };

  return (
    <div className="department-container">

      <h3>Modify Department</h3>

      <form onSubmit={handleSubmit} className="department-form">

        <input
          type="text"
          placeholder="Department ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="text"
          placeholder="New Department Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit">Update</button>

      </form>

    </div>
  );
}

export default DepartmentModify;