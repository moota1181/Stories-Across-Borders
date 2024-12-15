import React from 'react';
import './SignupPage.css';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  const [fullName, setUser] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/createaccount';
    const result = await callApi(url, 'POST', { fullName, email, password });

    if (result.error) {
      // alert('Login Failed: ' + result.error);
      console.log('Signup Failed: ' + result.error.message);

    } else {
      alert('Signup Successful!');
      console.log('User Data:', result);
    }
  }
  const callApi = async (url, method = 'POST', body = null) => {
    try {
      const response = await axios({
        method,
        url,
        data: body,
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error calling API:', error.response?.data || error.message);
      return { error: error.response?.data || error.message };
    }
  };
  return (
    <div className="container">
      <div className="left-panel">
        <h2>Capture Your Journeys</h2>
      </div>

      <div className="right-panel">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn" >Signup</button>
        </form>
        <Link to="/login" className="link" >Log in</Link>
      </div>
    </div>
  );
};

export default SignupPage;
