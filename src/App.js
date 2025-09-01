import React, { useState } from "react";
import CourseTypes from "./components/CourseTypes";
import Courses from "./components/Courses";
import CourseOfferings from "./components/CourseOfferings";
import StudentRegistrations from "./components/StudentRegistrations";
import Navbar from "./components/Navbar";
import "./App.css";
import Footer from "./components/Footer";

export default function App() {
  const [activeTab, setActiveTab] = useState("courseTypes");

  return (
    <div className="app-container">
      <Navbar setPage={setActiveTab} />

      <main className="content">
        {activeTab === "courseTypes" && <CourseTypes />}
        {activeTab === "courses" && <Courses />}
        {activeTab === "offerings" && <CourseOfferings />}
        {activeTab === "registrations" && <StudentRegistrations />}
      </main>
      <Footer/>
    </div>
  );
}
