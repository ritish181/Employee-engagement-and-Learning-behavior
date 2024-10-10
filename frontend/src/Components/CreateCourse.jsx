

import React, { useState } from 'react';
import axios from 'axios';

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
    e.preventDefault();

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
    <form onSubmit={handleSubmit}>
      <h2>Create Course</h2>
      
      <label>
        Course Name:
        <input type="text" value={courseName} onChange={(e) => setCourseName(e.target.value)} required />
      </label>

      <h3>Learning Materials</h3>
      {learningMaterials.map((material, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Title"
            value={material.title}
            onChange={(e) => handleLearningMaterialChange(index, 'title', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Content"
            value={material.content}
            onChange={(e) => handleLearningMaterialChange(index, 'content', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Type (e.g., Video, Document)"
            value={material.type}
            onChange={(e) => handleLearningMaterialChange(index, 'type', e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addLearningMaterial}>Add Learning Material</button>

      <h3>Quizzes</h3>
      {quizzes.map((quiz, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="Question"
            value={quiz.question}
            onChange={(e) => handleQuizChange(index, 'question', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Option A"
            value={quiz.optionA}
            onChange={(e) => handleQuizChange(index, 'optionA', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Option B"
            value={quiz.optionB}
            onChange={(e) => handleQuizChange(index, 'optionB', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Option C"
            value={quiz.optionC}
            onChange={(e) => handleQuizChange(index, 'optionC', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Option D"
            value={quiz.optionD}
            onChange={(e) => handleQuizChange(index, 'optionD', e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Correct Option"
            value={quiz.correct_option}
            onChange={(e) => handleQuizChange(index, 'correct_option', e.target.value)}
            required
          />
        </div>
      ))}
      <button type="button" onClick={addQuiz}>Add Quiz</button>
      
      <button type="submit">Create Course</button>
    </form>
  );
};

export default CreateCourse;

