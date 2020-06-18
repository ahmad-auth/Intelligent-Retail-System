import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { DiscardCreateCategoryComponent } from '../../create-category/discard-create-category/discard-create-category.component';

@Component({
  selector: 'app-discard-edit-category',
  templateUrl: './discard-edit-category.component.html',
  styleUrls: ['./discard-edit-category.component.css']
})
export class DiscardEditCategoryComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private dialogRef: MatDialogRef<DiscardCreateCategoryComponent>) {} // Closing dialog window
  ngOnInit(): void {}
    
  public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
  }
  
  public cancelN(): void { 
    this.dialog.closeAll();
  }

}
