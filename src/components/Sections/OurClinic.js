import React from 'react';
import ClinicFeatureCard from './ClinicFeatureCard';

import digitalXraysImage from '../../assets/images/digitalXrayImg.jpg';
import cadCamImage from '../../assets/images/cadCamImg.jpeg';
import laserDentistryImage from '../../assets/images/laserDentistryImg.jpg';
import sedationDentistryImage from '../../assets/images/sedationImg.jpeg';
import intraoralScannersImage from '../../assets/images/intraOralScannerImg.jpg';
import printing3DImage from '../../assets/images/3dPrintingImg.jpg';
import ultrasonicScalersImage from '../../assets/images/ultrasonicScalerImg.jpg';
import telehealthImage from '../../assets/images/teleConsultationImg.jpg';
import coneBeamCtImage from '../../assets/images/coneBeamImg.jpg';

const features = [
  {
    image: digitalXraysImage,
    title: 'Digital X-rays',
    description: 'High-resolution digital X-rays, 3D cone beam computed tomography (CBCT), and intraoral cameras for precise diagnosis and treatment planning.',
  },
  {
    image: cadCamImage,
    title: 'CAD/CAM Technology',
    description: 'Computer-Aided Design and Computer-Aided Manufacturing technology for creating custom dental restorations like crowns, veneers, and bridges on-site.',
  },
  {
    image: laserDentistryImage,
    title: 'Laser Dentistry',
    description: 'Dental lasers for procedures like gum reshaping, cavity detection, teeth whitening, and removal of decayed tissue with minimal discomfort.',
  },
  {
    image: sedationDentistryImage,
    title: 'Sedation Dentistry',
    description: 'Various sedation options, including nitrous oxide (laughing gas), oral sedatives, and IV sedation to help patients relax during procedures.',
  },
  {
    image: intraoralScannersImage,
    title: 'Intraoral Scanners',
    description: 'Devices that create digital impressions of teeth and gums, eliminating the need for traditional molds.',
  },
  {
    image: printing3DImage,
    title: '3D Printing',
    description: 'Used for creating precise dental models, surgical guides, and even custom dental appliances like aligners and retainers.',
  },
  {
    image: ultrasonicScalersImage,
    title: 'Ultrasonic Scalers',
    description: 'Tools that use ultrasonic waves to remove plaque and tartar buildup from teeth more effectively than traditional methods.',
  },
  {
    image: telehealthImage,
    title: 'Telehealth Capabilities',
    description: 'Options for virtual consultations and follow-up appointments, enhancing accessibility and convenience for patients.',
  },
  {
    image: coneBeamCtImage,
    title: 'Cone Beam CT Scanners',
    description: 'Advanced imaging technology that provides detailed 3D images of the teeth, jaw, and surrounding structures for accurate diagnosis and treatment planning.',
  },
];

const OurClinic = () => {
  return (
    <section id="clinic" className="relative w-full min-h-screen snap-start bg-white text-black flex items-center justify-center py-10">
      <div className="max-w-6xl mx-auto text-center p-6">
        <h2 className="text-3xl font-bold mb-6">Our Clinic</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ClinicFeatureCard key={index} image={feature.image} title={feature.title} description={feature.description} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClinic;
