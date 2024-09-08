// src/components/Partners.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // For the navbar links
import { supabase } from '../supabaseClient'; // Import your Supabase client
import './Partners.css'; // Keep your styling
import './Dashboard.css'; // Ensure your dashboard/sidebar styling is applied
import './navbar.css'; // Ensure your navbar styling is applied

const Partners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error } = await supabase.from('partners').select('*');
        
        if (error) {
          throw error; // Throw error if exists
        }

        if (data) {
          setPartners(data); // Set partners data
        }
      } catch (error) {
        setError('Error fetching partners: ' + error.message);
      } finally {
        setLoading(false); // Set loading to false once the fetch is done
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return <div>Loading partners...</div>;
  }

  if (error) {
    return <div>{error}</div>; // Display any error that occurs
  }

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

      {/* Main content for Partners */}
      <div className="main-content">
        <h2>Partners</h2>
        <table className="partners-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Company Name</th>
              <th>Number of Interviews</th>
              <th>Number of Offers</th>
              <th>Number of Events</th>
            </tr>
          </thead>
          <tbody>
            {partners.length > 0 ? (
              partners.map((partner) => (
                <tr key={partner.id_company}>
                  <td>{partner.id_company}</td>
                  <td>{partner.name_of_company}</td>
                  <td>{partner.number_of_interviews}</td>
                  <td>{partner.number_of_offers}</td>
                  <td>{partner.number_of_events}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No partners available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Partners;
