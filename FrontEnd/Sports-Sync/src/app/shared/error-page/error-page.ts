import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-error-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './error-page.html',
})
export class ErrorPage {
  private readonly router = inject(Router);
  private themeService = inject(ThemeService)

  readonly code = input.required<string>();
  readonly title = input.required<string>();
  readonly message = input<string>('');
  readonly showRetry = input(false);

  protected goHome(): void {
    void this.router.navigate(['/']);
    this.themeService.setTheme('football')

  }

  protected retry(): void {
    window.location.reload();
  }
}
