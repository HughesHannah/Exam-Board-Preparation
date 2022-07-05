import React from 'react'
import "./featured.scss"

import GradesPieChartExample from './GradesPieChart.js'

import MoreVertIcon from '@mui/icons-material/MoreVert';

const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Average Student Grade</h1>
            <MoreVertIcon fontSize='small'/>
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