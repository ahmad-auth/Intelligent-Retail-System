import { Component, OnInit } from '@angular/core';

import { IrsapiService } from '../irsapi.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: any = [];
  displayedColumns: string[] = ['employee_id', 'employee_name', 'date_of_joining', 'employment_status', 'designation', 'employee_age', 'pay_grade', 'hired_by_id', 'actions'];

  constructor(
    private irsApiService: IrsapiService
  ) { }

  ngOnInit(): void {
    this.irsApiService.getApiRecords('/employees/').subscribe(
      data => {
        this.employees = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
