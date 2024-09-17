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
  const [newPartner, setNewPartner] = useState({
    name_of_company: '',
    number_of_interviews: '',
    number_of_offers: '',
    number_of_events: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

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

  const handleCreatePartner = async () => {
    // Ensure required fields are filled
    if (!newPartner.name_of_company || !newPartner.number_of_interviews || !newPartner.number_of_offers || !newPartner.number_of_events) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      const { data, error } = await supabase.from('partners').insert([
        {
          name_of_company: newPartner.name_of_company,
          number_of_interviews: newPartner.number_of_interviews,
          number_of_offers: newPartner.number_of_offers,
          number_of_events: newPartner.number_of_events,
        }
      ]);
  
      if (error) throw error;
  
      // Ensure data is pushed correctly into the existing array
      if (data && data.length > 0) {
        setPartners((prevPartners) => [...prevPartners, ...data]); // Spread the array of new data
      }
  
      // Clear form and show success message
      setNewPartner({
        name_of_company: '',
        number_of_interviews: '',
        number_of_offers: '',
        number_of_events: '',
      });
      setSuccessMessage('Partner added successfully!');
    } catch (error) {
      setError('Failed to create partner: ' + error.message);
    }
  };

  const closeMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  if (loading) {
    return <div>Loading partners...</div>;
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
        </ul>
      </div>

      {/* Main content for Partners */}
      <div className="main-content">
        <h2>Partners</h2>

        {/* Success or Error Messages */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Partners Table */}
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

        {/* Form to Add New Partner */}
        <div className="partner-form">
          <h3>Add New Partner</h3>
          <div className="form-group">
            <label>Company Name:</label>
            <input
              type="text"
              placeholder="Company Name"
              value={newPartner.name_of_company}
              onChange={(e) => setNewPartner({ ...newPartner, name_of_company: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Number of Interviews:</label>
            <input
              type="number"
              placeholder="Number of Interviews"
              value={newPartner.number_of_interviews}
              onChange={(e) => setNewPartner({ ...newPartner, number_of_interviews: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Number of Offers:</label>
            <input
              type="number"
              placeholder="Number of Offers"
              value={newPartner.number_of_offers}
              onChange={(e) => setNewPartner({ ...newPartner, number_of_offers: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Number of Events:</label>
            <input
              type="number"
              placeholder="Number of Events"
              value={newPartner.number_of_events}
              onChange={(e) => setNewPartner({ ...newPartner, number_of_events: e.target.value })}
            />
          </div>
          <button onClick={handleCreatePartner}>Add Partner</button>
        </div>

        {/* Close Messages Button */}
        {(error || successMessage) && (
          <button className="close-message" onClick={closeMessages}>
            Close
          </button>
        )}
      </div>
    </div>
  );
};

export default Partners;
