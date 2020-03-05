import { Component, OnInit } from '@angular/core';

import { IrsapiService } from '../../irsapi.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any = [];
  displayedColumns: string[] = ['item_id', 'item_code', 'item_title', 'item_price', 'item_company', 'item_discount', 'item_category_id', 'actions'];

  constructor(
    private irsApiService: IrsapiService
  ) { }

  ngOnInit(): void {
    this.irsApiService.getApiRecords('/items/').subscribe(
      data => {
        this.items = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
