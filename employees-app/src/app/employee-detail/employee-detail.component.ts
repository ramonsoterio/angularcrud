import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { EventEmitter } from '../../../node_modules/protractor';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  titleAction: string = 'Editar empregado';
  isEditing: boolean

  @Input() employee: Employee;

  constructor(private employeeService : EmployeeService) { }

  ngOnInit() {
    this.isEditing = true;
  }

  addEmployee() {
    this.employeeService.addEmployee(this.employee)
      .subscribe(
        result => {
          console.log('Sucesso: ' + result)
        },
        error => {
          console.log(error);
        }
      )
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.employee)
      .subscribe(
        result => {
          console.log('Sucesso: ' + result);
        },
        error => {
          console.log(error);
        }
      )
  }
}
