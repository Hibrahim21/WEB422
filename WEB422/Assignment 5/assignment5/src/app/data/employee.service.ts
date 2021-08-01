import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private readonly http: HttpClient) { }
  
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>("http://localhost:8081/employees");
  }
}
//https://web422database.herokuapp.com