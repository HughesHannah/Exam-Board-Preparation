import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Home from "./pages/home/Home.jsx";
import StudentSingle from "./pages/studentSingle/StudentSingle.jsx";
import StudentList from "./pages/studentList/StudentList.jsx";
import Login from "./pages/login/Login.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='student'>
              <Route path='List' element={<StudentList/>} />
              <Route path=':studentID' element={<StudentSingle/> } />
            </Route>
            <Route path='login' element={<Login/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

  const appDiv = document.getElementById("app");
  render(<App />, appDiv);