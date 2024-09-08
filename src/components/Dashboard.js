// src/components/Dashboard.js
import React from 'react';
import { NavLink } from 'react-router-dom'; // For the navbar links
import './Dashboard.css'; // Ensure your dashboard/sidebar styling is applied
import './navbar.css'; // Ensure your navbar styling is applied

const Dashboard = () => {
  const data = {
    jobOffers: { one: 84, two: 20, three: 7 },
    cohort: { total: 555, gradSchools: 114, gapYear: 8 },
    students: { known: 93, seeking: 91, stillSeeking: 7 },
    others: { interviewsPassed: 2000, partnersNumber: 51, entrepreneurs: 30 },
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <div className="sidebar">
        <h2>E+E Master Tracker</h2>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tracking-table" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Tracking Table
            </NavLink>
          </li>
          <li>
            <NavLink to="/events" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/partners" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Partners
            </NavLink>
          </li>
          <li>
            <NavLink to="/job-posting" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Job Posting
            </NavLink>
          </li>
          <li>
            <NavLink to="/matching" className={({ isActive }) => (isActive ? 'nav-link active-link' : 'nav-link')}>
              Matching
            </NavLink>
          </li>
        </ul>
      </div>

      {/* Main content of the dashboard */}
      <div className="main-content">
        <h2>Hello Deborah 👋,</h2>
        <div className="grid-container">
          <div className="grid-row">
            <div className="card">
              <h3>At least 1 job offer</h3>
              <p>{data.jobOffers.one}%</p>
            </div>
            <div className="card">
              <h3>At least 2 job offer</h3>
              <p>{data.jobOffers.two}%</p>
            </div>
            <div className="card">
              <h3>At least 3 job offer</h3>
              <p>{data.jobOffers.three}%</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="card">
              <h3>Total Cohort 2024</h3>
              <p>{data.cohort.total}</p>
            </div>
            <div className="card">
              <h3>Graduate Schools</h3>
              <p>{data.cohort.gradSchools}</p>
            </div>
            <div className="card">
              <h3>Gap Year</h3>
              <p>{data.cohort.gapYear}</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="card">
              <h3>Known Students</h3>
              <p>{data.students.known}%</p>
            </div>
            <div className="card">
              <h3>Seeking Students</h3>
              <p>{data.students.seeking}%</p>
            </div>
            <div className="card">
              <h3>Still Seeking</h3>
              <p>{data.students.stillSeeking}%</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="card">
              <h3>Interviews Passed</h3>
              <p>{data.others.interviewsPassed}</p>
            </div>
            <div className="card">
              <h3>Partners Number</h3>
              <p>{data.others.partnersNumber}</p>
            </div>
            <div className="card">
              <h3>AUI Entrepreneurs</h3>
              <p>{data.others.entrepreneurs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
