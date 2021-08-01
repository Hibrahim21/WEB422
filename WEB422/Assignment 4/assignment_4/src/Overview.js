import React, { Component } from 'react';
import MainContainer from './MainContainer'
import EmployeesPanel from './Employees/EmployeesPanel'
import ProjectsPanel from './Projects/ProjectsPanel'
import TeamsPanel from './Teams/TeamsPanel'

class Overview extends React.Component{
    render(){return(
        <MainContainer sidebar="Overview">
            <h1 className="page-header">Overview</h1>
            <div >
                <div className="col-md-4">
                <ProjectsPanel />
                </div>
                <div className="col-md-4">
                <TeamsPanel />
                </div>
                <div className="col-md-4">
                <EmployeesPanel />
                </div>
            </div>
         </MainContainer>        
    )}
}
export default Overview;