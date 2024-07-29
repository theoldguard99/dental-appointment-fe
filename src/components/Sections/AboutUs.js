import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/animations/animation-asset-2..json';

const AboutUs = () => {
  return (
    <section id="about" className="relative w-full min-h-screen snap-start bg-white text-black flex flex-col items-center justify-center py-10">
      <div className="max-w-6xl mx-auto text-center p-6">
        <h2 className="text-3xl font-bold mb-6">About Us</h2>
        <p className="text-lg mb-6">
          Since our founding in 1984, our clinic has been dedicated to providing top-notch dental care to the community.
          Over the decades, we have grown and adapted to the latest advancements in dental technology while maintaining
          our commitment to patient care and comfort.
        </p>
        <p className="text-lg mb-6">
          Our story began with Dr. Juan Dela Cruz, who established the clinic with a vision to offer comprehensive dental
          services in a friendly and welcoming environment. Through the years, we have expanded our team and facilities
          to serve a larger patient base, while continuing to uphold the values of excellence and compassion.
        </p>
        <p className="text-lg mb-6">
          Today, our clinic is equipped with state-of-the-art technology and a highly skilled team of professionals
          dedicated to your oral health. We are proud to be a part of the community and look forward to serving you and
          your family for many years to come.
        </p>
      </div>
      <div className="w-full flex justify-center p-6">
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-start w-full max-w-4xl relative">
          <div className="w-1/2 pr-4 mb-6 md:mb-0">
            <h3 className="text-2xl font-bold mb-4">Our Location</h3>
            <div className="w-full h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.221569944087!2d120.9819312!3d14.5925488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c91b2a4b5e9b%3A0x4b14aab6e02228d6!2sDentist%20Clinic!5e0!3m2!1sen!2sph!4v1628232379026!5m2!1sen!2sph&markers=14.5925488,120.9819312"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
          <div className="border-l-2 border-gray-300 mx-4"></div>
          <div className="w-1/2 pl-4 flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <h3 className="text-2xl font-bold mr-2">Give us a feedback!</h3>
              <div className="w-10 h-10">
                <Lottie animationData={animationData} loop={true} />
              </div>
            </div>
            <form className="flex flex-col space-y-4 h-full">
              <div>
                <label className="block text-lg font-medium mb-2" htmlFor="title">
                  Title Message
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex-grow">
                <label className="block text-lg font-medium mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="6"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{ resize: 'none' }}
                ></textarea>
              </div>
              <button
                type="submit"
                className="self-end bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Send Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
