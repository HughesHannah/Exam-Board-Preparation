import React, { Component } from 'react';
import "./studentList.scss"

export default class HomePage extends Component {
  constructor(props) {
      super(props);
  }

  render() {
      return (<div className="studentList">
        Student List
      </div>);
  }
}