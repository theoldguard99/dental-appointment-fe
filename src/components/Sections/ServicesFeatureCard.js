import React from 'react';

const ServicesFeatureCard = ({ title, services, toggleOpen }) => {
  return (
    <div onClick={toggleOpen} className="relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden m-4 w-64 cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <div className="p-4 bg-blue-500 text-white text-xl font-semibold">
        {title}
      </div>
    </div>
  );
};

export default ServicesFeatureCard;
