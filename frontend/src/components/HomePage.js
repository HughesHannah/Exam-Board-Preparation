import React, { Component } from 'react';
import StudentPage from "./StudentPage";
import CoursePage from "./CoursePage";
import { BrowserRouter as Router, Routes, Route, Link, Redirect } from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Router>
            <Routes>
                <Route path='/' element={<p>This is the homepage</p>} />
                <Route path='/student' element={<StudentPage/> } />
                <Route path='/course' element={<CoursePage/>} />
            </Routes>
        </Router>);
    }
}