import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthToolbarComponent } from '../main/auth-toolbar/auth-toolbar.component';
import { SidebarComponent } from '../main/sidebar/sidebar.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = this.cookieService.get('irsapi-auth-token');
    /*if (!token) {
      this.router.navigate(['/login']);
    } else {
      // this.router.navigate([{outlets: {dashboardOutlet: '/dashboard'}}]);
      // this.router.navigate(['/dashboard']);
    }*/
  }

}
