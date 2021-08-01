import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { EmployeeRaw } from './employeeRaw';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private readonly http: HttpClient) { }
  
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("https://infinite-island-86183.herokuapp.com/employees");
  }

  saveEmployee(employee: EmployeeRaw): Observable<any>{
    return this.http.put<EmployeeRaw>(`https://infinite-island-86183.herokuapp.com/employee/${employee._id}`, employee);
  }

  getEmployee(id: string): Observable<EmployeeRaw[]>{
    return this.http.get<EmployeeRaw[]>(`https://infinite-island-86183.herokuapp.com/employee-raw/${id}`);
  }
}
//https://web422database.herokuapp.com