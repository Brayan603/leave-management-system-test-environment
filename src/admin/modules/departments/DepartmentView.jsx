import React, { useEffect, useState } from "react";
import { getDepartments } from "./DepartmentService";
import "./Department.css";

function DepartmentView() {

  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="department-container">

      <h3>Departments</h3>

      <table className="department-table">

        <thead>
          <tr>
            <th>#</th>
            <th>Department Name</th>
          </tr>
        </thead>

        <tbody>
          {departments.map((dept, index) => (
            <tr key={dept._id}>
              <td>{index + 1}</td>
              <td>{dept.name}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default DepartmentView;