// src/components/Events.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // Import your Supabase client
import './Dashboard.css'; // Import common layout CSS
import './navbar.css'; // Import navbar CSS

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [newEvent, setNewEvent] = useState({
    name: '',
    event_date: '',
    number_of_participants: '',
    number_of_partners: ''
  });

  // Fetch events from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await supabase.from('events').select('*');
        if (eventsData.error) throw eventsData.error;
        setEvents(eventsData.data);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create a new event and update the database
  const handleCreateEvent = async () => {
    if (!newEvent.name || !newEvent.event_date) {
      setError('Please fill in all required fields.');
      return;
    }

    try {
      const { data, error } = await supabase.from('events').insert([newEvent]);
      if (error) throw error;

      // Refresh the list of events
      setEvents([...events, ...data]);
      setSuccessMessage('Event created successfully!');
      setNewEvent({
        name: '',
        event_date: '',
        number_of_participants: '',
        number_of_partners: ''
      });
    } catch (error) {
      setError('Failed to create event.');
    }
  };

  // Helper function to close messages
  const closeMessages = () => {
    setError(null);
    setSuccessMessage(null);
  };

  if (loading) return <div>Loading events...</div>;
  if (error) return <div className="error">{error}</div>;

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

      {/* Main Content */}
      <div className="main-content">
        <h2>Events</h2>

        {/* Success or Error Messages */}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {error && <div className="error-message">{error}</div>}

        {/* Display Events Table */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Date</th>
              <th>Participants</th>
              <th>Partners</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>{event.event_id}</td>
                <td>{event.name}</td>
                <td>{event.event_date}</td>
                <td>{event.number_of_participants}</td>
                <td>{event.number_of_partners}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Form to Create New Event */}
        <div className="event-form">
          <h3>Create New Event</h3>
          <div>
            <label>Event Name:</label>
            <input
              type="text"
              placeholder="Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            />
          </div>
          <div>
            <label>Event Date:</label>
            <input
              type="date"
              value={newEvent.event_date}
              onChange={(e) => setNewEvent({ ...newEvent, event_date: e.target.value })}
            />
          </div>
          <div>
            <label>Number of Participants:</label>
            <input
              type="number"
              placeholder="Number of Participants"
              value={newEvent.number_of_participants}
              onChange={(e) => setNewEvent({ ...newEvent, number_of_participants: e.target.value })}
            />
          </div>
          <div>
            <label>Number of Partners:</label>
            <input
              type="number"
              placeholder="Number of Partners"
              value={newEvent.number_of_partners}
              onChange={(e) => setNewEvent({ ...newEvent, number_of_partners: e.target.value })}
            />
          </div>
          <button onClick={handleCreateEvent}>Create Event</button>
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

export default Events;
