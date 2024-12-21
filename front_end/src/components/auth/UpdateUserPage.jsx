import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './update.css';

const UpdateUserPage = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Fetch user data on component mount (you can adjust this to fetch data if necessary)
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getUser', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        const { fullName, email , password } = response.data.user;
        setFullName(fullName);
        setEmail(email);
        setPassword(password); // Set password for password field (optional)

      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data');

      }

    };
    
    getUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        'http://localhost:5000/updateUser',
        { fullName, email , password },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        }
      );
      setSuccessMessage(response.data.message); // Show success message
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error.response?.data?.message || 'Failed to update user');
    }
  };

  return (
    <span>
      <div className="container-update">
       <div className="update-user-container">
        <h2>Update Your Information</h2>
      
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          </div>
          <div className="form-group">
          <label>password:</label>
          <input
                type="password"
                className="password-input"
            value={password}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>


        <button type="submit" className="btn">Update</button>
        </form>
       </div >
      </div>  
    </span>
  );
};

export default UpdateUserPage;
