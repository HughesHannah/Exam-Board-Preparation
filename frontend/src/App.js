import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';

import Home from "./pages/home/Home.js";
import Single from "./pages/Single/Single.js";
import List from "./pages/List/List.js";
import Login from "./pages/login/Login.js";
import New from "./pages/new/New.js";


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