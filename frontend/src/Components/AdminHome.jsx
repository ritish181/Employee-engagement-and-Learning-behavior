import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/adminHome.css';

const Admin = () => {
  const [courses, setCourses] = useState([]); // State to store the fetched courses
  const [numEmployees, setNumEmployees] = useState(0);
  const [numRequests, setNumRequests] = useState(0);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]); //state to store recent feedbacks
  const [recentDiscussions, setRecentDiscussions] = useState([]);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/courses');  // Assuming your API endpoint is '/api/courses'
        const data = await response.json();
        setCourses(data);  // Set the fetched courses to state
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const recentFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/feedbacks');
        const data = await response.json();
        
        // Sort by created_at timestamp in descending order (newest first)
        const sortedFeedbacks = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        // Get the most recent 10 feedbacks
        const recent10Feedbacks = sortedFeedbacks.slice(0, 10);
        
        // Set the filtered feedbacks in state
        setRecentFeedbacks(recent10Feedbacks);
      } catch (error) {
        console.error('Error fetching recent feedbacks:', error);
      }
    };
  
    recentFeedbacks(); // Call the function to fetch and filter feedbacks
  }, []); // The empty dependency array ensures the effect runs once when the component mounts
  
  useEffect(() => {
    const recentDiscussions = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/discussions');
        const data = await response.json();
        
        // Sort by created_at timestamp in descending order (newest first)
        const sortedDiscussions = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        // Get the most recent 10 feedbacks
        const recent5Discussions = sortedDiscussions.slice(0, 5);
        
        // Set the filtered feedbacks in state
        setRecentDiscussions(recent5Discussions);
      } catch (error) {
        console.error('Error fetching recent feedbacks:', error);
      }
    };
  
    recentDiscussions(); // Call the function to fetch and filter feedbacks
  }, []); 

  return (
    <div className="admin-page">
      {/* Navbar */}
      <nav className="navbar">
        <h2>Admin Panel</h2>
        <ul className="nav-links">
          <li><Link to="/adminHome">Dashboard</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="#">Feedback</Link></li>
          <li><Link to="#">Discussions</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>

      {/* Main Content Area */}

      <main className="content">
        <h2>Home</h2>
        <div className="card-container">
          <div className="card">
            <h3>Number of Courses</h3>
            <p>{courses.length}</p> {/* Display total number of courses */}
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

        {/* Dashboard */}
        <div>
        <br /><br /><br /><br /><br /><h1>Dashboard</h1><br /><br /><br /><br /><br />
      </div>

        {/* Render all courses as cards */}
        <div className="course-card-container">
          <h1>COURSES</h1>
          {courses.map(course => (
            <div className="card" key={course.c_id}>
              <h3>{course.c_name}</h3>
              <Link to={`/courses/${course.c_id}`} className="course-link">View Course</Link> {/* Redirect to course page */}
            </div>
          ))}
        </div>


        {/* FEEDBACKS */}
      <div className="feedbacks-table-container">
        <h1>FEEDBACKS</h1>
        <table className="feedbacks-table">
          <thead>
            <tr>
              <th>Feedback ID</th>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Remarks</th>
              <th>Rating</th>
              <th>Submitted On</th>
            </tr>
          </thead>
          <tbody>
            {recentFeedbacks.map(feedback => (
              <tr key={feedback.f_id}>
                <td>{feedback.f_id}</td>
                <td>{feedback.c_id}</td>
                <td>{feedback.course.c_name}</td>
                <td>{feedback.u_id}</td>
                <td>{feedback.register.u_name}</td>
                <td>{feedback.remarks}</td>
                <td>{feedback.rating}</td>
                <td>{new Date(feedback.created_at).toLocaleDateString()}</td> {/* Formatting date */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DISCUSSIONS */}
      <div>
      <h1>Recent Discussions</h1>
      <table className="discussion-table">
        <thead>
          <tr>
            <th>Discussion ID</th>
            <th>User Name</th>
            <th>Course Name</th>
            <th>Comment</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {recentDiscussions.map((discussion) => (
            <tr key={discussion.id}>
              <td>{discussion.id}</td>
              <td>{discussion.register.u_name}</td>
              <td>{discussion.course.c_name}</td>
              <td>{discussion.comment}</td>
              <td>{new Date(discussion.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </main>
    </div>
  );
};

export default Admin;
