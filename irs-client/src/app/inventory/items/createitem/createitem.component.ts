import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DiscardFormComponent } from './discard-form/discard-form.component';

@Component({
  selector: 'app-createitem',
  templateUrl: './createitem.component.html',
  styleUrls: ['./createitem.component.css']
})
export class CreateitemComponent implements OnInit {

  public breakpoint: number; // Breakpoint observer code
  public createItemForm: FormGroup;
  wasFormChanged = false;
  constructor(private fb: FormBuilder,
    public dialog: MatDialog) { }

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
    console.log('CREATE');
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
