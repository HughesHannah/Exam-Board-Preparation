import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Home from "./pages/home/Home.jsx";
import CoursePage from "./components/CoursePage";
import StudentSingle from "./pages/studentSingle/StudentSingle.jsx";
import StudentList from "./pages/studentList/StudentList.jsx";
import Login from "./pages/login/Login.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route exact path='/student' element={<StudentSingle/> } />
          <Route exact path='/studentList' element={<StudentList/>} />
          <Route exact path='/login' element={<Login/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

  const appDiv = document.getElementById("app");
  render(<App />, appDiv);