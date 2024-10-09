import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles/courses.module.css'; // Import CSS module

const Courses = () => {
  const { c_id } = useParams();
  const [course, setCourse] = useState(null);
  const [feedbacks, setRecentFeedbacks] = useState([]);
  const [discussions, setRecentDiscussions] = useState([]);
  const [expandedModule, setExpandedModule] = useState(null);

  // Fetch the course details from the API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/courses/${c_id}`);
        const data = await response.json();
        setCourse(data[0]);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourse();
  }, [c_id]);

  // Fetch recent feedbacks
  useEffect(() => {
    const recentFeedbacks = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/feedbacks/${c_id}`);
        const data = await response.json();
        const sortedFeedbacks = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const recent5Feedbacks = sortedFeedbacks.slice(0, 5);
        setRecentFeedbacks(recent5Feedbacks);
      } catch (error) {
        console.error('Error fetching recent feedbacks:', error);
      }
    };
    recentFeedbacks();
  }, [c_id]);

  // Fetch recent discussions
  useEffect(() => {
    const recentDiscussions = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/discussions/${c_id}`);
        const data = await response.json();
        const sortedDiscussions = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        const recent5Discussions = sortedDiscussions.slice(0, 5);
        setRecentDiscussions(recent5Discussions);
      } catch (error) {
        console.error('Error fetching recent discussions:', error);
      }
    };
    recentDiscussions();
  }, [c_id]);

  // Toggle module visibility
  const toggleModule = (m_id) => {
    if (expandedModule === m_id) {
      setExpandedModule(null); // Collapse if already expanded
    } else {
      setExpandedModule(m_id); // Expand selected module
    }
  };

  return (
    <div className={styles.coursePage}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h2>Courses</h2>
        <ul className={styles.navLinks}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/">Courses</Link></li>
          <li><Link to="#">Feedback</Link></li>
          <li><Link to="#">Discussions</Link></li>
          <li><Link to="/login">Logout</Link></li>
        </ul>
      </nav>

      {/* Course Name as a Card */}
      <div className={styles.courseNameCard}>
        <h1>{course ? course.c_name : 'Loading course...'}</h1>
      </div>

      {/* Main Content */}
      <main className={styles.content}>
        {/* COURSE COMPLETION STATUS */}
        <div>
          <h1>Course Completion Status</h1>
          <p>{course ? `Completed: ${course.completionStatus}%` : 'Loading...'}</p>
        </div>

        {/* MODULES */}
        <div className={styles.modulesSection}>
          <h2>Modules</h2>
          <div className={styles.modulesContainer}>
            {course && course.materials ? (
              course.materials.map((material) => (
                <div key={material.m_id} className={styles.moduleItem}>
                  <div
                    className={styles.moduleTitle}
                    onClick={() => toggleModule(material.m_id)}
                  >
                    {material.title}
                  </div>

                  {/* Toggle visibility of content */}
                  {expandedModule === material.m_id && (
                    <div className={styles.moduleContent}>
                      <p>Type: {material.type}</p>
                      <p>
                        Content:{' '}
                        <a href={material.content} target="_blank" rel="noreferrer">
                          {material.content}
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Loading modules...</p>
            )}
          </div>
        </div>

        {/* FEEDBACKS */}
        <div className={styles.feedbacksTableContainer}>
          <h1>FEEDBACKS</h1>
          {console.log(localStorage.getItem('role'))}
          {localStorage.getItem('role') == "admin"? <button>Add course</button>: " "}
          <table className={styles.feedbacksTable}>
            <thead>
              <tr>
                <th>Feedback ID</th>
                <th>Course Name</th>
                <th>User Name</th>
                <th>Remarks</th>
                <th>Rating</th>
                <th>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {feedbacks.map(feedback => (
                <tr key={feedback.f_id}>
                  <td>{feedback.f_id}</td>
                  <td>{feedback.course.c_name}</td>
                  <td>{feedback.register.u_name}</td>
                  <td>{feedback.remarks}</td>
                  <td>{feedback.rating}</td>
                  <td>{new Date(feedback.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* DISCUSSIONS */}
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
              {discussions.map((discussion) => (
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

        <button onClick={() => console.log("Button clicked")}>Sample Button</button>
      </main>
    </div>
  );
};

export default Courses;
