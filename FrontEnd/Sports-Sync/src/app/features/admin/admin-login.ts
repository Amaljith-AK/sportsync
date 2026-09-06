import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css',
})
export class AdminLogin {
  private readonly auth = inject(AdminAuthService);
  private readonly router = inject(Router);

  protected readonly password = signal('');
  protected readonly isSubmitting = signal(false);
  protected readonly error = signal(false);

  protected submit(): void {
    if (!this.password() || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.error.set(false);

    this.auth.login(this.password()).subscribe((valid) => {
      if (valid) {
        void this.router.navigate(['/admin']);
        return;
      }
      this.isSubmitting.set(false);
      this.error.set(true);
      this.password.set('');
    });
  }
}
