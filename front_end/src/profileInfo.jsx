import React from "react";
import { Link } from "react-router-dom";
import { getInitials } from '../utils'; // Ensure you have this utility function available

const ProfileInfo = ({ userInfo, handleLogout }) => {
  return (
    userInfo && (
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 font-bold bg-slate-100 rounded-full flex justify-center items-center text-slate-950">
          {getInitials(userInfo ? userInfo.username : "")}
        </div>
        <div>
          <p className="text-sm font-bold">Welcome, {userInfo.username || ""}</p>
          <p>Your email: {userInfo.email}</p>
          <button className="text-sm text-slate-700 underline" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfo;

