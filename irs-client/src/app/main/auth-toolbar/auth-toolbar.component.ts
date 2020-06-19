import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { IrsapiService } from 'src/app/irsapi.service';

@Component({
  selector: 'app-auth-toolbar',
  templateUrl: './auth-toolbar.component.html',
  styleUrls: ['./auth-toolbar.component.css']
})
export class AuthToolbarComponent implements OnInit {

  username: string;
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private irsApiService: IrsapiService) {

    this.irsApiService.getCurrentUser().subscribe(
      data => {
        console.log(data);
        this.username = data['username'];
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
    this.cookieService.get('irsapi-auth-token');
    
  }

  logout() {
    this.cookieService.delete('irsapi-auth-token');
    this.router.navigate(['/login']);
  }

}
