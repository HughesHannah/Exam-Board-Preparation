import React, { Component } from "react";
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Home from "./pages/home/Home.js";
import Single from "./pages/Single/Single.js";
import SingleStudent from "./pages/Single/SingleStudent.js";
import SingleCourse from "./pages/Single/SingleCourse.js";
import List from "./pages/List/List.js";
import StudentList from "./pages/List/StudentList.js";
import CourseList from "./pages/List/CourseList.js";
import Login from "./pages/login/Login.js";
import StudentTable from "./components/studentTable/StudentTable.js";
import Grading from "./pages/grading/Grading.js";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='students'>
              <Route index element={<StudentList/>} />
              <Route path=':studentID' element={<SingleStudent/> } />
            </Route>
            <Route path='courses'>
              <Route index element={<CourseList/>} />
              <Route path=':courseID' element={<SingleCourse/> } />
            </Route>
            <Route path='login' element={<Login/>} />
            <Route path='departments' element={<StudentTable/>} />
            <Route path='Grading' element={<Grading/>} />
            <Route path='users'>
              <Route index element={<List/>} />
              <Route path=':userID' element={<Single/> } />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

  const appDiv = document.getElementById("app");
  const root = createRoot(appDiv);
  root.render(<App />);