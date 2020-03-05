import { Component, OnInit } from '@angular/core';

import { IrsapiService } from '../irsapi.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: any = [];
  displayedColumns: string[] = ['id', 'username', 'actions'];

  constructor(
    private irsApiService: IrsapiService
  ) { }

  ngOnInit(): void {
    this.irsApiService.getApiRecords('/users/').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
