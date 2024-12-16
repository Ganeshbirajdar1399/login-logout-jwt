import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, retry, throwError } from 'rxjs';
import { LocalStorage } from '../constants/constant';
import { Router } from '@angular/router';

export const httpInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router)

  if(authService.isLoggedIn()){
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getUserToken()}`,
      },
    });
  }
  return next(req).pipe(
    retry(2),
    catchError((e: HttpErrorResponse)=>{
      if(e.status === 401){
        localStorage.removeItem(LocalStorage.token);
        router.navigate(['']);
      }
      const error = e.error.message || e.statusText;
      return throwError(()=> error)
    })
  )

};