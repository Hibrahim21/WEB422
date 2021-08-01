/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Hamza Ibrahim       Student ID:107467185        Date: Sep.27, 2019
*
*
********************************************************************************/ 

let employeesModel = [];


function initializeEmployeesModel(){

    $.ajax({
        url:"http://localhost:8081/employees",
        //url: "https://radiant-chamber-50329.herokuapp.com/employees",
        type:"GET",
        contentType:"application/json"
    })
    .done((data)=>{
        console.log(data);
        employeesModel = data;
        refreshEmployeeRows(employeesModel);
    })
    .fail((err)=>{
        showGenericModal('Error', 'Unable to get Employees');
    })
};

function showGenericModal(title, message){
    $(".modal-title").html(title);
    $(".modal-body").html(message);
    $("#genericModal").modal('show');
};

function refreshEmployeeRows(data){
    $("#employee-table").empty(); //There was a typo here, i had employees-table
    console.log("Refresh enters");
    let rowsTemplate = _.template('<% _.forEach(data, function(emp) { %>' +
                                 '<div class="row body-row" data-id=<%- emp._id %>>'+
                                    '<div class="col-xs-4 body-column"><%- emp.FirstName %></div>' +
                                    '<div class="col-xs-4 body-column"><%- emp.LastName %></div>' +
                                    '<div class="col-xs-4 body-column"><%- emp.Position.PositionName %></div>' +
                                 '</div>' +
                                 '<% }); %>');
    
       let rows = rowsTemplate({'data': data});
       $("#employee-table").empty().html(rows);
};

function getFilteredEmployeesModel(filterString){

    return _.filter(employeesModel, function(e){
        if(e.FirstName.toLowerCase().includes(filterString.toLowerCase())
            ||e.LastName.toLowerCase().includes(filterString.toLowerCase())
            ||e.Position.PositionName.toLowerCase().includes(filterString.toLowerCase())) {
                return true;
            }else {
                return false;
            }            
    });
};

function getEmployeeModelById(id){

    let result = null;
    for(let i = 0; i < employeesModel.length; i++){
        if(employeesModel[i]._id == id){
            result = _.cloneDeep(employeesModel[i]);
        }
    }
    return result;
};

$(()=>{
    initializeEmployeesModel();

    $(document).on("keyup", function(){
        refreshEmployeeRows(getFilteredEmployeesModel($("#employee-search").val()));
    });

    $(document).on("click",".body-row", function(){
        let emp = getEmployeeModelById($(this).attr("data-id"));
        let hireDate = moment(emp.hireDate).format('LL');
        emp.hireDate = hireDate;
        let templateEmp = _.template('<strong>Address:</strong> <%- emp.AddressStreet %> <%- emp.AddressCity %>, ' +
                                     '<%- emp.AddressState %> <%- emp.AddressZip %><br>' +
                                     '<strong>Phone Number:</strong> <%- emp.PhoneNum %> ext: <%- emp.Extension %><br>' +
                                     '<strong>Hire Date:</strong> <%- emp.hireDate %>');
        
        let title = emp.FirstName + ' ' + emp.LastName;
        let message = templateEmp({'emp': emp}); 
        showGenericModal(title, message);
    });

})