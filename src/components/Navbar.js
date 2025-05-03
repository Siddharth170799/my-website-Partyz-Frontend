import React from 'react';
import "../styles/Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="navMainName">Partyz</span>
      <button className="navItem">
        <span className="navText">Hall Bookings</span>
      </button>
      {/* <button className="navItem">
        <span className="navText">
          <span>Catering</span>
          <span>Services</span>
        </span>
      </button>
      <button className="navItem">
        <span className="navText">Event Planners</span>
      </button>
      <button className="navItem">
        <span className="navText">Decorations</span>
      </button> */}
    </div>
  );
};

export default Navbar;
