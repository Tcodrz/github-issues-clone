import { SessionStorageService, UserDetails } from './../../services/session-storage.service';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { LoaderService } from '../../services/loader.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  userDetails: UserDetails;

  constructor(
    private loader: LoaderService,
    private errorHandler: ErrorHandlerService,
    private sessionStorage: SessionStorageService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    this.userDetails = this.sessionStorage.getUserDetails();

    if (request.method === 'GET' || request.method === 'PATCH' || request.method === 'POST') {
      this.loader.isLoading(true);
    }

    const req = request.clone(
      { headers: request.headers.set('Authorization', `token ${this.userDetails.token}`) }
    );

    return next.handle(req).pipe( 
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          this.loader.isLoading(false);
        }
      }),
      catchError((err) => {
        this.loader.isLoading(false);
        if (err instanceof HttpErrorResponse) {
          this.errorHandler.setAppError(err.error.message, err.status);
        }
        return throwError(err);
      })
    );
  }
}
