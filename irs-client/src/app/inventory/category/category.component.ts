import { Component, OnInit, ViewChild } from '@angular/core';
import { IrsapiService } from 'src/app/irsapi.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpParams } from '@angular/common/http';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { EditCategoryComponent } from './edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories: any = [];
  displayedColumns: string[] = ['category_id', 'category_name', 'category_discount', 'actions'];

  next: string;
  previous: string = null;
  lastFilter: any;
  @ViewChild('paginator') paginator;

  constructor(
    private irsApiService: IrsapiService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getData('/itemcategories');
  }

  getData(url: string){
    this.irsApiService.getApiRecords(url).subscribe(
      data => {
        this.categories = data;
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
    dialogConfig.data = this.categories.results;
    this.dialog.open(CreateCategoryComponent, dialogConfig);
    this.dialog.afterAllClosed.subscribe(
      () => {
        this.refresh();
      }
    );
    
  }

  deleteCategory(id){
    this.irsApiService.deleteRecord('itemcategories/', id).subscribe(response => {
      console.log(response);
      this._snackBar.open("Deleted category", "Dismiss", {
        duration: 2000,
      });
      this.refresh();
    });
  }

  editCategory(category){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width="600px";
    dialogConfig.data = category;
    this.dialog.open(EditCategoryComponent, dialogConfig);
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
      this.getData('/itemcategories/');
    }
    else{
      let params = new HttpParams().set('search', this.lastFilter);
      this.irsApiService.getApiRecords('/itemcategories/', params).subscribe(
        data => {
          console.log(data);
          this.categories = data;
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

  // applyFilter(event: Event){
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.lastFilter = filterValue;
  //   let params = new HttpParams().set('search', filterValue);
  //   this.irsApiService.getApiRecords('/itemcategories/', params).subscribe(
  //     data => {
  //       console.log(data);
  //       this.categories = data;
  //       if (data['next']) {
  //         // set the components next property here from the response
  //         this.next = data['next'];
  //         this.next = this.next.split('irsapi').pop();
  //         this.paginator._changePageSize(this.paginator.pageSize);
  //       }
  
  //       if (data['previous']) {
  //         // set the components previous property here from the response
  //         this.previous = data['previous'];
  //         this.previous = this.previous.split('irsapi').pop();
  //         this.paginator._changePageSize(this.paginator.pageSize);
  //       }
        
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );
  // }

}
