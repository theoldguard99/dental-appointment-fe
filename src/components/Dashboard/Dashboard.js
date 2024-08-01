import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import BookingForm from '../BookingPage/BookingForm';
import Appointments from '../AppointmentPage/AppointmentsPage';
import UserProfile from '../UserProfile/UserProfile';
import { FaSignOutAlt, FaCalendarAlt, FaClipboardList, FaUserAlt } from 'react-icons/fa';
import Dialog from '../Dialog/Dialog';

const Dashboard = () => {
  const { user, login, logout } = useContext(AuthContext);
  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState('appointments');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [dialog, setDialog] = useState({ show: false, title: '', message: '', type: '' });
  const [modalContent, setModalContent] = useState(null);
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

  const handleProfileUpdate = () => {
    setDialog({
      show: true,
      title: 'Success',
      message: 'Profile updated successfully',
      type: 'success'
    });
  };

  const closeDialog = () => {
    setDialog({ show: false, title: '', message: '', type: '' });
  };

  const handleModalOpen = (content) => {
    setModalContent(content);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="relative bg-white shadow-md">
        <div className="flex justify-between items-center p-4">
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
        <svg className="absolute bottom-0 w-full h-12" viewBox="0 0 1440 320">
          <path fill="#fff" fillOpacity="1" d="M0,128L48,160C96,192,192,256,288,256C384,256,480,192,576,154.7C672,117,768,107,864,128C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1248,320,1152,320,1056,320C960,320,864,320,768,320C672,320,576,320,480,320C384,320,288,320,192,320C96,320,48,320,0,320Z"></path>
        </svg>
      </div>
      <div className="relative flex flex-grow bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 p-10">
        {view === 'appointments' && (
          <div className='relative flex flex-grow w-full bg-transparent p-8'>
            <div className="flex flex-col justify-center text-left w-2/3 pr-10 text-white p-8 rounded-lg z-10"
              style={{ background: 'linear-gradient(to right, #3b82f6, #1e3a8a)' }}>
              <h2 className="text-6xl font-bold mb-6">List of your Appointments</h2>
              <p className="text-xl mb-6">
                Welcome to our clinic! Here you can view and manage your upcoming appointments. Our dedicated team is here to provide you with the best care possible. Thank you for choosing our clinic for your dental health needs.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <FaCalendarAlt size={50} />
                <p className="text-lg">See your upcoming appointments</p>
              </div>
            </div>
            <div className="flex-grow bg-transparent p-8 z-20 ml-10">
              <Appointments onAppointmentsUpdate={setDialog} onModalOpen={handleModalOpen} />
            </div>
          </div>
        )}
        {view === 'booking' && (
          <div className="relative flex flex-grow w-full bg-transparent p-8">
            <div className="flex flex-col justify-center text-left w-2/3 pr-10 text-white p-8 rounded-lg z-10"
              style={{ background: 'linear-gradient(to right, #3b82f6, #1e3a8a)' }}>
              <h2 className="text-6xl font-bold mb-6">Make an Appointment</h2>
              <p className="text-xl mb-6">
                We are thrilled to help you schedule your next visit. Please fill out the form to book an appointment with our experienced and friendly dentists. Your dental health is our top priority.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <FaClipboardList size={50} />
                <p className="text-lg">Book an appointment</p>
              </div>
            </div>
            <div className="flex-grow bg-transparent p-8 z-20 ml-10">
              <BookingForm onClose={() => setView('appointments')} onModalOpen={handleModalOpen} setDialog={setDialog} />
            </div>
          </div>
        )}
        {view === 'profile' && (
          <div className="relative flex flex-grow w-full bg-transparent p-8">
            <div className="flex flex-col justify-center text-left w-2/3 pr-10 text-white p-8 rounded-lg z-10"
              style={{ background: 'linear-gradient(to right, #3b82f6, #1e3a8a)' }}>
              <h2 className="text-6xl font-bold mb-6">View & Update your Profile</h2>
              <p className="text-xl mb-6">
                Here you can view and update your personal information. Keeping your profile up-to-date helps us provide you with the best service and personalized care.
              </p>
              <div className="flex items-center mt-4 space-x-4">
                <FaUserAlt size={50} />
                <p className="text-lg">Update your profile</p>
              </div>
            </div>
            <div className="flex-grow bg-transparent p-8 z-20 ml-10">
              <UserProfile onProfileUpdate={handleProfileUpdate} />
            </div>
          </div>
        )}
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn">
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

      {modalContent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 animate__animated animate__fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {modalContent}
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
