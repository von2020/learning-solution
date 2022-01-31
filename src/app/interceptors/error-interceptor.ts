import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err) {
          console.log(err);
        }
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout();
          this.router.navigate(['/login']);
          this.toastr.info(
            'Please Log back in to Continue',
            'Session Expired',
            {
              timeOut: 3000,
            }
          );
          // location.reload(true);
          console.log(err);
        }
        if (err.status === 0) {
          // alert("An Error Occured");
          this.toastr.error('An Error Occured, Please try again', 'Error', {
            timeOut: 3000,
          });
        }

        const error = err || err.title || err.error.message || err.statusText;
        return throwError(error);
        // return throwError(err);
      })
    );
  }
}
