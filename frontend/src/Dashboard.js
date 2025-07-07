import React, { useState } from 'react';
import './App.css';
import defaultImg from './profile.jpg';

function Dashboard() {
  const [image, setImage] = useState(defaultImg);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  return (
    <div className="dashboard">
      <h1>Welcome to CRODE</h1>
      <div className="profile-card">
        <img src={image} alt="Profile" className="profile-pic" />
        <h2>Jayden McBride</h2>
        <h4>Student Developer</h4>
        <p>"Passionate about sports, tech, and helping others."</p>

        <label className="upload-label">
          Upload Profile Picture
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </label>
      </div>
    </div>
  );
}

export default Dashboard;
