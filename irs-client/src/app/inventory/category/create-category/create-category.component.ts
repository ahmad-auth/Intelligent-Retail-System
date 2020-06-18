import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DiscardCreateCategoryComponent } from './discard-create-category/discard-create-category.component';
import { IrsapiService } from 'src/app/irsapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSelect } from '@angular/material/select';
import { FormControl } from '@angular/forms';
import { MatListOption } from '@angular/material/list';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public createCategoryForm: FormGroup;
  public name: string;
  public discount: number;
  wasFormChanged = false;
  constructor(private irsApiService: IrsapiService, private fb: FormBuilder,
    public dialog: MatDialog,private _snackBar: MatSnackBar) {
      this.createCategoryForm = fb.group({
        category_name: [this.name, Validators.required],
        category_discount: [this.discount, Validators.required],

      });
    }

  ngOnInit(): void {

    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
    
  }

  openDialog(): void {
    if(this.createCategoryForm.dirty) {
      const dialogRef = this.dialog.open(DiscardCreateCategoryComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }


  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  createCategory(){
    this.irsApiService.postFormData('itemcategories/', this.createCategoryForm.value).subscribe(
      data => {
        this.dialog.closeAll();
        this._snackBar.open("Successfully category added", "Dismiss", {
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
