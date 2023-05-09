import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private url = "http://localhost:8080/api/";

  private httpOptions = {
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  get <T>(path: string, params: any = null) {
    const httpParams = new HttpParams({fromObject: params});
    return this.http.get<T>(this.url + path, {params: httpParams});
  }

  post <T>(path: string, body: any) {
    return this.http.post<T>(this.url + path, body);
  }
}
