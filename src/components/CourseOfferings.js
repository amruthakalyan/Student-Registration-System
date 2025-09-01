import React, { useState, useEffect } from "react";
import { getData, saveData } from "../utils/storage";
import "./CourseOfferings.css";

export default function CourseOfferings() {
  const [offerings, setOfferings] = useState([]);
  const [courseTypes, setCourseTypes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    setOfferings(getData("offerings"));
    setCourseTypes(getData("courseTypes"));
    setCourses(getData("courses"));
  }, []);

  const handleAdd = () => {
    if (!selectedType || !selectedCourse)
      return alert("Select both type and course!");

    const newOffering = `${selectedType} - ${selectedCourse}`;
    const updated = [...offerings, newOffering];
    setOfferings(updated);
    saveData("offerings", updated);

    // reset selections
    setSelectedType("");
    setSelectedCourse("");
  };

  const handleDelete = (i) => {
    const updated = offerings.filter((_, idx) => idx !== i);
    setOfferings(updated);
    saveData("offerings", updated);
  };

  return (
    <div className="offerings-container">
      <h2>📖 Manage Course Offerings</h2>

      <div className="form">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">Select Type</option>
          {courseTypes.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {courses.map((c, i) => (
            <option key={i}>{c}</option>
          ))}
        </select>

        <button className="btn save" onClick={handleAdd}>
          Add Offering
        </button>
      </div>

      <ul className="offering-list">
        {offerings.map((o, i) => (
          <li key={i} className="offering-item">
            <span>{o}</span>
            <button className="btn delete" onClick={() => handleDelete(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
