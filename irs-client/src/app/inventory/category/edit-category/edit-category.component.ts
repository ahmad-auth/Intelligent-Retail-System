import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscardEditCategoryComponent } from './discard-edit-category/discard-edit-category.component';
import { IrsapiService } from 'src/app/irsapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public editCategoryForm: FormGroup;
  public name: string;
  public discount: number;
  public categoryData: any;
  wasFormChanged = false;
  constructor(private irsApiService: IrsapiService, private fb: FormBuilder,
    public dialog: MatDialog,private _snackBar: MatSnackBar
    , @Inject(MAT_DIALOG_DATA) data) {
      this.editCategoryForm = fb.group({
        category_name: [data.category_name, Validators.required],
        category_discount: [data.category_discount, Validators.required],
      });
      this.categoryData = data;
    }

  ngOnInit(): void {

    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    
  }

  openDialog(): void {
    if(this.editCategoryForm.dirty) {
      const dialogRef = this.dialog.open(DiscardEditCategoryComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }


  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  editCategory(){
    this.irsApiService.patchFormData('itemcategories/', this.editCategoryForm.value, this.categoryData.category_id).subscribe(
      data => {
        this.dialog.closeAll();
        this._snackBar.open("category changed", "Dismiss", {
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
