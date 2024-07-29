import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/animation-asset-1.json';

const AnimatedComponent = ({ sections = [] }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    const scrollPosition = window.scrollY + window.innerHeight / 2;
    let shouldShow = false;

    sections.forEach((id) => {
      const section = document.getElementById(id);
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          shouldShow = true;
        }
      }
    });

    setIsVisible(shouldShow);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility();
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, [sections]);

  return (
    <div className={`fixed bottom-5 left-5 z-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative flex flex-col items-center">
        <div className="relative mb-2 bg-white p-4 rounded-lg shadow-lg text-center">
          <h3 className="text-lg font-semibold">Ready to make an appointment?</h3>
          <p className="mt-2 text-black">Click Me!</p>
          <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2">
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0L10 10L20 0H0Z" fill="white" style={{ filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.2))' }}/>
            </svg>
          </div>
        </div>
        <Lottie animationData={animationData} loop style={{ height: '150px', width: '150px' }} />
      </div>
    </div>
  );
};

export default AnimatedComponent;
