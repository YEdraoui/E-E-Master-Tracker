import React, { useState } from 'react';
import './Dashboard.css';
import './navbar.css'; // Import shared navbar CSS
import TrackingTable from './TrackingTable';

const Dashboard = () => {
  const data = {
    jobOffers: { one: 84, two: 20, three: 7 },
    cohort: { total: 555, gradSchools: 114, gapYear: 8 },
    students: { known: 93, seeking: 91, stillSeeking: 7 },
    others: { interviewsPassed: 2000, partnersNumber: 51, entrepreneurs: 30 },
  };

  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>E+E Master Tracker</h2>
        <ul>
          <li>
            <button
              onClick={() => setActiveSection('dashboard')}
              className={activeSection === 'dashboard' ? 'active' : ''}
            >
              Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('tracking-table')}
              className={activeSection === 'tracking-table' ? 'active' : ''}
            >
              Tracking Table
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('events')}
              className={activeSection === 'events' ? 'active' : ''}
            >
              Events
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('partners')}
              className={activeSection === 'partners' ? 'active' : ''}
            >
              Partners
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('job-posting')}
              className={activeSection === 'job-posting' ? 'active' : ''}
            >
              Job Posting
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveSection('matching')}
              className={activeSection === 'matching' ? 'active' : ''}
            >
              Matching
            </button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        {activeSection === 'dashboard' && (
          <>
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
          </>
        )}
        {activeSection === 'tracking-table' && <TrackingTable />}
      </div>
    </div>
  );
};

export default Dashboard;
