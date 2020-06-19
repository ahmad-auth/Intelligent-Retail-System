import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { HttpParams } from '@angular/common/http';
import { IrsapiService } from 'src/app/irsapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateStoreComponent } from './create-store/create-store.component'
import { EditStoreComponent } from './edit-store/edit-store.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  stores: any;
  next: any;
  previous: any;
  @ViewChild('paginator') paginator;
  lastFilter: any;

  displayedColumns: string[] = ['store_id', 'store_key', 'creation_date', 'store_title', 'store_location', 'created_by_id', 'store_manager_id', 'actions'];



  constructor(
    private irsApiService: IrsapiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData('/stores/');
  }

  getData(url: string){
    this.irsApiService.getApiRecords(url).subscribe(
      data => {
        this.stores = data;
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

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="600px";
    //dialogConfig.data = this.categories.results;
    this.dialog.open(CreateStoreComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.refresh();
      }
    );
    
  }

  deleteStore(id){
    console.log(id);
    this.irsApiService.deleteRecord('stores/', id).subscribe(response => {
      console.log(response);
      this._snackBar.open("Deleted store", "Dismiss", {
        duration: 2000,
      });
      this.refresh();
    });
  }

  editStore(store){
    console.log(store);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="600px";
    dialogConfig.data = {
      //categories: this.categories.results, 
      store: store
    };
    this.dialog.open(EditStoreComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.refresh();
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

  

  refresh(){
    if(this.lastFilter == null){
      this.getData('/stores/');
    }
    else{
      let params = new HttpParams().set('search', this.lastFilter);
      this.irsApiService.getApiRecords('/stores/', params).subscribe(
        data => {
          console.log(data);
          this.stores = data;
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
    this.irsApiService.getApiRecords('/stores/', params).subscribe(
      data => {
        console.log(data);
        this.stores = data;
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
