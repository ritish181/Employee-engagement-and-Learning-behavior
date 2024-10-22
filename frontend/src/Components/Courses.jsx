import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './styles/courses.module.css'; // Import CSS module
import axios from 'axios';
import { toast } from 'react-toastify';

const Courses = () => {
  const { c_id } = useParams();
  const [u_id, setu_id] = useState(); 
  const [course, setCourse] = useState(null);
  const [feedbacks, setRecentFeedbacks] = useState([]);
  const [discussions, setRecentDiscussions] = useState([]);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [discussionText, setDiscussionText] = useState('');
  const [expandedModule, setExpandedModule] = useState(null);
  const [completedModules, setCompletedModules] = useState({}); // Store completed status

  // Fetch the course details from the API
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/courses/${c_id}`);
        const data = await response.json();
        setCourse(data[0]);

        // After fetching course, check completion status for each module
        if (data[0] && data[0].materials) {
          data[0].materials.forEach((material) => checkIsCompleted(material.m_id));
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };
    fetchCourse();
    setu_id(localStorage.getItem("u_id"))
  }, [c_id]);

  // Check if the module is completed
  const checkIsCompleted = async (m_id) => {
    try {
      const course_id = c_id;
      const u_id = localStorage.getItem("u_id")
      const response = await axios.post('http://localhost:5001/api/engagement/module/isCompleted', {
        u_id: u_id,
        c_id: course_id,
        m_id: m_id,
      });
      setCompletedModules((prev) => ({ ...prev, [m_id]: response.data.completed }));
    } catch (error) {
      console.error('Unable to fetch isCompleted status:', error);
    }
  };

  // Mark module as completed
  const markAsCompleted = async (m_id) => {
    try {
      const course_id = c_id;
      const u_id = localStorage.getItem("u_id")
      const response = await axios.post('http://localhost:5001/api/engagement/module', {
        u_id: u_id,
        c_id: course_id,
        m_id: m_id,
        time_spent: 120, // Replace with actual time spent if you track it
      });

      if (response.status === 201) {
        // Update UI by setting the module as completed
        setCompletedModules((prev) => ({ ...prev, [m_id]: true }));
        toast('Module marked as completed successfully!');
      }
    } catch (error) {
      console.error('Error marking module as completed:', error);
      toast('Failed to mark module as completed. Please try again.');
    }
  };

  // Toggle module visibility
  const toggleModule = (m_id) => {
    if (expandedModule === m_id) {
      setExpandedModule(null); // Collapse if already expanded
    } else {
      setExpandedModule(m_id); // Expand selected module
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    if ((!feedbackText) || (!feedbackRating)){
      toast("Fields cannot be empty");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/feedbacks', {
        u_id: u_id,
        c_id: c_id,
        remarks: feedbackText,
        rating: feedbackRating,
      });

      if (response.status === 201) {
        setFeedbackText(''); // Clear the feedback form
        setFeedbackRating(0); //clear rating
        toast('Feedback submitted successfully!');

        // Fetch the updated feedbacks
        const feedbackResponse = await axios.get(`http://localhost:5001/api/feedbacks/${c_id}`);
        setRecentFeedbacks(feedbackResponse.data);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast('Failed to submit feedback. Please try again.');
    }
  };

  // Handle discussion submission
  const handleDiscussionSubmit = async () => {
    if (!discussionText) {
      toast("Discussion cannot be empty");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/discussions', {
        u_id: u_id,
        c_id: c_id,
        comment: discussionText,
      });

      if (response.status === 201) {
        setDiscussionText(''); // Clear the discussion form
        toast('Discussion submitted successfully!');

        // Fetch the updated discussions
        const discussionResponse = await axios.get(`http://localhost:5001/api/discussions/${c_id}`);
        setRecentDiscussions(discussionResponse.data);
      }
    } catch (error) {
      console.error('Error submitting discussion:', error);
      toast('Failed to submit discussion. Please try again.');
    }
  };

  // const notify = () => toast("Wow so easy!");
  return (
    <div className={styles.coursePage}>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <h2>Courses</h2>
        <ul className={styles.navLinks}>
          <li><Link to="#">Home</Link></li>
          <li><Link to="/employeeHome">Courses</Link></li>
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
        {/* Course Completion Status */}
        <div>
          <h1>Course Completion Status</h1>
          <p>{course ? `Completed: ${course.completionStatus}%` : 'Loading...'}</p>
        </div>

        {/* Modules */}
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
                        Content: <a href={material.content} target="_blank" rel="noreferrer">{material.content}</a>
                      </p>
                      <button
                        className={styles.completeButton}
                        onClick={() => markAsCompleted(material.m_id)}
                        disabled={completedModules[material.m_id]} // Disable button if completed
                      >
                        {completedModules[material.m_id] ? 'Completed' : 'Mark as complete'}
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Loading modules...</p>
            )}
          </div>
        </div>

        <div>
          {localStorage.getItem('role') == "admin"? <button>+ Add Module</button>: " "}
        </div>
  
        {/* FEEDBACKS */}
        <div className={styles.feedbacksTableContainer}>
          <h1>FEEDBACKS</h1>
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

          {/* Submitting Feedback */}
          <h2>Submit Feedback</h2>
          <input onChange={(e) => setFeedbackRating(e.target.value)} 
            value={feedbackRating} type="number" 
            placeholder='Rating' /> 
          <br />

          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Write your feedback..."
          />
          <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
        </div>

        {/* DISCUSSIONS */}
        <div className={styles.discussionsTableContainer}>
          <h1>DISCUSSIONS</h1>
          <table className={styles.discussionsTable}>
            <thead>
              <tr>
                <th>Discussion ID</th>
                <th>User Name</th>
                <th>Topic</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {discussions.map(discussion => (
                <tr key={discussion.d_id}>
                  <td>{discussion.d_id}</td>
                  <td>{discussion.register.u_name}</td>
                  <td>{discussion.topic}</td>
                  <td>{new Date(discussion.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Submit Discussion</h2>
          <textarea
            value={discussionText}
            onChange={(e) => setDiscussionText(e.target.value)}
            placeholder="Write your discussion..."
          />
          <button onClick={handleDiscussionSubmit}>Submit Discussion</button>
        </div>
      </main>
    </div>
  );
};

export default Courses;
