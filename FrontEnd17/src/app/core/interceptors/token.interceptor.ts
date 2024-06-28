import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/services/auth.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  let token = authService.token;

  if(token != null){
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });     
    return next(authReq);
  }
  return next(req);
};
