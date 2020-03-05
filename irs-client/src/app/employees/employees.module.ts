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

import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { IrsapiService } from '../irsapi.service';

import { EmployeesComponent } from './employees.component';
import {MainModule} from '../main/main.module';

const routes: Routes = [
  {path: 'employees', component: EmployeesComponent, outlet: 'dashboard-outlet'}
];

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    MatTableModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
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
export class EmployeesModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }
}
