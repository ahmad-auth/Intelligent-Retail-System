import { Component, OnInit, ViewChild } from '@angular/core';

import { IrsapiService } from '../../irsapi.service';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateitemComponent } from './createitem/createitem.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  categories: any;
  lastFilter: any;
  @ViewChild('paginator') paginator;

  constructor(
    private irsApiService: IrsapiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData('/items/');
    this.irsApiService.getApiRecords('/itemcategories/').subscribe(
      data => {
        console.log(data);
        this.categories = data;
      },
      error => {
        console.log(error);
      }
    );
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

  deleteItem(id){
    console.log(id);
    this.irsApiService.deleteRecord('items/', id).subscribe(response => {
      console.log(response);
      this._snackBar.open("Deleted item", "Dismiss", {
        duration: 2000,
      });
      this.refresh();
    });
  }

  getNext(){
    this.getData(this.next);
  }

  getPrevious(){
    this.getData(this.previous);
  }

  paginatorEvent(event: any){

    if(event.previousPageIndex == event.pageIndex){
      return;
    }
    if(event.previousPageIndex > event.pageIndex) {

      console.log('Previous');
      this.getPrevious();
    } else {
      console.log(this.next);
      this.getNext();
    }
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="600px";
    dialogConfig.data = this.categories.results;
    this.dialog.open(CreateitemComponent, dialogConfig);
    
  }

  refresh(){
    if(this.lastFilter == null){
      this.getData('/items/');
    }
    else{
      let params = new HttpParams().set('search', this.lastFilter);
      this.irsApiService.getApiRecords('/items/', params).subscribe(
        data => {
          console.log(data);
          this.items = data;
          if (data['next']) {
            // set the components next property here from the response
            this.next = data['next'];
            this.next = this.next.split('irsapi').pop();
            this.paginator._changePageSize(this.paginator.pageSize);
          }
    
          if (data['previous']) {
            // set the components previous property here from the response
            this.previous = data['previous'];
            this.previous = this.previous.split('irsapi').pop();
            this.paginator._changePageSize(this.paginator.pageSize);
          }
          
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.lastFilter = filterValue;
    let params = new HttpParams().set('search', filterValue);
    this.irsApiService.getApiRecords('/items/', params).subscribe(
      data => {
        console.log(data);
        this.items = data;
        if (data['next']) {
          // set the components next property here from the response
          this.next = data['next'];
          this.next = this.next.split('irsapi').pop();
          this.paginator._changePageSize(this.paginator.pageSize);
        }
  
        if (data['previous']) {
          // set the components previous property here from the response
          this.previous = data['previous'];
          this.previous = this.previous.split('irsapi').pop();
          this.paginator._changePageSize(this.paginator.pageSize);
        }
        
      },
      error => {
        console.log(error);
      }
    );
  }
  
}
