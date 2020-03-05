import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { IrsapiService } from '../irsapi.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  errorStatement;

  constructor(
    private irsapiService: IrsapiService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  users: any = [];

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    const token = this.cookieService.get('irsapi-auth-token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  tryAuth() {
    if (!this.authForm.invalid) {
      this.errorStatement = '';
      this.irsapiService.loginUser(this.authForm.value).subscribe(
        (result: TokenType) => {
          // console.log(result);
          this.cookieService.set('irsapi-auth-token', result.token);
          this.router.navigate(['/home']);
        },
        error => {
          this.errorStatement = 'USERNAME OF PASSWORD IS INCORRECT';
          console.log(error.toLocaleString());
        }
      );
      // console.log(this.authForm.value);
    } else {
      this.errorStatement = 'INVALID USERNAME OR PASSWORD ';
      console.log('Form field values are invalid.');
    }
  }

}

// Interface for the result of 'loginUser()' method of 'irsapiService'
// 'loginUser()' method will return a string containing the 'token'
interface TokenType {
  token: string;
}
