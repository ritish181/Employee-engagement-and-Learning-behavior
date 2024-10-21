import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from '../Components/styles/createCourse.module.css';

const CreateCourse = () => {
  const [courseName, setCourseName] = useState('');
  const [learningMaterials, setLearningMaterials] = useState([{ title: '', content: '', type: '' }]);
  const [quizzes, setQuizzes] = useState([{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correct_option: '' }]);

  const handleLearningMaterialChange = (index, field, value) => {
    const updatedMaterials = [...learningMaterials];
    updatedMaterials[index][field] = value;
    setLearningMaterials(updatedMaterials);
  };

  const handleQuizChange = (index, field, value) => {
    const updatedQuizzes = [...quizzes];
    updatedQuizzes[index][field] = value;
    setQuizzes(updatedQuizzes);
  };

  const addLearningMaterial = () => {
    setLearningMaterials([...learningMaterials, { title: '', content: '', type: '' }]);
  };

  const addQuiz = () => {
    setQuizzes([...quizzes, { question: '', optionA: '', optionB: '', optionC: '', optionD: '', correct_option: '' }]);
  };

  const handleSubmit = async (e) => {

    const courseData = {
      c_name: courseName,
      learningMaterials,
      quizzes,
    };

    try {
      const response = await axios.post('http://localhost:5001/api/admin/courses/create', courseData);
      console.log(response.data);
      alert('Course created successfully');
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Create Course</h2>
      
      <label className={styles.label}>
        Course Name:
        <input 
          type="text" 
          value={courseName} 
          onChange={(e) => setCourseName(e.target.value)} 
          required 
          className={styles.input}
        />
      </label>

      <h3 className={styles.subheading}>Learning Materials</h3>
      {learningMaterials.map((material, index) => (
        <div key={index} className={styles.materialItem}>
          <input
            type="text"
            placeholder="Title"
            value={material.title}
            onChange={(e) => handleLearningMaterialChange(index, 'title', e.target.value)}
            required
            className={styles.materialInput}
          />
          <input
            type="text"
            placeholder="Content"
            value={material.content}
            onChange={(e) => handleLearningMaterialChange(index, 'content', e.target.value)}
            required
            className={styles.materialInput}
          />
          <input
            type="text"
            placeholder="Type (e.g., Video, Document)"
            value={material.type}
            onChange={(e) => handleLearningMaterialChange(index, 'type', e.target.value)}
            required
            className={styles.materialInput}
          />
        </div>
      ))}
      <button type="button" onClick={addLearningMaterial} className={styles.button}>Add Learning Material</button>

      <h3 className={styles.subheading}>Quizzes</h3>
      {quizzes.map((quiz, index) => (
        <div key={index} className={styles.quizItem}>
          <input
            type="text"
            placeholder="Question"
            value={quiz.question}
            onChange={(e) => handleQuizChange(index, 'question', e.target.value)}
            required
            className={styles.quizInput}
          />
          <input
            type="text"
            placeholder="Option A"
            value={quiz.optionA}
            onChange={(e) => handleQuizChange(index, 'optionA', e.target.value)}
            required
            className={styles.quizInput}
          />
          <input
            type="text"
            placeholder="Option B"
            value={quiz.optionB}
            onChange={(e) => handleQuizChange(index, 'optionB', e.target.value)}
            required
            className={styles.quizInput}
          />
          <input
            type="text"
            placeholder="Option C"
            value={quiz.optionC}
            onChange={(e) => handleQuizChange(index, 'optionC', e.target.value)}
            required
            className={styles.quizInput}
          />
          <input
            type="text"
            placeholder="Option D"
            value={quiz.optionD}
            onChange={(e) => handleQuizChange(index, 'optionD', e.target.value)}
            required
            className={styles.quizInput}
          />
          <input
            type="text"
            placeholder="Correct Option"
            value={quiz.correct_option}
            onChange={(e) => handleQuizChange(index, 'correct_option', e.target.value)}
            required
            className={styles.quizInput}
          />
        </div>
      ))}
      <button type="button" onClick={addQuiz} className={styles.button}>Add Quiz</button>
      
      <button type="submit" className={styles.submitButton}>Create Course</button>
      <br />
      <center className={styles.homeBtn}>
        <Link to= "/adminHome" className={styles.homeBtn}>Back to Home</Link>
      </center>
      
    </form>
  );
};

export default CreateCourse;

