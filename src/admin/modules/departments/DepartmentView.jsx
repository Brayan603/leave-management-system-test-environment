// DepartmentView.jsx
import React, { useEffect, useState } from "react";
import "./Department.css";

function DepartmentView() {
  const [selections, setSelections] = useState([]);

  useEffect(() => {
    const savedSelections = JSON.parse(localStorage.getItem("selections")) || [];
    setSelections(savedSelections);
  }, []);

  return (
    <div className="department-container">
      <h3>Submitted Selections</h3>
      <table className="department-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Organization</th>
            <th>Code</th>
            <th>Department</th>
            <th>Subdepartment</th>
          </tr>
        </thead>
        <tbody>
          {selections.map((s, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{s.organization}</td>
              <td>{s.organizationCode}</td>
              <td>{s.department}</td>
              <td>{s.subdepartment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DepartmentView;