import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const LoginModal = ({ show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        login(data.token, data.user);
        handleClose();
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${show ? 'visible' : 'invisible'} bg-black bg-opacity-50 z-50`}>
      <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-md">
        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password" 
              id="password"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-500">Don't have an account yet? <Link to="/register" className="text-blue-500 hover:underline">Create Account</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
