import React from 'react';
import { Link } from 'react-router-dom';
import './styles/adminHome.css'; 

const Admin = () => {
  // Dummy data for demonstration
  const numCourses = 10; // Replace with actual data fetch
  const numEmployees = 25; // Replace with actual data fetch
  const numRequests = 5; // Replace with actual data fetch

  return (
    <div className="admin-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/adminHome">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/departments">Departments</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </aside>

      {/* Main Content Area */}
      <main className="content">
        <h2>Home</h2>
        <div className="card-container">
          <div className="card">
            <h3>Number of Courses</h3>
            <p>{numCourses}</p>
          </div>
          <div className="card">
            <h3>Number of Employees</h3>
            <p>{numEmployees}</p>
          </div>
          <div className="card">
            <h3>Number of Requests</h3>
            <p>{numRequests}</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
