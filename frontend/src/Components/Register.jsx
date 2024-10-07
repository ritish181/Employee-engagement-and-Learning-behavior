// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./styles/register.css"

const Register = () => {
  const [formData, setFormData] = useState({
    u_name: '',
    email: '',
    password: '',
    d_id: 0,
  });

  const [departments, setDepartments] = useState([]); // State to store departments
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch departments from the backend API
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/department'); // Adjust the endpoint accordingly
        if (response.ok) {
          const data = await response.json();
          //console.log(data)
          setDepartments(data);
        } else {
          console.error('Failed to fetch departments');
        }
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.name === 'd_id' ? parseInt(e.target.value) : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful");
        navigate('/login');
      } else {
        console.error('Registration failed');
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className='container'>
      <div className='box'>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="u_name"
          placeholder="Name"
          value={formData.u_name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="d_id"
          value={formData.d_id} // Bound to state
          onChange={handleChange}
          required
        >
          {/* Default option manually inserted */}
          <option value="" >--Select Department--</option>
          
          {/* Loop through departments from database */}
          {departments.department && departments.department.map(department => (
            <option key={department.d_id} value={department.d_id}>
              {department.d_name}
            </option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>
      <p>
        Already registered?{' '}
        <button onClick={handleLoginRedirect}>Login here</button>
      </p>
      </div>
    </div>
  );
};

export default Register;
