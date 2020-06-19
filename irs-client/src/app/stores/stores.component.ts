import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthToolbarComponent } from '../main/auth-toolbar/auth-toolbar.component';
import { SidebarComponent } from '../main/sidebar/sidebar.component';
import { StoresDashboardComponent } from './stores-dashboard/stores-dashboard.component';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('irsapi-auth-token');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      // this.router.navigate([{outlets: {dashboardOutlet: '/dashboard'}}]);
      // this.router.navigate(['/dashboard']);
    }
  }

}
