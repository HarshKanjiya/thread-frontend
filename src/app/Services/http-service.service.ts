import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  readonly uri = "http://localhost:3000/"

  constructor(private http: HttpClient) { }
  get(path: string) {
    return this.http.get(this.uri + path)
  }
  post(path: string, payload: any) {
    return this.http.post(this.uri + path, payload)
  }
  put(path: string, payload: any) {
    return this.http.post(this.uri + path, payload)
  }
  patch(path: string, payload: any) {
    return this.http.post(this.uri + path, payload)
  }
  delete(path: string) {

    return this.http.delete(this.uri + path)
  }
}
