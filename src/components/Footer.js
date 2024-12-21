import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaEnvelope } from 'react-icons/fa'; // Import FontAwesome icons
import xLogo from '../x-logo.png'; // Import the X logo image

export default function Footer() {
  const handleXLogoClick = () => {
    window.open('https://x.com/GrabEats_inc?t=ll_AvelUdUNRtQMfpyCM6w&s=08', '_blank');
  };

  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          {/* Your logo or brand name */}
        </Link>
        <span className="text-muted" style={{ fontSize: '20px' }}>© 2024 GRAB-EATS, Inc</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="me-3">
          <a href="https://www.instagram.com/grabeats.inc" target="_blank" rel="noopener noreferrer" className="text-muted">
            <FaInstagram size={30} />
          </a>
        </li>
        <li className="me-3">
          <a href="https://www.facebook.com/profile.php?id=61558574575811&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer" className="text-muted">
            <FaFacebook size={30} />
          </a>
        </li>
        <li className="me-3">
          <a href="mailto:grabeats8@gmail.com" className="text-muted">
            <FaEnvelope size={30} />
          </a>
        </li>
        <li className="me-3">
          <img src={xLogo} alt="X Logo" style={{ width: '30px', height: '30px', cursor: 'pointer' }} onClick={handleXLogoClick} /> {/* Use the X logo image */}
        </li>
        <li className="me-3">
          <span className="text-muted" style={{ fontSize: '20px' }}>Contact: +91 94578 95378</span>
        </li>
      </ul>
    </footer>
  );
}
