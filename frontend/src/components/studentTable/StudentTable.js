import React, { Component, useEffect, useState } from 'react';
import { variables } from '../../Variables.js';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'DepartmentName', headerName: 'Department', width: 70 },
  ];


export class StudentTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // define array 
            departments:[]
        }
    }

    refreshList(){
        fetch(variables.API_URL+'department')
        .then(response => response.json())
        .then(data => {
            this.setState({departments:data});
        })
    }

    componentDidMount() {
        this.refreshList();
    }

    render(){
        const {departments} = this.state;

        <div className="datatable"><DataGrid
    rows={departments}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    checkboxSelection
    /></div>
    }
}