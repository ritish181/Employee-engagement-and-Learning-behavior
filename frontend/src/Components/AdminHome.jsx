import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/adminHome.module.css';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  const [courses, setCourses] = useState([]);
  const [numEmployees, setNumEmployees] = useState(0);
  const [numRequests, setNumRequests] = useState(0);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [recentDiscussions, setRecentDiscussions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token, "token");
    if (!token) {
      navigate('/login', { replace: true }); // Redirect to login if no token is found
    } else {
      // Only proceed if the token is present
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    // Fetch courses
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }

    // Fetch employee and request counts
    try {
      const employeeResponse = await fetch('http://localhost:5001/api/employees');
      const employeeData = await employeeResponse.json();
      setNumEmployees(employeeData.count);
      
      const requestResponse = await fetch('http://localhost:5001/api/requests');
      const requestData = await requestResponse.json();
      setNumRequests(requestData.count);
    } catch (error) {
      console.error('Error fetching employee/request count:', error);
    }

    // Fetch recent feedbacks
    try {
      const feedbackResponse = await fetch('http://localhost:5001/api/feedbacks');
      const feedbackData = await feedbackResponse.json();
      const sortedFeedbacks = feedbackData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const recent10Feedbacks = sortedFeedbacks.slice(0, 10);
      setRecentFeedbacks(recent10Feedbacks);
    } catch (error) {
      console.error('Error fetching recent feedbacks:', error);
    }

    // Fetch recent discussions
    try {
      const discussionResponse = await fetch('http://localhost:5001/api/discussions');
      const discussionData = await discussionResponse.json();
      const sortedDiscussions = discussionData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const recent5Discussions = sortedDiscussions.slice(0, 5);
      setRecentDiscussions(recent5Discussions);
    } catch (error) {
      console.error('Error fetching recent discussions:', error);
    }

    setLoading(false); // Set loading to false after data fetching
  };

  // If loading, show a loading message or spinner
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.adminPage}>
      <nav className={styles.navbar}>
        <h2>Admin Panel</h2>
        <ul className={styles.navLinks}>
          <li><Link to="/adminHome">Dashboard</Link></li>
          <li><Link to="/courses">Courses</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="#">Feedback</Link></li>
          <li><Link to="#">Discussions</Link></li>
          <li><Link to="/login" onClick={() => {localStorage.removeItem('token'); localStorage.removeItem('role')}}>Logout</Link></li>
        </ul>
      </nav>

      <main className={styles.content}>
        <h2>Home</h2>
        <div className={styles.cardContainer}>
          <div className={styles.card}>
            <h3>Number of Courses</h3>
            <p>{courses.length}</p>
          </div>
          <div className={styles.card}>
            <h3>Number of Employees</h3>
            <p>{numEmployees}</p>
          </div>
          <div className={styles.card}>
            <h3>Number of Requests</h3>
            <p>{numRequests}</p>
          </div>
        </div>

        <div className={styles.courseCardContainer}>
          <h1>COURSES</h1>
          {courses.map(course => (
            <div className={styles.card} key={course.c_id}>
              <h3>{course.c_name}</h3>
              <Link to={`/courses/${course.c_id}`} className={styles.courseLink}>View Course</Link>
            </div>
          ))}
        </div>

        <div className={styles.feedbacksTableContainer}>
          <h1>FEEDBACKS</h1>
          <table className={styles.feedbacksTable}>
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
                  <td>{new Date(feedback.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h1>Recent Discussions</h1>
          <table className={styles.discussionTable}>
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
              {recentDiscussions.map(discussion => (
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

        <button onClick={() => window.scrollTo(0, 0)}>Back to top</button>
      </main>
    </div>
  );
};

export default Admin;
