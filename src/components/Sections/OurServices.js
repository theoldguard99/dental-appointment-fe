import React, { useState, useEffect } from 'react';
import ServicesFeatureCard from './ServicesFeatureCard';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import backgroundImage from '../../assets/images/cardbg.jpg';

const services = [
  {
    title: 'Preventive Care',
    services: [
      'Routine check-ups and cleanings',
      'Oral cancer screenings',
      'Fluoride treatments and dental sealants',
      'Patient education and oral hygiene instructions',
    ],
  },
  {
    title: 'Diagnostic Services',
    services: [
      'Digital X-rays',
      'Intraoral cameras',
      '3D imaging (CBCT scans)',
      'Comprehensive oral examinations',
    ],
  },
  {
    title: 'Restorative Dentistry',
    services: [
      'Fillings (composite and amalgam)',
      'Crowns and bridges',
      'Root canal therapy',
      'Dental implants',
      'Dentures and partial dentures',
      'Inlays and onlays',
    ],
  },
  {
    title: 'Cosmetic Dentistry',
    services: [
      'Teeth whitening',
      'Veneers',
      'Bonding',
      'Invisalign and other orthodontic treatments',
      'Smile makeovers',
    ],
  },
  {
    title: 'Periodontal Care',
    services: [
      'Deep cleanings (scaling and root planing)',
      'Periodontal surgery',
      'Maintenance therapy for gum disease',
    ],
  },
  {
    title: 'Oral Surgery',
    services: [
      'Tooth extractions (including wisdom teeth)',
      'Bone grafting',
      'Sinus lifts',
      'Corrective jaw surgery',
    ],
  },
  {
    title: 'Orthodontics',
    services: [
      'Traditional braces',
      'Clear aligners (e.g., Invisalign)',
      'Retainers',
      'Space maintainers',
    ],
  },
  {
    title: 'Pediatric Dentistry',
    services: [
      'Child-specific preventive care',
      'Early orthodontic evaluations',
      'Habit counseling (e.g., thumb sucking)',
      'Pediatric restorations and extractions',
    ],
  },
  {
    title: 'Sedation Dentistry',
    services: [
      'Nitrous oxide (laughing gas)',
      'Oral sedatives',
      'IV sedation',
      'General anesthesia for complex procedures',
    ],
  },
  {
    title: 'Emergency Dental Care',
    services: [
      'Treatment for dental trauma',
      'Pain relief for toothaches',
      'Emergency extractions',
      'Temporary restorations',
    ],
  },
  {
    title: 'Specialized Treatments',
    services: [
      'TMJ/TMD treatment',
      'Sleep apnea appliances',
      'Sports mouthguards',
      'Treatment for bruxism (teeth grinding)',
    ],
  },
  {
    title: 'Holistic Dentistry',
    services: [
      'Use of biocompatible materials',
      'Mercury-free fillings',
      'Focus on overall health and wellness',
    ],
  },
];

const OurServices = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const toggleOpen = (index) => {
    if (openIndex === index) {
      closeExpandedCard();
    } else {
      if (openIndex !== null) {
        setIsClosing(true);
        setTimeout(() => {
          setOpenIndex(index);
          setIsClosing(false);
          setIsOpening(true);
        }, 500);
      } else {
        setOpenIndex(index);
        setIsOpening(true);
      }
    }
  };

  const closeExpandedCard = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOpenIndex(null);
      setIsClosing(false);
    }, 500);
  };

  useEffect(() => {
    if (openIndex !== null) {
      setIsOpening(false);
    }
  }, [openIndex]);

  return (
    <section id="services" className="relative w-full min-h-screen snap-start bg-gray-100 text-black flex flex-col items-center justify-center py-10">
      <div className="max-w-6xl mx-auto text-center p-6">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        {openIndex !== null && (
          <div
            className={`relative w-full p-6 mt-6 mb-6 shadow-lg rounded-lg transition-all duration-500 ease-in-out transform ${
              isClosing ? 'opacity-0 translate-y-4' : isOpening ? 'opacity-100 translate-y-0' : ''
            }`}
            style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            <div className="absolute inset-0 bg-white opacity-75 rounded-lg"></div>
            <button onClick={closeExpandedCard} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative z-10 text-black">
              <h3 className="text-2xl font-bold mb-4">{services[openIndex].title}</h3>
              <div className="text-gray-700 flex flex-col items-center font-semibold">
                {services[openIndex].services.map((service, index) => (
                  <div key={index} className="mt-1 flex items-center">
                    <IoIosArrowDroprightCircle className="mr-2 text-blue-500" />
                    {service}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServicesFeatureCard
              key={index}
              title={service.title}
              services={service.services}
              toggleOpen={() => toggleOpen(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
