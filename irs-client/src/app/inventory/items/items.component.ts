import { Component, OnInit, ViewChild } from '@angular/core';

import { IrsapiService } from '../../irsapi.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: any = [];
  displayedColumns: string[] = ['item_id', 'item_code', 'item_title', 'item_price', 'item_company', 'item_discount', 'item_category_name', 'actions'];

  next: string;
  previous: string = null;
  @ViewChild('paginator') paginator;

  constructor(
    private irsApiService: IrsapiService
  ) { }

  ngOnInit(): void {
    this.getData('/items/');
  }

  getData(url: string){
    this.irsApiService.getApiRecords(url).subscribe(
      data => {
        console.log(data);
        this.items = data;
        if (data['next']) {
          // set the components next property here from the response
          this.next = data['next'];
          this.next = this.next.split('irsapi').pop();
        }
  
        if (data['previous']) {
          // set the components previous property here from the response
          this.previous = data['previous'];
          this.previous = this.previous.split('irsapi').pop();
        }
        
        this.paginator._changePageSize(this.paginator.pageSize);
      },
      error => {
        console.log(error);
      }
    );
  }

  getNext(){
    this.getData(this.next);
  }

  getPrevious(){
    this.getData(this.previous);
  }

  paginatorEvent(event: any){
    if(event.previousPageIndex > event.pageIndex) {

      console.log('Previous');
      this.getPrevious();
    } else {
      console.log(this.next);
      this.getNext();
    }
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    let params = new HttpParams().set('search', filterValue);
    this.irsApiService.getApiRecords('/items/', params).subscribe(
      data => {
        console.log(data);
        this.items = data;
        if (data['next']) {
          // set the components next property here from the response
          this.next = data['next'];
          this.next = this.next.split('irsapi').pop();
        }
  
        if (data['previous']) {
          // set the components previous property here from the response
          this.previous = data['previous'];
          this.previous = this.previous.split('irsapi').pop();
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }
  
}
