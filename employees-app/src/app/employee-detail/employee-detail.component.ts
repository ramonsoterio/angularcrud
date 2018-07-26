import { Component, OnInit, Input, ViewChild, Output } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  titleAction: string = 'Empregado';

  employee: Employee;
  employee$: Observable<Employee>;

  private isEditing: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    if (id > 0) {
      this.getEmployee(id);
      this.isEditing = true;
    } else {
      this.employee = new Employee();
    }
  }

  add() {
    this.employeeService.addEmployee(this.employee)
      .subscribe(
        result => {
          console.log('Sucesso');
        },
        error => {
          console.log(error);
        }
      )
  }

  update() {
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

  updateEmployee() {
    if (this.isEditing) {
      this.update();
    } else {
      this.add();
    }
  }

  getEmployee(id: any) {
    this.employeeService.getEmployee(id)
      .subscribe(
        result => {
          this.employee = result;
          console.log("Empregado identificado com sucesso.");
        },
        error => {
          console.log('Erro ao buscar os dados do empregado.');
        }
      )
  }

  goToEmployees() {
    this.router.navigate(['/employees']);
  }
}
