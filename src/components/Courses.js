import React, { useState, useEffect } from "react";
import { getData, saveData } from "../utils/storage";
import "./Courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setCourses(getData("courses"));
  }, []);

  const handleSave = () => {
    if (!name.trim()) return alert("Course name required!");
    let updated = [...courses];
    if (editIndex !== null) {
      updated[editIndex] = name;
      setEditIndex(null);
    } else {
      updated.push(name);
    }
    setCourses(updated);
    saveData("courses", updated);
    setName("");
  };

  const handleDelete = (i) => {
    let updated = courses.filter((_, idx) => idx !== i);
    setCourses(updated);
    saveData("courses", updated);
  };

  return (
    <div className="courses-container">
      <h2>📚 Manage Courses</h2>

      <div className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter course name"
        />
        <button className="btn save" onClick={handleSave}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="course-list">
        {courses.map((c, i) => (
          <li key={i} className="course-item">
            <span>{c}</span>
            <div className="actions">
              <button className="btn edit" onClick={() => { setEditIndex(i); setName(c); }}>
                Edit
              </button>
              <button className="btn delete" onClick={() => handleDelete(i)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
