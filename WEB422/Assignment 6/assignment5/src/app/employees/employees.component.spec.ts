import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../data/employee';
import { EmployeeService } from '../data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnDestroy {
  
  getEmployeesSub: any;
  employees: Employee[];
  loadingError: boolean = false;
  constructor(private employeeService: EmployeeService ,private router: Router) { }
  ngOnInit() {
    this.getEmployeesSub = this.employeeService
      .getEmployees()
      .subscribe(
        employees => (this.employees = employees),
        error => (this.loadingError = true)
      );
  }

  routeEmployee(id: string): void{
    this.router.navigate(['/employee',id])
  }

  ngOnDestroy() {
    if (this.getEmployeesSub !== undefined) {
      this.getEmployeesSub.unsubscribe();
    }
  }

}