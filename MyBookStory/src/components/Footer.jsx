import React from 'react';
import { FaCopyright } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-white flex justify-center items-center gap-2 py-5">
      <FaCopyright className="text-gray-400 text-2xl" />
      <p className="text-lg text-center">2025, MyCodeStory, All Rights Reserved</p>
    </footer>
  );
};

export default Footer;
