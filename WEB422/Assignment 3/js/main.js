/********************************************************************************* * 
 * WEB422 – Assignment 03 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
 * No part of this assignment has been copied manually or electronically from any other source (including web sites) or 
 * distributed to other students. 
 * 
 * Name: Hamza Ibrahim          Student ID: 107467185               Date: Oct. 11, 2019 
 * 
 *  ********************************************************************************/

let viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),
    projects: ko.observable([])
};

function showGenericModal(title, message){
    $("#genericModal .modal-title").html(title);
    $("#genericModal .modal-body").html(message);
    $("#genericModal").modal('show');
};

function initializeTeams(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8081/teams-raw",
            type: "GET",
            contentType: 'application/json'
        })
        .done((data) => {
            // Sort the Array to show the panels in order, sorted by team ID
            data.sort((a, b) =>{
                let teamA = a._id;
                let teamB = b._id;
                if(teamA < teamB){
                    return -1;
                }
                else if(teamA > teamB){
                    return 1;
                }
                return 0;     
            });
            viewModel.teams = ko.mapping.fromJS(data);
            resolve();
        })
        .fail((err) =>{
            reject("Error loading the team data.");
        })
    });
};

function initializeEmployees(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8081/employees",
            type: "GET",
            contentType: 'application/json'
        })
        .done((data) => {
            viewModel.employees = ko.mapping.fromJS(data);
            resolve();
        })
        .fail((err) =>{
            reject("Error loading the employee data.");
        })
    });
};


function initializeProjects(){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "http://localhost:8081/projects",
            type: "GET",
            contentType: 'application/json'
        })
        .done((data) => {
            viewModel.projects = ko.mapping.fromJS(data);
            resolve();
        })
        .fail((err) =>{
            reject("Error loading the 'projects' data.");
        })
    });
};

$(() => {
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(() =>{
        ko.applyBindings(viewModel);
        $('select.multiple').multipleSelect({ filter: true });
        $('select.single').multipleSelect({ single: true, filter: true });
    })
    .catch((err) => {
        showGenericModal("Error", err);
    });
});

function saveTeam(){
     var currentTeam = this;
    $.ajax({
        url: "http://localhost:8081/team/" + currentTeam._id(),
            type: "PUT",
            data: JSON.stringify({
                Projects: currentTeam.Projects(),
                Employees: currentTeam.Employees(),
                TeamLead: currentTeam.TeamLead()
            }),
            contentType: "application/json"
    })
    .done((data) => {
        showGenericModal("Success! ", currentTeam.TeamName() + " updated successfully.");
    })
    .fail((err) =>{
        showGenericModal("Error ", err + " updating the team information.");
    })
}
