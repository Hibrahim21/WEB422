/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Hamza Ibrahim       Student ID:107467185        Date: Sep.16, 2019
*
*
********************************************************************************/ 

$(function(){
    
    $("#teams-menu").on("click",function(event){
        event.preventDefault();
      
        $.ajax({
            url:"http://localhost:8081/teams",
            type:"GET",
            contentType:"application/jason"
        })
        .done(function(data){
            $("#data").empty().append("<h3>Teams</h3>").append(JSON.stringify(data));
        })
        .fail(function(){
            $("#data").empty().append("<h3>Teams</h3>").append(JSON.stringify(err));
        })
    })

    $("#employees-menu").on("click",function(event){
        event.preventDefault();

        $.ajax({
            url:"http://localhost:8081/employees",
            type:"GET",
            contentType:"application/json"
        })

        .done(function(data){
            $("#data").empty().append("<h3>Employees</h3>").append(JSON.stringify(data));
        })
        
        .fail(function(err){
            $("#data").empty().append("<h3>Employees</h3>").append(JSON.stringify(err));
        })
    })

    $("#projects-menu").on("click",function(event){
        event.preventDefault();

        $.ajax({
            url:"http://localhost:8081/projects",
            type:"GET",
            contentType:"application/json"
        })
        
        .done(function(data){
            $("#data").empty().append("<h3>Projects</h3>").append(JSON.stringify(data));
        })

        .fail(function(err){    
            $("#data").empty().append("<h3>Projects</h3>").append(JSON.stringify(err));
        })
    })

    $("#positions-menu").on("click",function(event){
        event.preventDefault();

        $.ajax({
            url:"http://localhost:8081/positions",
            type:"GET",
            contentType:"application/json"
        })

        .done(function(data){
            $("#data").empty().append("<h3>Positions</h3>").append(JSON.stringify(data));
        })

        .fail(function(err){
            $("#data").empty().append("<h3>Positions</h3>").append(JSON.stringify(err));
        })
    })
})
