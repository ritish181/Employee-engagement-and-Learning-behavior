import React from "react";
import {BrowserRouter , Routes, Route} from 'react-router-dom'
import Register from "./Components/Register"
import Login from "./Components/Login";
import EmployeeHome from "./Components/EmployeeHome";


const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" Component={Register} />
      <Route path="/register" Component={Register} />
      <Route path="/login" Component={Login} />
      <Route path="/employee-homepage" Component={EmployeeHome} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
