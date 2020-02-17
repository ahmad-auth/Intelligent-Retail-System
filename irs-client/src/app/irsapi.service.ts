import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class IrsapiService {

  apiUrl = 'http://127.0.0.1:8000/';
  apiName = 'irsapi';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  // getUsers() {
  //   return this.httpClient.get(`${this.apiUrl}${this.apiName}${'/users/'}`, {headers: this.headers});
  // }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    // console.log(body);
    return this.httpClient.post(`${this.apiUrl}${'auth/'}`, body, {headers: this.headers});
  }

  getAuthHeaders() {
    const token = this.cookieService.get('irsapi-auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
