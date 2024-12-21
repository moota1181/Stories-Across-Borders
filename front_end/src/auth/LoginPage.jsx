import React from 'react';
import './LoginPage.css';
import { useState } from 'react';
import axios from 'axios';
import { Link , useNavigate} from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/login';
    const result = await callApi(url, 'POST', { email, password });

    if (result.error) {
      console.log('Login Failed: ' + result.error.message);

    } else {
      navigate('/Homepage');
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
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="btn" >LOGIN</button>
        </form>
        <Link to="/signup" className="link" >Create Account</Link>
      </div>
    </div>
  );
};

export default LoginPage;
