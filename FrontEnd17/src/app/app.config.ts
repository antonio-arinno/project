import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors, ɵHTTP_ROOT_INTERCEPTOR_FNS } from '@angular/common/http';
import { tokenInterceptor } from '@core/interceptors/token.interceptor';
import { authInterceptor } from '@core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), 
              provideAnimationsAsync(),
              provideHttpClient(withInterceptors([tokenInterceptor, authInterceptor]))
            ]
};
