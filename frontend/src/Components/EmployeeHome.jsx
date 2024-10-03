import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const navigate = useNavigate();

  // Fetch employee details on component mount
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('/api/employee', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // to include cookies for authentication
        });

        const data = await response.json();
        if (response.ok) {
          setEmployeeData(data);
        } else {
          // Handle error or redirect to login if unauthorized
          navigate('/login');
        }
      } catch (error) {
        console.error('Failed to fetch employee data:', error);
      }
    };

    fetchEmployeeData();
  }, [navigate]);

  if (!employeeData) {
    return <p>Loading employee data...</p>;
  }

  return (
    <div>
      <h1>Welcome, {employeeData.u_name}!</h1>
      <p>Email: {employeeData.email}</p>
      <p>Department: {employeeData.department.d_name}</p>
      {/* Add more details or actions here */}
    </div>
  );
};

export default HomePage;
