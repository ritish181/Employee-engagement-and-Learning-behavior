// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles/login.module.css'; // Import the CSS module

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.role === 'admin') {
          alert("Admin Login Successful.");
          navigate('/adminHome'); // Redirect to admin page
        } else if (data.role === 'user') {
          alert("Employee Login Successful.");
          navigate('/employeeHome'); // Redirect to employee page
        } else {
          alert("Login failed. Invalid role.");
        }
        console.log(data)
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role)
        localStorage.setItem("u_id", data.u_id)
      } else {
        console.error('Login failed');
        alert('Invalid email or password.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className={styles.container}>
      <div className={styles.formBox}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Login</button>
          <p>
            New User?{' '}
            <button className = {styles.register} type="button" onClick={handleRegisterRedirect}>Register</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
