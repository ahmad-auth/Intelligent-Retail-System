import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthModule } from './auth/auth.module';
import { MainModule } from './main/main.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { EmployeesModule } from './employees/employees.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';

import { AppComponent } from './app.component';
import { StoresComponent } from './stores/stores.component';
import { StoresModule } from './stores/stores.module';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    MainModule,
    UsersModule,
    CustomersModule,
    EmployeesModule,
    InventoryModule,
    ReportsModule,
    StoresModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
