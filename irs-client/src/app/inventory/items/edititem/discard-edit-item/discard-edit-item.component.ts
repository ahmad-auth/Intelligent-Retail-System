import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-discard-edit-item',
  templateUrl: './discard-edit-item.component.html',
  styleUrls: ['./discard-edit-item.component.css']
})
export class DiscardEditItemComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private dialogRef: MatDialogRef<DiscardEditItemComponent>) {} // Closing dialog window
  ngOnInit(): void {}
    
  public cancel(): void { // To cancel the dialog window
    this.dialogRef.close();
  }
    
  public cancelN(): void { 
    this.dialog.closeAll();
  }

}
