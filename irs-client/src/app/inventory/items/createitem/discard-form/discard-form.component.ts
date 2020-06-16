import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-discard-form',
  templateUrl: './discard-form.component.html',
  styleUrls: ['./discard-form.component.css']
})
export class DiscardFormComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private dialog: MatDialog, private dialogRef: MatDialogRef<DiscardFormComponent>) {} // Closing dialog window
  ngOnInit(): void {
    
  }
    
    public cancel(): void { // To cancel the dialog window
      this.dialogRef.close();
    }
    
    public cancelN(): void { 
      this.dialog.closeAll();
    }

}
