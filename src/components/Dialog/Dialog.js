import React from 'react';
import Lottie from 'react-lottie';
import successAnimation from '../../assets/animations/check.json';
import errorAnimation from '../../assets/animations/cross.json';

const animations = {
  success: successAnimation,
  error: errorAnimation,
};

const Dialog = ({ show, title, message, type, onClose, onCloseAdditional }) => {
  if (!show) return null;

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animations[type],
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleClose = () => {
    onClose();
    if (onCloseAdditional) {
      onCloseAdditional();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center mx-4">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <Lottie options={defaultOptions} height={100} width={100} />
        <p className="text-gray-600">{message}</p>
        <button
          onClick={handleClose}
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Dialog;
