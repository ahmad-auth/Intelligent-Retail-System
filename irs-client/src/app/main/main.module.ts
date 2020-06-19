import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { MainComponent } from './main.component';
import { AuthToolbarComponent } from './auth-toolbar/auth-toolbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UsersComponent } from '../users/users.component';
import { CustomersComponent } from '../customers/customers.component';
import { EmployeesComponent } from '../employees/employees.component';
import { ItemsComponent } from '../inventory/items/items.component';

import {AppComponent} from '../app.component';
import { SalesForecastComponent } from '../reports/sales-forecast/sales-forecast.component';
import { InventoryComponent } from '../inventory/inventory.component';
import { StoresComponent } from '../stores/stores.component';


const routes: Routes = [
  {path: 'home', component: MainComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'stores', component: StoresComponent},
  {path: 'users', component: UsersComponent},
  {path: 'customers', component: CustomersComponent},
  {path: 'employees', component: EmployeesComponent},
  {path: 'inventory', component: InventoryComponent},
  {path: 'reports', component: SalesForecastComponent}
];

@NgModule({
  declarations: [
    MainComponent,
    AuthToolbarComponent,
    DashboardComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    FontAwesomeModule,
    MatIconModule,
    MatGridListModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    SidebarComponent,
    AuthToolbarComponent,
  ]
})
export class MainModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
