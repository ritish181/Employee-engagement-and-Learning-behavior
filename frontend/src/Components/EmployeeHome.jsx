import React from 'react';
import { Link } from 'react-router-dom';
import './styles/employeeHome.css'; 

const EmployeeHome = () => {
  return (
    <div className="employee-home">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">Employee Portal</div>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>

      {/* Layout: Sidebar and Main Content */}
      <div className="layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <ul>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/courses">Courses</Link></li>
            <li><Link to="/quizzes">Quizzes</Link></li>
            <li><Link to="/help">Help</Link></li>
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="content">
          <h2>Welcome to the Employee Portal</h2>
          <p>Select any option from the sidebar or navigate using the top links.</p>
        </main>
      </div>
    </div>
  );
};

export default EmployeeHome;
