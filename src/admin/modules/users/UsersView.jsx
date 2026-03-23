import React, { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../api/userApi";

const UsersView = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      fetchUsers(); // refresh the list
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h2>Users List</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>First Name</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Last Name</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Email</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Role</th>
            <th style={{ border: "1px solid #ccc", padding: "0.5rem" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.firstName}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.lastName}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.email}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>{user.role}</td>
              <td style={{ border: "1px solid #ccc", padding: "0.5rem" }}>
                <button
                  onClick={() => handleDelete(user._id)}
                  style={{ backgroundColor: "red", color: "#fff", padding: "0.3rem 0.5rem", border: "none", borderRadius: "3px", cursor: "pointer" }}
                >
                  Delete
                </button>
                {/* You can add Edit button here and open a form to update */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersView;