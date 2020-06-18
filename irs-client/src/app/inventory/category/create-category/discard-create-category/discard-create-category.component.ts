import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-discard-create-category',
  templateUrl: './discard-create-category.component.html',
  styleUrls: ['./discard-create-category.component.css']
})
export class DiscardCreateCategoryComponent implements OnInit {

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
