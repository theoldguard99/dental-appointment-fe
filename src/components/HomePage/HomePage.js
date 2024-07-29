import React from 'react';
import CarouselBackground from './CarouselBackground';
import ScrollToTop from './ScrollToTop';
import OurClinic from '../Sections/OurClinic';
import OurServices from '../Sections/OurServices';
import AboutUs from '../Sections/AboutUs';
import AnimatedComponent from '../AnimatedComponent/AnimatedComponent';

import clinicImage from '../../assets/images/clinicImage.jpg';
import servicesImage from '../../assets/images/servicesImage.jpg';
import aboutUsImage from '../../assets/images/aboutUsImage.jpg';

const scrollToSection = (id) => {
  document.getElementById(id).scrollIntoView({
    behavior: 'smooth',
  });
};

const HomePage = () => {
  const homepageSections = ['clinic', 'services', 'about'];

  return (
    <div className="w-full h-full overflow-y-auto">
      <ScrollToTop />
      <AnimatedComponent sections={homepageSections} />
      <section className="relative w-full h-screen snap-start">
        <CarouselBackground />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <div className="text-center mb-20">
            <h1 className="text-3xl font-bold">Welcome to Our Dental Office</h1>
            <p className="mt-4">We offer a variety of dental services to keep your smile healthy and bright.</p>
            <button className="bg-blue-500 text-white p-2 rounded mt-4">Schedule an Appointment</button>
          </div>
          <div className="flex space-x-10 mb-10">
            <div onClick={() => scrollToSection('clinic')} className="flex flex-col items-center cursor-pointer">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <img src={clinicImage} alt="Clinic" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">Our Clinic</h2>
                <p className="mt-2 text-gray-300">Learn more about our state-of-the-art clinic and facilities.</p>
              </div>
            </div>
            <div onClick={() => scrollToSection('services')} className="flex flex-col items-center cursor-pointer">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <img src={servicesImage} alt="Services" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">Our Services</h2>
                <p className="mt-2 text-gray-300">Discover the wide range of dental services we offer.</p>
              </div>
            </div>
            <div onClick={() => scrollToSection('about')} className="flex flex-col items-center cursor-pointer">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
                <img src={aboutUsImage} alt="About Us" className="w-full h-full object-cover" />
              </div>
              <div className="text-center mt-4">
                <h2 className="text-xl font-semibold">About Us</h2>
                <p className="mt-2 text-gray-300">Get to know our experienced and friendly dental team.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="clinic" className="relative w-full h-screen snap-start">
        <OurClinic />
      </section>
      <section id="services" className="relative w-full h-screen snap-start">
        <OurServices />
      </section>
      <section id="about" className="relative w-full h-screen snap-start">
        <AboutUs />
      </section>
    </div>
  );
};

export default HomePage;
