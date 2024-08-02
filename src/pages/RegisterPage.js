import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dialog from '../components/Dialog/Dialog';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    birthdate: '',
    contactNumber: '' 
  });
  const [dialog, setDialog] = useState({
    show: false,
    title: '',
    message: '',
    type: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setDialog({
          show: true,
          title: 'Success',
          message: 'Registration successful!',
          type: 'success',
        });
      } else {
        setDialog({
          show: true,
          title: 'Error',
          message: data.error || 'Registration failed.',
          type: 'error',
        });
        console.error(data.error);
      }
    } catch (error) {
      setDialog({
        show: true,
        title: 'Error',
        message: 'Error registering. Please try again.',
        type: 'error',
      });
      console.error('Error registering:', error);
    }
  };

  const handleCloseDialog = () => {
    setDialog({ show: false, title: '', message: '', type: '' });
    if (dialog.type === 'success') {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.firstName}
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
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.confirmPassword}
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
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.address}
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
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.birthdate}
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
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
      <Dialog 
        show={dialog.show} 
        title={dialog.title} 
        message={dialog.message} 
        type={dialog.type} 
        onClose={handleCloseDialog} 
      />
    </div>
  );
};

export default RegisterPage;
