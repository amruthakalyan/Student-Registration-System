import React, { useState, useEffect } from "react";
import { getData, saveData } from "../utils/storage";
import "./CourseTypes.css";

export default function CourseTypes() {
  const [types, setTypes] = useState([]);
  const [name, setName] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setTypes(getData("courseTypes"));
  }, []);

  const handleSave = () => {
    if (!name.trim()) return alert("Name required!");
    let updated = [...types];
    if (editIndex !== null) {
      updated[editIndex] = name;
      setEditIndex(null);
    } else {
      updated.push(name);
    }
    setTypes(updated);
    saveData("courseTypes", updated);
    setName("");
  };

  const handleDelete = (i) => {
    let updated = types.filter((_, idx) => idx !== i);
    setTypes(updated);
    saveData("courseTypes", updated);
  };

  return (
    <div className="course-types-container">
      <h2>📘 Manage Course Types</h2>

      <div className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter course type"
        />
        <button className="btn save" onClick={handleSave}>
          {editIndex !== null ? "Update" : "Add"}
        </button>
      </div>

      <ul className="type-list">
        {types.map((t, i) => (
          <li key={i} className="type-item">
            <span>{t}</span>
            <div className="actions">
              <button
                className="btn edit"
                onClick={() => {
                  setEditIndex(i);
                  setName(t);
                }}
              >
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
