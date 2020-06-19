import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IrsapiService } from '../irsapi.service';
import { RouterModule, Routes } from '@angular/router';
import { StoresDashboardComponent } from './stores-dashboard/stores-dashboard.component';
import { StoresComponent } from './stores.component';
import { MainModule } from '../main/main.module';
import { StoreComponent } from './store/store.component';
import { CreateStoreComponent } from './store/create-store/create-store.component';
import { EditStoreComponent } from './store/edit-store/edit-store.component';
import { CreateStoreDiscardComponent } from './store/create-store/create-store-discard/create-store-discard.component';
import { EditStoreDiscardComponent } from './store/edit-store/edit-store-discard/edit-store-discard.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';

const routes: Routes = [
  { path: 'stores/store', component: StoreComponent },
  //{ path: 'inventory/category', component: CategoryComponent }
];

@NgModule({

  declarations: [StoresComponent, StoresDashboardComponent, StoreComponent, CreateStoreComponent, EditStoreComponent, CreateStoreDiscardComponent, EditStoreDiscardComponent],
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
})
export class StoresModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

 }
