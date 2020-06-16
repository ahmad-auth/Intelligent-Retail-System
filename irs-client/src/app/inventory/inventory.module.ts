import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';

import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { IrsapiService } from '../irsapi.service';

import { ItemsComponent } from './items/items.component';
import {MainModule} from '../main/main.module';
// import { CreateitemComponent } from './items/createitem/createitem.component';
// import { DeleteComponent } from './items/createitem/delete/delete.component';

const routes: Routes = [
  {path: 'inventory', component: ItemsComponent, outlet: 'dashboard-outlet'}
];


@NgModule({
  declarations: [ItemsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    MatPaginatorModule,
    MatDialog,
    MatDialogRef,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MainModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    IrsapiService
  ]
})
export class InventoryModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
