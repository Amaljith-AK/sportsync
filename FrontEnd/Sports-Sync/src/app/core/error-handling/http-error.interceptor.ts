import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

const SERVER_ERROR_ROUTE = '/server-error';

/**
 * Routes to the friendly "Server Issue" page whenever an API call comes
 * back with a 5xx status, in addition to letting the error keep flowing
 * to whatever subscribed to the request (so loading state still clears
 * and callers can still log/react to it).
 *
 * Also covers the way back: if a "Try Again" click or a manual browser
 * refresh on the server-error page re-fires the API calls and one comes
 * back clean, that means the outage is over, so send the user to the
 * home page instead of leaving them stuck on the error screen.
 */
export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse && router.url.startsWith(SERVER_ERROR_ROUTE)) {
        void router.navigate(['/']);
      }
    }),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse && error.status >= 500) {
        void router.navigate([SERVER_ERROR_ROUTE]);
      }
      return throwError(() => error);
    }),
  );
};
