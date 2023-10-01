import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '@service/auth.service';

export const authenticationGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const routerService = inject(Router);

  if(authService.isAuthenticated()){
    if(authService.isTokenExpired()){
        authService.logout();
        routerService.navigate(['/pbl/auth/login']);
        return false;
    }
    return true;
  }
  routerService.navigate(['/pbl/auth/login']);
  return false;

};
