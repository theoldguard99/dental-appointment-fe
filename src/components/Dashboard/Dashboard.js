import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import BookingForm from '../BookingPage/BookingForm';
import Appointments from '../AppointmentPage/AppointmentsPage';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [dateTime, setDateTime] = useState(new Date());
  const [view, setView] = useState('appointments'); 

  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Hello, {user?.firstName || 'Guest'}!</h1>
        <p className="text-xl">Today is {dateTime.toLocaleString()}</p>
      </div>
      <div className="flex space-x-10 mb-8">
        <button
          className="bg-white p-6 rounded-lg shadow-lg w-64 text-center"
          onClick={() => setView('appointments')}
        >
          <h2 className="text-xl font-semibold">My Appointments</h2>
        </button>
        <button
          className="bg-white p-6 rounded-lg shadow-lg w-64 text-center"
          onClick={() => setView('booking')}
        >
          <h2 className="text-xl font-semibold">Book an Appointment</h2>
        </button>
        <button className="bg-white p-6 rounded-lg shadow-lg w-64 text-center">
          <h2 className="text-xl font-semibold">My Calendar</h2>
        </button>
      </div>
      {view === 'appointments' && (
        <div className="w-full max-w-2xl mt-8">
          <Appointments />
        </div>
      )}
      {view === 'booking' && (
        <div className="w-full max-w-2xl mt-8">
          <BookingForm onClose={() => setView('appointments')} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
