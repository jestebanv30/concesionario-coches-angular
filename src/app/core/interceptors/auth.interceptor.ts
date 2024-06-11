import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import {inject } from '@angular/core';
import { TokenService } from '../service/token.service';
import { catchError, Observable, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const tokenService = inject(TokenService);
  console.log('Entre al interceptor');

  const token = tokenService.getToken();
  console.log(token);

  if (!token) {
    return next(req);
  }

  const headers = {
    'Authorization': `Bearer ${token}`
  };

  const authRequest = req.clone({
    setHeaders: headers
  });

  console.log(authRequest);

  return next(authRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 403) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes permisos para acceder a esta página'
        });
      }
      return throwError(() => err);
    })
  );
};
