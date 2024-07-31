import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import BookingUpdateForm from '../BookingPage/BookingUpdateForm';

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/appointments`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleDeleteClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/appointments/${selectedAppointment._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setAppointments(appointments.filter(appointment => appointment._id !== selectedAppointment._id));
        setShowConfirmModal(false);
      } else {
        console.error(`Failed to delete appointment: ${data.message}`);
        alert(`Failed to delete appointment: ${data.message}`);
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert(`Error deleting appointment: ${error.message}`);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setSelectedAppointment(null);
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowUpdateForm(true);
  };

  return (
    <div className="w-full">
      {appointments.map(appointment => (
        <div key={appointment._id} className="flex items-center justify-between bg-white p-4 mb-4 rounded shadow-lg">
          <div>
            <h3 className="text-xl font-bold">{appointment.service}</h3>
            <p className="text-gray-600">{appointment.dentist}</p>
            <p className="text-gray-600">{new Date(appointment.date).toLocaleDateString()}</p>
          </div>
          <div className="flex space-x-4">
            <button className="text-blue-500 hover:text-blue-700" onClick={() => handleEditClick(appointment)}>
              <FaEdit size={20} />
            </button>
            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteClick(appointment)}>
              <FaTrashAlt size={20} />
            </button>
          </div>
        </div>
      ))}

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to cancel this appointment?</p>
            <div className="flex justify-between mt-4">
              <button onClick={handleCancelDelete} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300">
                No
              </button>
              <button onClick={handleConfirmDelete} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <BookingUpdateForm appointment={selectedAppointment} onClose={() => setShowUpdateForm(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
