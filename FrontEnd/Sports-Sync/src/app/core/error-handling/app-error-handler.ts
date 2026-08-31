import { ErrorHandler, Injectable, Injector, inject } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Catches otherwise-uncaught runtime errors and routes to the friendly
 * "Server Issue" page instead of leaving a blank/broken screen. Errors are
 * still logged to the console for diagnostics.
 *
 * Router is fetched lazily via Injector (rather than constructor-injected)
 * to avoid a circular dependency during app bootstrap.
 */
@Injectable()
export class AppErrorHandler implements ErrorHandler {
  private readonly injector = inject(Injector);

  handleError(error: unknown): void {
    console.error(error);
    const router = this.injector.get(Router);
    void router.navigate(['/server-error']);
  }
}
