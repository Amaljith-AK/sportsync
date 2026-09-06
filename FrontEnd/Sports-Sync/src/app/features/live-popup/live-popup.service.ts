import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LivePopup, LivePopupData } from './live-popup';
import { LiveUpdateService } from '../../core/services/live-update.service';

/**
 * Opens the floating live-score bubble. Only one instance is kept open at a
 * time - selecting another live match swaps the bubble's content instead of
 * stacking a second one.
 */
@Injectable({ providedIn: 'root' })
export class LivePopupService {
  private readonly dialog = inject(MatDialog);
  private readonly liveUpdates = inject(LiveUpdateService);
  private openRef: MatDialogRef<LivePopup> | null = null;

  open(data: LivePopupData): void {
    const previous = this.openRef;

    const ref = this.dialog.open(LivePopup, {
      data,
      hasBackdrop: false,
      disableClose: true,
      autoFocus: false,
      restoreFocus: false,
      maxWidth: 'none',
      panelClass: 'live-popup-panel',
      position: { bottom: '96px', right: '32px' },
    });
    this.openRef = ref;

    // Guard against the stale "previous" dialog's own afterClosed callback
    // firing after this one has already taken over `openRef`.
    ref.afterClosed().subscribe(() => {
      if (this.openRef === ref) {
        this.openRef = null;
      }
      this.liveUpdates.disconnect();
    });

    previous?.close();
  }
}
