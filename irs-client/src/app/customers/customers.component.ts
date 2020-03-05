import { Component, OnInit } from '@angular/core';

import { IrsapiService } from '../irsapi.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers: any = [];
  displayedColumns: string[] = ['customer_id', 'customer_name', 'registration_status', 'customer_address', 'customer_contact', 'customer_gender', 'actions'];

  constructor(
    private irsApiService: IrsapiService
  ) { }

  ngOnInit(): void {
    this.irsApiService.getApiRecords('/customers/').subscribe(
      data => {
        this.customers = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
