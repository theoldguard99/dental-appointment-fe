import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Dialog from '../Dialog/Dialog';

const UserProfile = ({ onProfileUpdate }) => {
  const { user, login } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    birthdate: '',
    medicalHistory: null,
  });
  const [dialog, setDialog] = useState({ show: false, title: '', message: '', type: '' });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        birthdate: new Date(user.birthdate).toISOString().split('T')[0],
        medicalHistory: user.medicalHistory,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'medicalHistory') {
      setProfileData((prevData) => ({ ...prevData, medicalHistory: files[0] }));
    } else {
      setProfileData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', profileData.firstName);
    formData.append('lastName', profileData.lastName);
    formData.append('address', profileData.address);
    formData.append('birthdate', profileData.birthdate);
    if (profileData.medicalHistory) {
      formData.append('medicalHistory', profileData.medicalHistory);
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        setDialog({
          show: true,
          title: 'Success',
          message: 'Profile updated successfully',
          type: 'success'
        });
        if (onProfileUpdate) {
          onProfileUpdate();
        }
      } else {
        setDialog({
          show: true,
          title: 'Error',
          message: `Failed to update profile: ${data.message}`,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setDialog({
        show: true,
        title: 'Error',
        message: `Error updating profile: ${error.message}`,
        type: 'error'
      });
    }
  };

  const closeDialog = () => {
    setDialog({ show: false, title: '', message: '', type: '' });
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
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="medicalHistory">Medical History (PDF)</label>
          <input
            type="file"
            id="medicalHistory"
            name="medicalHistory"
            className="w-full border border-gray-300 rounded-md p-2"
            accept=".pdf"
            onChange={handleChange}
          />
          {profileData.medicalHistory && (
            <div className="mt-2">
              <a href={`${process.env.REACT_APP_API_BASE_URL}/${profileData.medicalHistory}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View Medical History
              </a>
            </div>
          )}
        </div>
        <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
          Save
        </button>
      </form>
      <Dialog
        show={dialog.show}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        onClose={closeDialog}
      />
    </div>
  );
};

export default UserProfile;
