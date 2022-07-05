import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Home from "./pages/home/Home.jsx";
import Single from "./pages/Single/Single.jsx";
import List from "./pages/List/List.jsx";
import Login from "./pages/login/Login.jsx";
import New from "./pages/new/New.jsx";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route index element={<Home/>}/>
            <Route path='students'>
              <Route index element={<List/>} />
              <Route path=':studentID' element={<Single/> } />
              <Route path='new' element={<New/>} />
            </Route>
            <Route path='login' element={<Login/>} />
            <Route path='users'>
              <Route index element={<List/>} />
              <Route path=':userID' element={<Single/> } />
              <Route path='new' element={<New/>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

  const appDiv = document.getElementById("app");
  render(<App />, appDiv);