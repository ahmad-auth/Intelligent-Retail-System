import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {MatTableModule} from '@angular/material/table';

import { IrsapiService } from '../irsapi.service';

import { UsersComponent } from './users.component';
import {MainComponent} from '../main/main.component';

const routes: Routes = [
  {path: 'users', component: UsersComponent, outlet: 'dashboard-outlet'}
];

@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    IrsapiService
  ]
})
export class UsersModule { }
