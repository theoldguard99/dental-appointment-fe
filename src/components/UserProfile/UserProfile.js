import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

const UserProfile = ({ onProfileUpdate }) => {
  const { user, login } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthdate: '',
    contactNumber: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        address: user.address || '',
        birthdate: user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : '',
        contactNumber: user.contactNumber || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      address: profileData.address,
      birthdate: profileData.birthdate,
      contactNumber: profileData.contactNumber,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        onProfileUpdate();
      } else {
        console.error(`Failed to update profile: ${data.message}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-lg w-full">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="w-full border border-gray-300 rounded-md p-2"
            value={profileData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full border border-gray-300 rounded-md p-2"
            value={profileData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="contactNumber">Contact Number</label>
          <input
            type="text"
            id="contactNumber"
            name="contactNumber"
            className="w-full border border-gray-300 rounded-md p-2"
            value={profileData.contactNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full border border-gray-300 rounded-md p-2"
            value={profileData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="birthdate">Birthdate</label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="w-full border border-gray-300 rounded-md p-2"
            value={profileData.birthdate}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Save
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
