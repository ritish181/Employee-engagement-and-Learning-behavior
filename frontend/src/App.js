import React from "react";
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register from "./Components/Register"
import Login from "./Components/Login";
import Employee from "./Components/EmployeeHome";
import Admin from "./Components/AdminHome";
import Requests from "./Components/Requests";
import Courses from "./Components/Courses";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Register} />
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/employeeHome" Component={Employee} />
       <Route path="/adminHome" Component={localStorage.getItem("token")? Admin: "" } />
      <Route path="/requests" Component={Requests} />
      <Route path="/courses/:c_id" Component={Courses} /> 
    </Routes>
    </BrowserRouter>
  );
}

export default App;
