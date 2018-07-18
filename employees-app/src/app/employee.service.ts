import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../app/Employee';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  constructor( private http: HttpClient ) { }
  
  private api_url: string = 'http://localhost:8080/api/webresources/employee';

  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.api_url)
      .map(((response : any) => response));
  }

  getEmployee(id: any): Observable<any> {
    return this.http.get(this.api_url + '/' + id)
  }

  removeEmployee(id: any): Observable<any> {
    return this.http.delete(this.api_url + '/' + id,{ headers: new HttpHeaders().set('Content-Type', 'application/json')});
  }

  addEmployee(employee: Employee): Observable<any> {
    var e: Employee;
    e = employee;

    e['id'] = undefined
    return this.http.post(this.api_url, e);
  }

  updateEmployee(employee: Employee): Observable<any> {

    return this.http.put(this.api_url + '/' + employee.id, employee);
  }
}