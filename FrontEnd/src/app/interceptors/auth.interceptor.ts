import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, 
         HttpHandler, HttpRequest} from '@angular/common/http';
import { Router } from '@angular/router';         
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


import { AuthService } from '@service/auth.service';


/** Pass untouched request through to the next request handler. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private router: Router){
  };

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError(e => {
        if(e.status==401){
          if(this.authService.isAuthenticated()){
//            this.authService.logout();
          }
          this.router.navigate(['/pbl/auth/login']);

        }

        if(e.status==403){
          this.router.navigate(['/pvt/dashboard']);

        }
        return throwError(e);
      })

    );
  }
}
