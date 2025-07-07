import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/registration/', {
        username,
        password1,
        password2
      });

      const token = response.data.key;
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      navigate('/');
    } catch (err) {
      setError("Signup failed — username taken or invalid.");
    }
  };

  return (
    <div className="login-box">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" required value={password1} onChange={(e) => setPassword1(e.target.value)} />
        <input type="password" placeholder="Confirm Password" required value={password2} onChange={(e) => setPassword2(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
