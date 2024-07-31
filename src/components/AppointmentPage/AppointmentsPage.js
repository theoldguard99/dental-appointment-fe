import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import BookingUpdateForm from '../BookingPage/BookingUpdateForm';
import Dialog from '../Dialog/Dialog';

const Appointments = () => {
  const { user } = useContext(AuthContext);
  const [appointments, setAppointments] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [dialog, setDialog] = useState({ show: false, title: '', message: '', type: '' });

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
        setDialog({
          show: true,
          title: 'Error',
          message: 'Failed to fetch appointments.',
          type: 'error'
        });
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
        setDialog({
          show: true,
          title: 'Success',
          message: 'Appointment deleted successfully.',
          type: 'success'
        });
      } else {
        console.error(`Failed to delete appointment: ${data.message}`);
        setDialog({
          show: true,
          title: 'Error',
          message: `Failed to delete appointment: ${data.message}`,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      setDialog({
        show: true,
        title: 'Error',
        message: `Error deleting appointment: ${error.message}`,
        type: 'error'
      });
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

  const closeDialog = () => {
    setDialog({ show: false, title: '', message: '', type: '' });
  };

  return (
    <div className="w-full h-full">
      <div className="h-96 overflow-y-auto bg-gray-100 rounded-lg p-4 shadow-lg">
        {appointments.length === 0 ? (
          <div className="flex items-center justify-center bg-white p-6 mb-4 rounded-lg shadow-lg">
            <p className="text-gray-600">No upcoming appointments.</p>
          </div>
        ) : (
          appointments.map(appointment => (
            <div key={appointment._id} className="flex items-center justify-between bg-white p-6 mb-4 rounded-lg shadow-lg w-full">
              <div>
                <h3 className="text-2xl font-bold text-blue-600">{appointment.service}</h3>
                <p className="text-gray-700">Dentist: {appointment.dentist}</p>
                <p className="text-gray-700">Date: {new Date(appointment.date).toLocaleDateString()}</p>
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
          ))
        )}
      </div>

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
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <BookingUpdateForm appointment={selectedAppointment} onClose={() => setShowUpdateForm(false)} />
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

export default Appointments;
