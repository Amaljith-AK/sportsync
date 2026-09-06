import { Injectable, inject } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LivePopup, LivePopupData } from './live-popup';
import { LiveUpdateService } from '../../core/services/live-update.service';

/** Set on <body> for as long as the live-score bubble is on screen, so hover-only
 * UI elsewhere on the page (e.g. the win-probability popover) stays suppressed
 * the whole time it's open, not just while it's actively being dragged. */
const OPEN_BODY_CLASS = 'live-popup-open';

/**
 * Opens the floating live-score bubble. Only one instance is kept open at a
 * time - selecting another live match swaps the bubble's content instead of
 * stacking a second one.
 */
@Injectable({ providedIn: 'root' })
export class LivePopupService {
  private readonly dialog = inject(MatDialog);
  private readonly overlay = inject(Overlay);
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
      // The bubble floats fixed to the viewport and is meant to be dragged
      // around freely, so don't let Material lock page scroll (which also
      // warps the html/body box that cdkDragBoundary="body" measures against).
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
    this.openRef = ref;
    document.body.classList.add(OPEN_BODY_CLASS);

    // Guard against the stale "previous" dialog's own afterClosed callback
    // firing after this one has already taken over `openRef`.
    ref.afterClosed().subscribe(() => {
      if (this.openRef === ref) {
        this.openRef = null;
        document.body.classList.remove(OPEN_BODY_CLASS);
      }
      this.liveUpdates.disconnect();
    });

    previous?.close();
  }
}
