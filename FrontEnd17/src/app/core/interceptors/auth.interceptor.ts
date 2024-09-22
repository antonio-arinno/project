import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);

  return next(req).pipe(catchError((e: HttpErrorResponse) => {
      if (e.status == 401) {
        console.log('interceptor');
        console.log(e.message);
        router.navigate(['/auth/login']);
      }
      if (e.status == 403) {
        router.navigate(['/pvt/dashboard']);
      }

      return throwError(() => e);
    })
  )
};
