import React, { useState } from 'react';
import api from './api'; // ✅ Make sure api.js is in src/

function AddOpportunity() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You must be logged in to post.');
        return;
      }

      await api.post(
        '/api/opportunities/',
        { title, description },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      alert('Post created!');
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Post failed — are you logged in?');
    }
  };

  return (
    <div>
      <h2>Add Opportunity</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}

export default AddOpportunity;
