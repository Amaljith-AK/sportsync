import { Injectable, inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { AdminAuthService } from './auth.service';

/** Manual overrides for jobs that normally only run on the backend's cron schedule.
 * Every /admin/* route on the backend requires an `x-admin-key` header, sourced
 * here from whatever key AdminAuthService has on file for the current session. */
@Injectable({ providedIn: 'root' })
export class AdminService extends BaseService {
  private readonly auth = inject(AdminAuthService);

  triggerDataSync(): Observable<unknown> {
    return this.post<unknown>('/admin/sync-now', {}, this.authHeaders());
  }

  triggerPredictions(): Observable<unknown> {
    return this.post<unknown>('/admin/predict-now', {}, this.authHeaders());
  }

  triggerTeamEnrichment(): Observable<unknown> {
    return this.post<unknown>('/admin/enrich-teams', {}, this.authHeaders());
  }

  private authHeaders(): HttpHeaders {
    return new HttpHeaders({ 'x-admin-key': this.auth.getkey() ?? '' });
  }
}
