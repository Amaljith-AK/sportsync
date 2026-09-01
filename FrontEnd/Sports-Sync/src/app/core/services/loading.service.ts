import { Injectable, computed, signal } from '@angular/core';

/**
 * Reference-counted request tracker. Every in-flight API call increments
 * the counter on subscribe and decrements it on completion or error, so
 * the loading state stays true while any call is still outstanding.
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _activeRequests = signal(0);

  readonly isLoading = computed(() => this._activeRequests() > 0);

  show(): void {
    this._activeRequests.update((count) => count + 1);
  }

  hide(): void {
    this._activeRequests.update((count) => Math.max(0, count - 1));
  }
}
