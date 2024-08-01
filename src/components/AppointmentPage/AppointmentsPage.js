import React, { useEffect, useState } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import BookingUpdateForm from '../BookingPage/BookingUpdateForm';

const Appointments = ({ onAppointmentsUpdate, onModalOpen }) => {
  const [appointments, setAppointments] = useState([]);
  const [, setSelectedAppointment] = useState(null);

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
        onAppointmentsUpdate({
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
    onModalOpen(
      <div className="modal-content">
        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
        <p>Are you sure you want to cancel this appointment?</p>
        <div className="flex justify-between mt-4">
          <button onClick={() => onModalOpen(null)} className="bg-gray-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-600 transition-colors duration-300">
            No
          </button>
          <button onClick={() => handleConfirmDelete(appointment)} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
            Yes
          </button>
        </div>
      </div>
    );
  };

  const handleConfirmDelete = async (appointment) => {
    if (!appointment) {
      return; 
    }

    console.log('Deleting appointment:', appointment._id);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/appointments/${appointment._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(appt => appt._id !== appointment._id)
        );
        onAppointmentsUpdate({
          show: true,
          title: 'Success',
          message: 'Appointment deleted successfully.',
          type: 'success'
        });
      } else {
        const data = await response.json();
        console.error(`Failed to delete appointment: ${data.message}`);
        onAppointmentsUpdate({
          show: true,
          title: 'Error',
          message: `Failed to delete appointment: ${data.message}`,
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Error deleting appointment:', error);
      onAppointmentsUpdate({
        show: true,
        title: 'Error',
        message: `Error deleting appointment: ${error.message}`,
        type: 'error'
      });
    }
    onModalOpen(null);
    setSelectedAppointment(null);
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    onModalOpen(
      <BookingUpdateForm
        appointment={appointment}
        onClose={() => onModalOpen(null)}
        onUpdate={(updatedAppointment) => {
          setAppointments((prevAppointments) =>
            prevAppointments.map(appt => appt._id === updatedAppointment._id ? updatedAppointment : appt)
          );
          onAppointmentsUpdate({
            show: true,
            title: 'Success',
            message: 'Appointment updated successfully.',
            type: 'success'
          });
        }}
      />
    );
  };

  return (
    <div className="w-full h-full">
      <div className="h-full overflow-y-auto bg-gray-100 rounded-lg p-4 shadow-lg">
        {appointments.length === 0 ? (
          <div className="flex items-center justify-center bg-white p-6 mb-4 rounded-lg shadow-lg">
            <p className="text-gray-600">No upcoming appointments.</p>
          </div>
        ) : (
          appointments.map(appointment => (
            <div key={appointment._id} className="flex items-center justify-between bg-white p-6 mb-4 rounded-lg shadow-lg w-full" >
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
    </div>
  );
};

export default Appointments;
