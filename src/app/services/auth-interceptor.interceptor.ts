// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
// import { catchError, switchMap } from 'rxjs/operators';
// import { throwError, Observable, BehaviorSubject } from 'rxjs';
// import { AuthService } from './auth.service';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//
//   private isRefreshing = false;
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//
//   constructor(private authService: AuthService) { }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
//
//     // Add authorization token to headers
//     const token = this.authService.getAccessToken();
//     if (token) {
//       request = this.addTokenToRequest(request, token);
//     }
//
//     return next.handle(request).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Unauthorized - try to refresh token
//           return this.handle401Error(request, next);
//         }
//         return throwError(error);
//       })
//     );
//   }
//
//   private addTokenToRequest(request: HttpRequest<any>, token: string) {
//     return request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }
//
//   private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.isRefreshing) {
//       this.isRefreshing = true;
//       this.refreshTokenSubject.next(null);
//
//       return this.authService.refreshAccessToken().pipe(
//         switchMap((newToken: any) => {
//           this.isRefreshing = false;
//           this.refreshTokenSubject.next(newToken.access_token);
//           return next.handle(this.addTokenToRequest(request, newToken.access_token));
//         }),
//         catchError((error) => {
//           this.isRefreshing = false;
//           this.authService.logout();
//           return throwError(error);
//         })
//       );
//     } else {
//       return this.refreshTokenSubject.pipe(
//         switchMap((token: any) => {
//           if (token) {
//             return next.handle(this.addTokenToRequest(request, token));
//           } else {
//             this.authService.logout();
//             return throwError('User session has expired');
//           }
//         })
//       );
//     }
//   }
// }


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {

    // Add authorization token to headers
    const token = localStorage.getItem('authToken');
    if (token) {
      console.log("token: " + token);
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+ token
        }
      });
      console.log("request: " + request.toString());
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 403) {
          // Unauthorized - handle error or redirect to login page
          console.log('Unauthorized');
        }
        else
          console.log('Error'+ error.status);
        return throwError(error);
      })
    );
  }
}
