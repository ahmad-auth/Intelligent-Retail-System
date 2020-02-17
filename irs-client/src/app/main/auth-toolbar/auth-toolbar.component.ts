import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-toolbar',
  templateUrl: './auth-toolbar.component.html',
  styleUrls: ['./auth-toolbar.component.css']
})
export class AuthToolbarComponent implements OnInit {

  constructor(
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cookieService.get('irsapi-auth-token');
  }

  logout() {
    this.cookieService.delete('irsapi-auth-token');
    this.router.navigate(['/auth']);
  }

}
