import React from 'react';

const ClinicFeatureCard = ({ image, title, description }) => {
  return (
    <div className="relative bg-cover bg-center bg-no-repeat h-64 w-64 rounded-lg overflow-hidden m-4 shadow-bottom-right group" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4 transition-all duration-300 ease-in-out transform group-hover:h-full h-16">
        <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{description}</p>
      </div>
    </div>
  );
};

export default ClinicFeatureCard;
