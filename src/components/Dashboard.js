import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Dashboard.css';
import './navbar.css';

const Dashboard = () => {
  const [modalData, setModalData] = useState(null);

  const data = {
    jobOffers: { one: 84, two: 20, three: 7 },
    cohort: { total: 555, gradSchools: 114, gapYear: 8 },
    students: { known: 93, seeking: 91, stillSeeking: 7 },
    others: { interviewsPassed: 2000, partnersNumber: 51, entrepreneurs: 30 },
  };

  const cardDetails = {
    'At least 1 job offer': 'Calculated based on the percentage of students receiving at least one job offer.',
    'At least 2 job offer': 'Percentage of students receiving at least two job offers, collected from surveys.',
    'At least 3 job offer': 'Percentage of students receiving at least three job offers from different sources.',
    'Total Cohort 2024': 'Total number of students in the cohort, including transfers.',
    'Graduate Schools': 'Students enrolled in graduate schools after graduation.',
    'Gap Year': 'Students taking a gap year, either for travel, work, or personal projects.',
    'Known Students': 'Percentage of students whose post-graduation plans are known.',
    'Seeking Students': 'Percentage of students actively seeking employment after graduation.',
    'Still Seeking': 'Percentage of students still seeking employment or opportunities.',
    'Interviews Passed': 'Number of interviews successfully passed by students.',
    'Partners Number': 'Number of partnered companies working with the cohort.',
    'AUI Entrepreneurs': 'Students who have launched or plan to launch entrepreneurial ventures.',
  };

  const handleCardClick = (title) => {
    setModalData({ title, description: cardDetails[title] });
  };

  const closeModal = () => {
    setModalData(null);
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
        </ul>
      </div>

      {/* Main content of the dashboard */}
      <div className="main-content">
        <h2>Hello Deborah 👋,</h2>
        <div className="grid-container">
          <div className="grid-row">
            <div className="card" onClick={() => handleCardClick('At least 1 job offer')}>
              <h3>At least 1 job offer</h3>
              <p>{data.jobOffers.one}%</p>
            </div>
            <div className="card" onClick={() => handleCardClick('At least 2 job offer')}>
              <h3>At least 2 job offer</h3>
              <p>{data.jobOffers.two}%</p>
            </div>
            <div className="card" onClick={() => handleCardClick('At least 3 job offer')}>
              <h3>At least 3 job offer</h3>
              <p>{data.jobOffers.three}%</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="card" onClick={() => handleCardClick('Total Cohort 2024')}>
              <h3>Total Cohort 2024</h3>
              <p>{data.cohort.total}</p>
            </div>
            <div className="card" onClick={() => handleCardClick('Graduate Schools')}>
              <h3>Graduate Schools</h3>
              <p>{data.cohort.gradSchools}</p>
            </div>
            <div className="card" onClick={() => handleCardClick('Gap Year')}>
              <h3>Gap Year</h3>
              <p>{data.cohort.gapYear}</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="card" onClick={() => handleCardClick('Known Students')}>
              <h3>Known Students</h3>
              <p>{data.students.known}%</p>
            </div>
            <div className="card" onClick={() => handleCardClick('Seeking Students')}>
              <h3>Seeking Students</h3>
              <p>{data.students.seeking}%</p>
            </div>
            <div className="card" onClick={() => handleCardClick('Still Seeking')}>
              <h3>Still Seeking</h3>
              <p>{data.students.stillSeeking}%</p>
            </div>
          </div>
          <div className="grid-row">
            <div className="card" onClick={() => handleCardClick('Interviews Passed')}>
              <h3>Interviews Passed</h3>
              <p>{data.others.interviewsPassed}</p>
            </div>
            <div className="card" onClick={() => handleCardClick('Partners Number')}>
              <h3>Partners Number</h3>
              <p>{data.others.partnersNumber}</p>
            </div>
            <div className="card" onClick={() => handleCardClick('AUI Entrepreneurs')}>
              <h3>AUI Entrepreneurs</h3>
              <p>{data.others.entrepreneurs}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for card details */}
      {modalData && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{modalData.title}</h3>
            <p>{modalData.description}</p>
            <button className="close-modal" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
