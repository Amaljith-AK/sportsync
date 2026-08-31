import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-page.html',
})
export class ErrorPage {
  private readonly router = inject(Router);

  readonly code = input.required<string>();
  readonly title = input.required<string>();
  readonly message = input<string>('');
  readonly showRetry = input(false);

  protected goHome(): void {
    void this.router.navigate(['/']);
  }

  protected retry(): void {
    window.location.reload();
  }
}
