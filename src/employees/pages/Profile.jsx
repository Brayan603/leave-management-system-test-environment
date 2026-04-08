import React, { useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(
    JSON.parse(sessionStorage.getItem("user"))
  );

  const handleUpload = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    const res = await axios.post("/api/upload-profile", formData);

    const updatedUser = {
      ...user,
      profilePic: res.data.profilePic,
    };

    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <div>
      <h2>Profile</h2>

      <img
        src={user?.profilePic || "/default.png"}
        alt="profile"
        width="100"
      />

      <input type="file" onChange={handleUpload} />

      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
      <p>Phone: {user?.phone}</p>
    </div>
  );
};

export default Profile;