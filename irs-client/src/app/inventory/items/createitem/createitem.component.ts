import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DiscardFormComponent } from './discard-form/discard-form.component';
import { IrsapiService } from 'src/app/irsapi.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-createitem',
  templateUrl: './createitem.component.html',
  styleUrls: ['./createitem.component.css']
})
export class CreateitemComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public createItemForm: FormGroup;
  public code: string;
  public title: string;
  public price:number;
  public company: string;
  public discount: number;
  public category: string;
  wasFormChanged = false;
  constructor(private irsApiService: IrsapiService, private fb: FormBuilder,
    public dialog: MatDialog,private _snackBar: MatSnackBar) {
      this.createItemForm = fb.group({
        item_code: [this.code, Validators.required],
        item_title: [this.title, Validators.required],
        item_price: [this.price, Validators.required],
        item_company: [this.company,Validators.required],
        item_discount: [this.discount,Validators.required],
        item_catrgory: [this.category, Validators.required]
    });
    }

  ngOnInit(): void {

    this.breakpoint = window.innerWidth <= 600 ? 1 : 2;
  }

  openDialog(): void {
    console.log(this.wasFormChanged);
    if(this.createItemForm.dirty) {
      const dialogRef = this.dialog.open(DiscardFormComponent, {
        width: '340px',
      });
    } else {
      this.dialog.closeAll();
    }
  }


  public onResize(event: any): void {
    this.breakpoint = event.target.innerWidth <= 600 ? 1 : 2;
  }

  createItem(){
    console.log(this.createItemForm.value);
    this.irsApiService.postFormData('items/', this.createItemForm.value).subscribe(
      data => {
        console.log(data);
        this.dialog.closeAll();
        this._snackBar.open("Successfully item added", "Dismiss", {
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
    // tslint:disable-next-line:forin
    for (const i in group.controls) {
      group.controls[i].markAsDirty();
    }
  }

  formChanged() {
    this.wasFormChanged = true;
  }

}
