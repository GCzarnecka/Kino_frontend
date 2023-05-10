import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../DataModel/User";
import {Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private  http: HttpClient) { }
  public login(email: string, password: string) : Observable<any> {
    console.log("login");
    console.log(email);
    console.log(password);


    return this.http.post(
      'http://localhost:8080/api/auth/login',
      {email, password});
      // {responseType: 'text'});
  }
  public register(user:User):Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/register',
      {...user}
);
      // ,
      // {responseType: 'text'});
  }


  // refreshAccessToken(): Observable<any> {
  //   // const refreshToken = localStorage.getItem('refreshToken');
  //
  //   // Make sure a refresh token is available
  //   // if (!refreshToken) {
  //   //   return throwError('No refresh token available');
  //   // }
  //
  //   return this.http.post('http://localhost:8080/logged/refreshToken', { refreshToken })
  //     .pipe(
  //       tap((response: any) => {
  //         // Save the new tokens to local storage
  //         localStorage.setItem('accessToken', response.accessToken);
  //         // localStorage.setItem('refreshToken', response.refreshToken);
  //       })
  //     );
  // }
}

