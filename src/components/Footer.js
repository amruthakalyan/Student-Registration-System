import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
        <p>Designed & Developed by Kalyan.</p>
      <p>© {new Date().getFullYear()} 🎓 Student Registration System | All Rights Reserved</p>
    </footer>
  );
}
