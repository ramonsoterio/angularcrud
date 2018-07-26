import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from '../employee.service';
import { Employee } from '../Employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [ EmployeeService ]
})
export class EmployeeListComponent implements OnInit {
  
  employees$: Observable<Employee[]>;
  employeesDisplay: Employee[];
  currentEmployee: Employee;
  
  constructor(private employeeService: EmployeeService) { }

  getEmployees(): void {
    this.employees$ = this.employeeService.getEmployees();

    this.employees$.subscribe(
      (e : Employee[]) => {
        this.employeesDisplay = e;
      }
    );
  }

  getEmployee(e: Employee) {
    this.employeeService.getEmployee(e.id)
      .subscribe(
        result => {
          this.currentEmployee = result;
        },
        error => {
          alert('Erro ao buscar os dados do empregado ' + e.id);
        }
      )
  }

  remove(e: Employee) {
    this.employeeService.removeEmployee(e.id)
      .subscribe(
        result => {
          console.log(result)
          var index = this.employeesDisplay.indexOf(e);
          this.employeesDisplay.splice(index, 1);
        },
        error => {
          console.log(error);
        }
      )
  }

  updateEmployeeList(employee: any) {
    this.employeesDisplay.push(employee);
  }

  ngOnInit() {
    this.getEmployees();
  }

}
