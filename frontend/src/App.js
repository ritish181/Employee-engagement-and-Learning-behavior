import React from "react";
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register from "./Components/Register"
import Login from "./Components/Login";
import Employee from "./Components/EmployeeHome";
import Admin from "./Components/AdminHome";
import Requests from "./Components/Requests";
import AdminCourses from "./Components/AdminCourses";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Register} />
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/employeeHome" Component={Employee} />
      <Route path="/adminHome" Component={ Admin } />
      <Route path="/requests" Component={Requests} />
      <Route path="/adminCourses" Component={AdminCourses} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
