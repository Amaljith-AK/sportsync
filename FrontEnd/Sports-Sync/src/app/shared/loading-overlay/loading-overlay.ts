import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-loading-overlay',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loading-overlay.html',
  styleUrl: './loading-overlay.css',
})
export class LoadingOverlay {
  private readonly loadingService = inject(LoadingService);

  protected readonly isLoading = this.loadingService.isLoading;
}
