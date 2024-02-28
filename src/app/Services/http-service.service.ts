import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from '../Utils/Endpoints';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly uri = BaseURL;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.cookie.get("AccessToken")

  });

  constructor(private http: HttpClient, private cookie: CookieService) {}

  get(path: string) {
    return this.http.get(this.uri + path, { headers: this.headers, withCredentials: true })
  }
  post(path: string, payload: any) {
    return this.http.post(this.uri + path, payload, { headers: this.headers,withCredentials:true })
  }
  put(path: string, payload: any) {
    return this.http.put(this.uri + path, payload, { headers: this.headers ,withCredentials:true })
  }
  patch(path: string, payload: any) {
    return this.http.post(this.uri + path, payload, { headers: this.headers,withCredentials:true  })
  }
  delete(path: string) {

    return this.http.delete(this.uri + path, { headers: this.headers,withCredentials:true  })
  }
}
