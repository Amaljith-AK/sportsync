import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { AdminAuthService } from '../../core/services/auth.service';

/** Keeps a direct visit to /admin honest even if it wasn't reached via the gear icon.
 * A hard refresh lands here before AdminAuthService's own startup re-verify has had
 * a chance to resolve, so fall back to re-checking the stored key directly. */
export const adminAuthGuard: CanActivateFn = () => {
  const auth = inject(AdminAuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  const key = auth.getkey();
  if (!key) return router.parseUrl('/admin/login');

  return auth.login(key).pipe(map((valid) => valid || router.parseUrl('/admin/login')));
};
