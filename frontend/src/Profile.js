import React, { useState, useEffect } from 'react';
import api from './api';
import './Profile.css';

function Profile() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({});
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/user/');
        setUser(res.data);
        setForm({
          first_name: res.data.first_name || '',
          last_name: res.data.last_name || '',
          bio: res.data.bio || '',
        });
      } catch (err) {
        setError('Failed to fetch profile.');
      }
    };
    fetchProfile();
  }, []);

const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      username: user.username,       // 👈 must include
      email: user.email || '',       // 👈 must include
      first_name: form.first_name || '',
      last_name: form.last_name || '',
      bio: form.bio || '',
    };

    const res = await api.put('/auth/user/', payload);
    setUser(res.data);
    setMessage('Profile updated!');
    setError('');
    setEditing(false);
  } catch (err) {
    console.error(err.response?.data || err);
    setError(
      err.response?.data?.detail ||
      'Failed to update profile.'
    );
  }
};
  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Welcome, {user.username}</h2>
        {message && <p className="message">{message}</p>}
        {error && <p className="error">{error}</p>}

        {editing ? (
          <form onSubmit={handleUpdate}>
            <input
              value={form.first_name}
              onChange={e => setForm({ ...form, first_name: e.target.value })}
              placeholder="First Name"
            />
            <input
              value={form.last_name}
              onChange={e => setForm({ ...form, last_name: e.target.value })}
              placeholder="Last Name"
            />
            <input
              value={form.bio}
              onChange={e => setForm({ ...form, bio: e.target.value })}
              placeholder="Bio"
            />
            <button type="submit">Save</button>
          </form>
        ) : (
          <>
            <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Bio:</strong> {user.bio || 'No bio provided.'}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
