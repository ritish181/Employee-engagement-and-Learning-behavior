import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./Components/Register";
import Login from "./Components/Login";
import Employee from "./Components/EmployeeHome";
import Admin from "./Components/AdminHome";
import Requests from "./Components/Requests";
import Courses from "./Components/Courses";
import ProtectedRoute from "./Components/Protectedroute";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protecting the routes */}
        <Route 
          path="/employeeHome" 
          element={<ProtectedRoute element={<Employee />} />} 
        />
        <Route 
          path="/adminHome" 
          element={<ProtectedRoute element={<Admin />} />} 
        />
        <Route 
          path="/requests" 
          element={<ProtectedRoute element={<Requests />} />} 
        />
        <Route 
          path="/courses/:c_id" 
          element={<ProtectedRoute element={<Courses />} />} 
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
