import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/courses.css';  // Add styling

const Courses = ({ c_id }) => {
  const [courses, setCourse] = useState(null);  // To store course data
  const [materials, setMaterials] = useState([]);  // To store learning materials
  const navigate = useNavigate();

  // Fetch course and materials data
  useEffect(() => {
    fetch(`http://localhost:5001/api/courses/${c_id}`)  // Adjust endpoint as per your backend
      .then((response) => response.json())
      .then((data) => {
        setCourse(data.courses);
        setMaterials(data.materials);
      })
      .catch((error) => console.error('Error fetching course:', error));
  }, [c_id]);

  const handleLogout = () => {
    // Implement logout logic
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className="course-container">
      {/* Navbar */}
      <nav className="course-navbar">
        <ul>
          <li onClick={() => navigate(`/courses/${c_id}/modules`)}>Modules</li>
          <li onClick={() => navigate(`/courses/${c_id}/quiz`)}>Quiz</li>
          <li onClick={() => navigate(`/courses/${c_id}/discussions`)}>Discussions</li>
          <li onClick={() => navigate(`/courses/${c_id}/feedback`)}>Feedback</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      {/* Main Course Content */}
      <div className="course-content">
        {courses && (
          <div className="course-card">
            <h2>{courses.c_name}</h2>
          </div>
        )}
        <div className="materials-list">
          <h3>Learning Materials</h3>
          {materials.length > 0 ? (
            <ul>
              {materials.map((material) => (
                <li key={material.m_id}>
                  <h4>{material.title}</h4>
                  <p>{material.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No learning materials available for this course.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
