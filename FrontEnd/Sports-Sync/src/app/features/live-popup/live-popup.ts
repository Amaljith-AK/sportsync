import { ChangeDetectionStrategy, Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { CdkDragMove } from '@angular/cdk/drag-drop';
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

  protected readonly dragging = signal(false);
  protected readonly armed = signal(false);

  protected onDragStarted(): void {
    this.dragging.set(true);
  }

  protected onDragMoved(event: CdkDragMove): void {
    this.armed.set(this.isOverCloseZone(event.pointerPosition));
  }

  protected onDragEnded(): void {
    const shouldClose = this.armed();
    this.dragging.set(false);
    this.armed.set(false);

    if (shouldClose) {
      this.dialogRef.close();
    }
  }

  private isOverCloseZone(point: { x: number; y: number }): boolean {
    const rect = this.closeZone().nativeElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.hypot(point.x - centerX, point.y - centerY) <= CLOSE_ZONE_RADIUS_PX;
  }
}
