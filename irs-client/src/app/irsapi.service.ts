import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class IrsapiService {

  serverUrl = 'http://127.0.0.1:8000/';
  apiName = 'irsapi';
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) { }

  getApiRecords(route: string) {
    return this.httpClient.get(`${this.serverUrl}${this.apiName}${route}`, {headers: this.getAuthHeaders()});
  }

  loginUser(authData) {
    const body = JSON.stringify(authData);
    // console.log(body);
    return this.httpClient.post(`${this.serverUrl}${'auth/'}`, body, {headers: this.headers});
  }

  getAuthHeaders() {
    const token = this.cookieService.get('irsapi-auth-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`
    });
  }
}
