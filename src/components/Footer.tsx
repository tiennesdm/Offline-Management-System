// src/components/Footer.tsx
import React from 'react';
import NetworkOnlineStatus from './NetworkOnlineStatus';

const Footer : React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4">
      <p>&copy; 2024 My Website</p>
      <p>Designed By Shubham Mehta (+91-9053561778, +965-55350833)</p>
      <NetworkOnlineStatus />
    </footer>
  );
};

export default Footer;
