import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const Profile = () => {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: ''
    });

    const getUser = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/getUser/${userId}`);
            setUser(response.data);
            setFormData({
                fullName: response.data.fullName,
                email: response.data.email,
                password: '' // To be updated by the user
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        setLoading(false);
    };
    if (loading) {
        return <div>Loading...</div>;
    }


    const updateUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:5000/updateUser/${userId}`, formData);
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        }
    };

    useEffect(() => {
        getUser();
    }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-header">
                <img src="path/to/default/profile/picture.jpg" alt={`${user.fullName}'s profile`} className="profile-picture" />
                {isEditing ? (
                    <form onSubmit={updateUser}>
                        <div>
                            <label>Full Name:</label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <>
                        <h1>{user.fullName}</h1>
                        <p>Email: {user.email}</p>
                        <p>Account Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
