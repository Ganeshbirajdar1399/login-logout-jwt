import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import {
  ApiResponse,
  LoginPayload,
  RegisterPayload,
  Student,
} from '../model/commen.model';
import { ApiEndpoint, LocalStorage } from '../constants/constant';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  isLoggedIn = signal<boolean>(false);
router = inject(Router);


  constructor(private _http: HttpClient) {
    if(this.getUserToken()){
      this.isLoggedIn.update(()=> true);
    }
  }

  register(payload: RegisterPayload): Observable<any> {
    return this._http.post<ApiResponse<Student>>(
      `${ApiEndpoint.Auth.Register}`,
      payload
    );
  }

  login(payload: LoginPayload): Observable<ApiResponse<Student>> {
    return this._http
      .post<ApiResponse<Student>>(`${ApiEndpoint.Auth.Login}`, payload)
      .pipe(
        map((response) => {
          if (response.status && response.token) {
            localStorage.setItem(LocalStorage.token, response.token);
            this.isLoggedIn.update(()=> true);
          }
          return response;
        }),
        catchError((error) => {
                console.error('Login error:', error); // Log the error
                return throwError(() => new Error('Failed to log in')); // Re-throw with a user-friendly message
              })
      );
  }

  //-----------------SPARE CODE--------------------

  // login(payload: LoginPayload): Observable<ApiResponse<Student>> {
  //   return this._http.post<ApiResponse<Student>>(`${ApiEndpoint.Auth.Login}`, payload).pipe(
  //     map((response) => {
  //       if (response.status && response.token) {
  //         // Save token to local storage
  //         localStorage.setItem(LocalStorage.token, response.token);
  //       }
  //       return response; // Return the response for further use in components
  //     }),
  //     catchError((error) => {
  //       console.error('Login error:', error); // Log the error
  //       return throwError(() => new Error('Failed to log in')); // Re-throw with a user-friendly message
  //     })
  //   );
  // }

  //-----------------END SPARE CODE---------------------

  me(): Observable<any> {
    return this._http.get<ApiResponse<Student>>(`${ApiEndpoint.Auth.Me}`);
  }

  getUserToken(){
return localStorage.getItem(LocalStorage.token);
  };

  logOut(){
    localStorage.removeItem(LocalStorage.token);
    this.isLoggedIn.update(()=> false);
    this.router.navigate(['student']);
  }
}
