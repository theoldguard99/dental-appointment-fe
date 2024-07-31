import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import BookingForm from '../BookingPage/BookingForm';
import Appointments from '../AppointmentPage/AppointmentsPage';
import UserProfile from '../UserProfile/UserProfile';
import { FaSignOutAlt } from 'react-icons/fa';
import Dialog from '../Dialog/Dialog';

const Dashboard = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState('appointments');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [dialog, setDialog] = useState({ show: false, title: '', message: '', type: '' });
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/validate-token`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        login(localStorage.getItem('token'), data.user);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      navigate('/');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    } else {
      fetchUserData();
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    setDialog({
      show: true,
      title: 'Logout Success',
      message: 'You have been successfully logged out.',
      type: 'success'
    });
    navigate('/');
  };

  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  const closeDialog = () => {
    setDialog({ show: false, title: '', message: '', type: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <div>
          <h1 className="text-3xl font-bold">Hello, {user?.firstName || 'Guest'}!</h1>
          <p className="text-xl">Today is {dateTime.toLocaleString()}</p>
        </div>
        <div className="flex space-x-10 items-center">
          <button
            className="text-xl font-semibold relative group hover:text-blue-500 transition-transform transform hover:-translate-y-1"
            onClick={() => setView('appointments')}
          >
            <span className="relative z-10">My Appointments</span>
          </button>
          <button
            className="text-xl font-semibold relative group hover:text-blue-500 transition-transform transform hover:-translate-y-1"
            onClick={() => setView('booking')}
          >
            <span className="relative z-10">Book an Appointment</span>
          </button>
          <button
            className="text-xl font-semibold relative group hover:text-blue-500 transition-transform transform hover:-translate-y-1"
            onClick={() => setView('profile')}
          >
            <span className="relative z-10">My Profile</span>
          </button>
          <button
            onClick={handleLogoutClick}
            className="flex items-center text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            <FaSignOutAlt size={24} />
            <span className="ml-2">Logout</span>
          </button>
        </div>
      </div>
      <div className="relative flex flex-grow bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 p-10">
        {view === 'appointments' && (
          <div className='relative flex flex-grow w-full bg-transparent p-8'>
            <div className="flex flex-col justify-center text-left w-full lg:w-2/3 pr-10 bg-blue-500 text-white p-8 rounded-lg z-10">
              <h2 className="text-6xl font-bold mb-6">List of your Appointments</h2>
              <p className="text-xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-full lg:w-1/2 bg-transparent p-8 lg:-ml-10 z-20">
              <Appointments />
            </div>
          </div>
        )}
        {view === 'booking' && (
          <div className="relative flex flex-grow w-full bg-transparent p-8">
            <div className="flex flex-col justify-center text-left w-full lg:w-2/3 pr-10 bg-blue-500 text-white p-8 rounded-lg z-10">
              <h2 className="text-6xl font-bold mb-6">Make an Appointment</h2>
              <p className="text-xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-full lg:w-1/2 bg-transparent p-8 lg:-ml-10 z-20">
              <BookingForm onClose={() => setView('appointments')} />
            </div>
          </div>
        )}
        {view === 'profile' && (
          <div className="relative flex flex-grow w-full bg-transparent p-8">
            <div className="flex flex-col justify-center text-left w-full lg:w-2/3 pr-10 bg-blue-500 text-white p-8 rounded-lg z-10">
              <h2 className="text-6xl font-bold mb-6">View & Update your Profile</h2>
              <p className="text-xl mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-full lg:w-1/2 bg-transparent p-8 lg:-ml-10 z-20">
              <UserProfile onProfileUpdate={fetchUserData} />
            </div>
          </div>
        )}
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
            <p>Are you sure you want to log out?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={handleCancelLogout} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300">
                No
              </button>
              <button onClick={handleConfirmLogout} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

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

export default Dashboard;
