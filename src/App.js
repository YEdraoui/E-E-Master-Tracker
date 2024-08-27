import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Partners from './components/Partners';
import TrackingTable from './components/TrackingTable'; 

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setAuthenticated(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setAuthenticated={setAuthenticated} />} />
        <Route path="/dashboard" element={authenticated ? <Dashboard /> : <Navigate to="/" replace />} />
        <Route path="/partners" element={authenticated ? <Partners /> : <Navigate to="/" replace />} />
        <Route path="/tracking-table" element={authenticated ? <TrackingTable /> : <Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
