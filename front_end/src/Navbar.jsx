import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from 'logo.svg';

const Navbar = ({ userInfo }) => {
  const navigate = useNavigate();
  const isToken = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar navbar-dark bg-dark">
      <img src={logo} width="30" height="30" className="d-inline-block align-top" alt="travel stories" />
      {isToken && (
        <ProfileInfo userInfo={userInfo} handleLogout={handleLogout} />
      )}
    </div>
  );
};

const ProfileInfo = ({ userInfo, handleLogout }) => {
  return (
    <div className="profile-info">
      <span>{userInfo?.name}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Navbar;
