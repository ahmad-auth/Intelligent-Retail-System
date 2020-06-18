import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscardEditItemComponent } from './discard-edit-item/discard-edit-item.component';
import { IrsapiService } from 'src/app/irsapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-edititem',
  templateUrl: './edititem.component.html',
  styleUrls: ['./edititem.component.css']
})
export class EdititemComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public editItemForm: FormGroup;
  public code: string;
  public title: string;
  public price:number;
  public company: string;
  public discount: number;
  public category: any;
  public selectedValue: any;
  public categories: any;
  public itemData: any;
  wasFormChanged = false;
  constructor(private irsApiService: IrsapiService, private fb: FormBuilder,
    public dialog: MatDialog,private _snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) data) {
      this.editItemForm = fb.group({
        item_code: [data.item.item_code, Validators.required],
        item_title: [data.item.item_title, Validators.required],
        item_price: [data.item.item_price, Validators.required],
        item_company: [data.item.item_company,Validators.required],
        item_discount: [data.item.item_discount,Validators.required],
        item_category: [data.item.item_category.category_id, Validators.required]
      });
      this.itemData = data.item.item_id;
      this.categories = data.categories;
    }

  ngOnInit(): void {

    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    
  }

  openDialog(): void {
    if(this.editItemForm.dirty) {
      const dialogRef = this.dialog.open(DiscardEditItemComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }


  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  editItem(){
    console.log(this.itemData);
    this.irsApiService.putFormData('items/', this.editItemForm.value, this.itemData).subscribe(
      data => {
        this.dialog.closeAll();
        this._snackBar.open("Item changed", "Dismiss", {
          duration: 2000,
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  private markAsDirty(group: FormGroup): void {
    group.markAsDirty();
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

}
