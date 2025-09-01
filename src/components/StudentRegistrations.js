import React, { useState, useEffect } from "react";
import { getData, saveData } from "../utils/storage";
import "./StudentRegistrations.css";

export default function StudentRegistrations() {
  const [registrations, setRegistrations] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [selectedOffering, setSelectedOffering] = useState("");
  const [studentName, setStudentName] = useState("");
  const [filterType, setFilterType] = useState("");
  const [courseTypes, setCourseTypes] = useState([]);

  useEffect(() => {
    setRegistrations(getData("registrations"));
    setOfferings(getData("offerings"));
    setCourseTypes(getData("courseTypes"));
  }, []);

  const handleRegister = () => {
    if (!studentName.trim() || !selectedOffering) return alert("Fill details!");
    const updated = [
      ...registrations,
      { student: studentName, offering: selectedOffering },
    ];
    setRegistrations(updated);
    saveData("registrations", updated);
    setStudentName("");
    setSelectedOffering("");
  };

  const filteredOfferings = filterType
    ? offerings.filter((o) => o.startsWith(filterType))
    : offerings;

  return (
    <div className="registrations-container">
      <h2>📝 Student Registrations</h2>

      <div className="form">
        <input
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Student Name"
        />
        <select
          value={selectedOffering}
          onChange={(e) => setSelectedOffering(e.target.value)}
        >
          <option value="">Select Offering</option>
          {offerings.map((o, i) => (
            <option key={i}>{o}</option>
          ))}
        </select>
        <button className="btn save" onClick={handleRegister}>
          Register
        </button>
      </div>

      <h3>Filter Offerings</h3>
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="filter-select"
      >
        <option value="">All</option>
        {courseTypes.map((t, i) => (
          <option key={i}>{t}</option>
        ))}
      </select>

      <ul className="offering-list">
        {filteredOfferings.map((o, i) => (
          <li key={i} className="offering-item">
            <strong>{o}</strong>
            <span>
              Students:{" "}
              {registrations
                .filter((r) => r.offering === o)
                .map((r) => r.student)
                .join(", ") || "None"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
