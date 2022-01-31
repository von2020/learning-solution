import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { ErrorInterceptor } from './error-interceptor';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorInterceptor,
    multi: true,
  },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
];
