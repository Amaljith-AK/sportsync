import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Fixture, Team } from '../../core/models/sport.models';

export interface LivePopupData {
  fixture: Fixture;
  homeTeam: Team | undefined;
  awayTeam: Team | undefined;
  leagueName?: string;
  score: { home: number | null; away: number | null; status: string };
}

/** How close the pointer needs to be to the close-zone's center, in px, to arm it. */
const CLOSE_ZONE_RADIUS_PX = 64;

@Component({
  selector: 'app-live-popup',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './live-popup.html',
  styleUrl: './live-popup.css',
})
export class LivePopup {
  private readonly dialogRef = inject(MatDialogRef<LivePopup>);

  protected readonly data = inject<LivePopupData>(MAT_DIALOG_DATA);

  private readonly closeZone = viewChild.required<ElementRef<HTMLElement>>('closeZone');
  private readonly bubble = viewChild.required<ElementRef<HTMLElement>>('bubble');

  protected readonly dragging = signal(false);
  protected readonly armed = signal(false);

  protected onDragStarted(): void {
    this.dragging.set(true);
  }

  protected onDragMoved(): void {
    this.armed.set(this.isOverCloseZone());
  }

  protected onDragEnded(): void {
    const shouldClose = this.armed();
    this.dragging.set(false);
    this.armed.set(false);

    if (shouldClose) {
      this.dialogRef.close();
    }
  }

  /** Compares two live getBoundingClientRect() reads rather than CDK's own
   * pointer-position tracking, which drifts out of sync with the page once
   * you scroll mid-drag (position: fixed + free-drag + page scroll is a
   * known rough edge in @angular/cdk/drag-drop). */
  private isOverCloseZone(): boolean {
    const bubbleRect = this.bubble().nativeElement.getBoundingClientRect();
    const zoneRect = this.closeZone().nativeElement.getBoundingClientRect();

    const bubbleCenterX = bubbleRect.left + bubbleRect.width / 2;
    const bubbleCenterY = bubbleRect.top + bubbleRect.height / 2;
    const zoneCenterX = zoneRect.left + zoneRect.width / 2;
    const zoneCenterY = zoneRect.top + zoneRect.height / 2;

    return Math.hypot(bubbleCenterX - zoneCenterX, bubbleCenterY - zoneCenterY) <= CLOSE_ZONE_RADIUS_PX;
  }
}
