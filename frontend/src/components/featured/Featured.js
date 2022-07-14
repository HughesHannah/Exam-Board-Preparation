import React from 'react'
import "./featured.scss"

import GradesPieChartExample from './GradesPieChart.js'


const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Average Student Grade</h1>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <GradesPieChartExample/>
            </div>
        </div>
    </div>
  )
}

export default Featured