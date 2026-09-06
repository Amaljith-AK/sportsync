import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AdminService } from '../../core/services/admin.service';
import { AdminAuthService } from '../../core/services/auth.service';

type ActionStatus = 'idle' | 'loading' | 'success' | 'error';

interface AdminAction {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly status: WritableSignal<ActionStatus>;
  readonly message: WritableSignal<string>;
  readonly run: () => Observable<unknown>;
  readonly successMessage: string;
  readonly errorMessage: string;
}

@Component({
  selector: 'app-admin-page',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-page.html',
})
export class AdminPage {
  private readonly admin = inject(AdminService);
  private readonly adminAuth = inject(AdminAuthService);
  private readonly router = inject(Router);

  protected readonly actions: AdminAction[] = [
    {
      id: 'sync',
      title: 'Trigger Data Sync',
      description: 'Pulls matches & standings immediately instead of waiting for the next scheduled run.',
      status: signal('idle'),
      message: signal(''),
      run: () => this.admin.triggerDataSync(),
      successMessage: 'Sync triggered — new data will appear shortly.',
      errorMessage: 'Sync failed to start. Check the server logs.',
    },
    {
      id: 'predictions',
      title: 'Trigger Predictions',
      description: 'Runs the win-probability model for upcoming fixtures right away.',
      status: signal('idle'),
      message: signal(''),
      run: () => this.admin.triggerPredictions(),
      successMessage: 'Prediction run triggered — probabilities will update shortly.',
      errorMessage: 'Prediction run failed to start. Check the server logs.',
    },
    {
      id: 'enrich-teams',
      title: 'Enrich Teams',
      description: 'Backfills stadium, founding year, manager & club colors for teams missing that data.',
      status: signal('idle'),
      message: signal(''),
      run: () => this.admin.triggerTeamEnrichment(),
      successMessage: 'Team enrichment started — this runs slowly in the background, check server logs.',
      errorMessage: 'Team enrichment failed to start. Check the server logs.',
    },
  ];

  protected logout(): void {
    this.adminAuth.logout();
    void this.router.navigate(['/']);
  }

  protected trigger(action: AdminAction): void {
    action.status.set('loading');
    action.message.set('');

    action.run().subscribe({
      next: () => {
        action.status.set('success');
        action.message.set(action.successMessage);
      },
      error: () => {
        action.status.set('error');
        action.message.set(action.errorMessage);
      },
    });
  }
}
