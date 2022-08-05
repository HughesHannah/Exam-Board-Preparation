import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import PrivateRoute from "./utils/PrivateRoute.js";
import { AuthProvider } from "./context/AuthContext.js"

import Home from "./pages/home/Home.js";
import SingleStudent from "./pages/Single/SingleStudent.js";
import SingleCourse from "./pages/Single/SingleCourse.js";
import StudentList from "./pages/List/StudentList.js";
import CourseList from "./pages/List/CourseList.js";
import Login from "./pages/login/Login.js";
import Grading from "./pages/grading/Grading.js";
import Profile from "./pages/login/Profile.js";
import Classification from "./pages/classification/Classification.js";
import Upload from "./pages/upload/Upload.js";


function App() {
  return (
    <div className="App">

      <Router>
        <AuthProvider>
      <Routes>
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/' element={<Home/>}/>
            <Route path="students">
              <Route index element={<StudentList />} />
              <Route path=":studentID" element={<SingleStudent />} />
            </Route>
            <Route path="courses">
              <Route index element={<CourseList />} />
              <Route path=":year">
                <Route index element={<CourseList />} />
                <Route path=":courseID" element={<SingleCourse />} />
              </Route>
            </Route>
            <Route path="grading" element={<Grading />} />
            <Route path="classification">
              <Route path=":degree" element={<Classification />} />
            </Route>
            
            <Route path="upload" element={<Upload />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route exact path='/login' element={<Login/>}/>
        </Routes>
        </AuthProvider>
      </Router>

    </div>
  );
}

export default App;

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);
