import React from 'react';
import { Link } from 'react-router-dom';
import './styles/adminCourses.css';

const AdminCourses = () => {
  return (
    <div className="admin-courses">
      {/* Sidebar */}
      <aside className="sidebar">
        <ul>
          <li><Link to="/add-course">Add Course</Link></li>
          <li>
            <div className="dropdown">
              <button className="dropdown-btn">Courses</button>
              <div className="dropdown-content">
                <Link to="/course-1">Course 1</Link>
                <Link to="/course-2">Course 2</Link>
              </div>
            </div>
          </li>
          <li><Link to="/quiz">Quiz</Link></li>
          <li><Link to="/discussions">Discussions</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
          <li><Link to="/engagement">Engagement</Link></li>
        </ul>
      </aside>

      {/* Main body */}
      <div className="main-body">
        <div className="course-card">
          <h2>Course Title</h2>
          <p>Course Description: This course covers important topics...</p>
          <button>Manage Course</button>
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
