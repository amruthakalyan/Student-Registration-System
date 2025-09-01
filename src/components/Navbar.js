import React, { useState } from "react";
import "../App.css"; 

const Navbar = ({ setPage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => setPage("home")}>
        🎓 Student Registration
      </div>

      {/* Hamburger button */}
      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Navigation links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>

        <li onClick={() => { setPage("courseTypes"); setMenuOpen(false); }}>Course Types</li>
        <li onClick={() => { setPage("courses"); setMenuOpen(false); }}>Courses</li>
        <li onClick={() => { setPage("offerings"); setMenuOpen(false); }}>Course Offerings</li>
        <li onClick={() => { setPage("registrations"); setMenuOpen(false); }}>Registrations</li>
      </ul>
    </nav>
  );
};

export default Navbar;
