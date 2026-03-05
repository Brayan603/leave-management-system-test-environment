import React, { useState } from "react";
import { deleteDepartment } from "./DepartmentService";
import "./Department.css";

function DepartmentDelete() {

  const [id, setId] = useState("");

  const handleDelete = async () => {
    try {
      await deleteDepartment(id);
      alert("Department deleted");
      setId("");
    } catch (error) {
      alert("Delete failed");
    }
  };

  return (
    <div className="department-container">

      <h3>Delete Department</h3>

      <input
        type="text"
        placeholder="Department ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      <button onClick={handleDelete}>Delete</button>

    </div>
  );
}

export default DepartmentDelete;