import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { animateScroll as scroll, scroller } from 'react-scroll'; // Import scroll utilities
import styles from './styles/adminHome.module.css';

// Import necessary chart components from Recharts
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const Admin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [numEmployees, setNumEmployees] = useState(0);
  const [numRequests, setNumRequests] = useState(0);
  const [recentFeedbacks, setRecentFeedbacks] = useState([]);
  const [recentDiscussions, setRecentDiscussions] = useState([]);

  // Chart Data (dummy example for now)
  const chartData = [
    { name: 'Courses', value: courses.length },
    { name: 'Employees', value: numEmployees },
    { name: 'Requests', value: numRequests },
  ];

  const barChartData = [
    { name: 'Courses', value: courses.length },
    { name: 'Employees', value: numEmployees },
    { name: 'Requests', value: numRequests },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true }); // Redirect to login if no token is found
    } else {
      fetchData();
    }
  }, [navigate]);

  const fetchData = async () => {
    // Fetch courses, employees, requests, etc. (existing code)
    try {
      const response = await fetch('http://localhost:5001/api/courses');
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }

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

    try {
      const feedbackResponse = await fetch('http://localhost:5001/api/feedbacks');
      const feedbackData = await feedbackResponse.json();
      const sortedFeedbacks = feedbackData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const recent10Feedbacks = sortedFeedbacks.slice(0, 10);
      setRecentFeedbacks(recent10Feedbacks);
    } catch (error) {
      console.error('Error fetching recent feedbacks:', error);
    }

    try {
      const discussionResponse = await fetch('http://localhost:5001/api/discussions');
      const discussionData = await discussionResponse.json();
      const sortedDiscussions = discussionData.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      const recent5Discussions = sortedDiscussions.slice(0, 5);
      setRecentDiscussions(recent5Discussions);
    } catch (error) {
      console.error('Error fetching recent discussions:', error);
    }

    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // Function to scroll to top
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  // Function to scroll to a specific section
  const scrollToSection = (sectionName) => {
    scroller.scrollTo(sectionName, {
      smooth: true,
      offset: -70, // Offset the scroll for fixed nav
      duration: 500,
    });
  };

  return (
    <div className={styles.adminPage}>
      <nav className={styles.navbar}>
        <h2>Admin Panel</h2>
        <ul className={styles.navLinks}>
          <li><Link to="/adminHome">Home</Link></li>
          <li><Link to="#" onClick={() => scrollToSection('dashboardSection')}>Dashboard</Link></li>
          <li><Link to="/requests">Requests</Link></li>
          <li><Link to="#" onClick={() => scrollToSection('feedbacksSection')}>Feedback</Link></li>
          <li><Link to="#" onClick={() => scrollToSection('discussionsSection')}>Discussions</Link></li>
          <li><Link to="/login" onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('role'); }}>Logout</Link></li>
        </ul>
      </nav>
      
      <main className={styles.content}>
        {/* Dashboard Section */}
        <div id="dashboardSection" className={styles.dashboardSection}>
          <h2>Dashboard</h2>
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

          {/* Chart Section */}
          <div className={styles.chartSection}>
            <h3>Dashboard</h3>
            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} fill="#8884d8" label>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Courses' ? '#00C49F' : entry.name === 'Employees' ? '#FFBB28' : '#FF8042'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

            {/* Bar Chart */}
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scroll to Feedback Section */}
        <div id="feedbacksSection" className={styles.feedbacksTableContainer}>
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

        {/* Scroll to Discussions Section */}
        <div id="discussionsSection" className={styles.discussionsSection}>
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

        {/* Scroll to Top Button */}
        <button onClick={scrollToTop}>Scroll to Top</button>
      </main>
    </div>
  );
};

export default Admin;
