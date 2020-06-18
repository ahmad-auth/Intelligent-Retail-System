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
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSelectModule } from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import { MatListModule } from '@angular/material/list';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { IrsapiService } from '../irsapi.service';

import { ItemsComponent } from './items/items.component';
import {MainModule} from '../main/main.module';
import { CreateitemComponent } from './items/createitem/createitem.component';
import { DiscardFormComponent } from './items/createitem/discard-form/discard-form.component';
import { EdititemComponent } from './items/edititem/edititem.component';
import { DiscardEditItemComponent } from './items/edititem/discard-edit-item/discard-edit-item.component';
import { InventoryComponent } from './inventory.component';
import { InventoryDashboardComponent } from './inventory-dashboard/inventory-dashboard.component';
import { CategoryComponent } from './category/category.component';
// import { CreateitemComponent } from './items/createitem/createitem.component';
// import { DeleteComponent } from './items/createitem/delete/delete.component';

const routes: Routes = [
{path: 'inventory/items', component: ItemsComponent, /*outlet: 'dashboard-outlet'*/}
];


@NgModule({
  declarations: [
    InventoryComponent, 
    ItemsComponent, 
    CreateitemComponent, 
    DiscardFormComponent, 
    EdititemComponent, 
    DiscardEditItemComponent, InventoryDashboardComponent, CategoryComponent,
  ],
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
    MatGridListModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSelectModule,
    FormsModule,
    MatListModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MainModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    IrsapiService
  ],
  entryComponents: [InventoryComponent]
})
export class InventoryModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
