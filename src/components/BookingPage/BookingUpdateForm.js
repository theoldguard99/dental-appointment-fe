import React, { useState, useContext, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../../context/AuthContext';
import Dialog from '../Dialog/Dialog';

const dentists = [
  'Dr. Maria Santos',
  'Dr. Jose Garcia',
  'Dr. Ana Reyes',
  'Dr. Carlos Dela Cruz',
  'Dr. Luz Martinez'
];

const BookingUpdateForm = ({ appointment, onClose, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [appointmentData, setAppointmentData] = useState({
    service: appointment.service,
    dentist: appointment.dentist,
    date: new Date(appointment.date),
    time: new Date(appointment.time),
    childName: appointment.childName || '',
  });
  const [dialog, setDialog] = useState({ show: false, title: '', message: '', type: '' });

  useEffect(() => {
    if (appointment.service === 'Pediatric Dentistry') {
      setAppointmentData((prevData) => ({ ...prevData, childName: appointment.childName }));
    }
  }, [appointment]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setAppointmentData((prevData) => ({ ...prevData, date }));
  };

  const handleTimeChange = (time) => {
    setAppointmentData((prevData) => ({ ...prevData, time }));
  };

  const handleServiceChange = (e) => {
    setAppointmentData((prevData) => ({ ...prevData, service: e.target.value }));
  };

  const handleDentistChange = (e) => {
    setAppointmentData((prevData) => ({ ...prevData, dentist: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAppointment = {
      service: appointmentData.service,
      dentist: appointmentData.dentist,
      date: appointmentData.date,
      time: appointmentData.time,
      childName: appointmentData.service === 'Pediatric Dentistry' ? appointmentData.childName : undefined,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/appointments/${appointment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedAppointment),
      });

      if (response.ok) {
        const updatedAppt = await response.json();
        setDialog({
          show: true,
          title: 'Success',
          message: 'Appointment updated successfully',
          type: 'success',
          onCloseAdditional: onClose
        });
        onUpdate(updatedAppt);
      } else {
        const data = await response.json();
        setDialog({
          show: true,
          title: 'Error',
          message: `${data.message}`,
          type: 'error',
          onCloseAdditional: onClose
        });
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      setDialog({
        show: true,
        title: 'Error',
        message: `Error updating appointment: ${error.message}`,
        type: 'error',
        onCloseAdditional: onClose 
      });
    }
  };

  const closeDialog = () => {
    setDialog({ show: false, title: '', message: '', type: '' });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="service">Service</label>
          <select
            id="service"
            name="service"
            className="w-full border border-gray-300 rounded-md p-2"
            value={appointmentData.service}
            onChange={handleServiceChange}
            required
          >
            <option value="">Select a Service</option>
            <option value="Pediatric Dentistry">Pediatric Dentistry</option>
            <option value="Diagnostic Services">Diagnostic Services</option>
            <option value="Restorative Dentistry">Restorative Dentistry</option>
            <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
            <option value="Periodontal Care">Periodontal Care</option>
            <option value="Oral Surgery">Oral Surgery</option>
            <option value="Orthodontics">Orthodontics</option>
            <option value="Sedation Dentistry">Sedation Dentistry</option>
            <option value="Emergency Dental Care">Emergency Dental Care</option>
            <option value="Specialized Treatments">Specialized Treatments</option>
            <option value="Holistic Dentistry">Holistic Dentistry</option>
          </select>
        </div>
        {appointmentData.service === 'Pediatric Dentistry' && (
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="childName">Child's Name</label>
            <input
              type="text"
              id="childName"
              name="childName"
              className="w-full border border-gray-300 rounded-md p-2"
              value={appointmentData.childName}
              onChange={handleFormChange}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="dentist">Dentist</label>
          <select
            id="dentist"
            name="dentist"
            className="w-full border border-gray-300 rounded-md p-2"
            value={appointmentData.dentist}
            onChange={handleDentistChange}
            required
          >
            <option value="">Select a Dentist</option>
            {dentists.map(dentist => (
              <option key={dentist} value={dentist}>{dentist}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="date">Desired Date</label>
          <div className="w-full">
            <DatePicker
              id="date"
              selected={appointmentData.date}
              onChange={handleDateChange}
              className="w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium mb-2" htmlFor="time">Desired Time</label>
          <div className="w-full">
            <DatePicker
              id="time"
              selected={appointmentData.time}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={1}
              timeCaption="Time"
              dateFormat="h:mm aa"
              className="w-full border border-gray-300 rounded-md p-2"
              required
              filterTime={(time) => {
                const hours = time.getHours();
                return hours >= 9 && hours < 18;
              }}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onClose} className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300">
            Cancel
          </button>
          <button type="submit" className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300">
            Submit
          </button>
        </div>
      </form>
      <Dialog
        show={dialog.show}
        title={dialog.title}
        message={dialog.message}
        type={dialog.type}
        onClose={closeDialog}
        onCloseAdditional={onClose}
      />
    </div>
  );
};

export default BookingUpdateForm;
