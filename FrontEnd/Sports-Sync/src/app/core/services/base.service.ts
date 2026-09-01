import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { defer, finalize, Observable, Subject } from 'rxjs';
import { LoadingService } from './loading.service';

/**
 * Central read model for sports data. Backed by static demo data today;
 * swap the private signals' source for an HTTP call later and every
 * consumer (all of which only read the public signals) keeps working.
 */
@Injectable({ providedIn: 'root' })
export class BaseService {
    protected http = inject(HttpClient)
    protected baseUrl = 'https://sportsync-backend-badh.onrender.com/api';
    protected destroy$ = new Subject<void>();
    private readonly loading = inject(LoadingService);

    protected get<T>(path:string):Observable<T>{
        return this.withLoading(this.http.get<T>(`${this.baseUrl}${path}`));
    }

    protected post<T>(path:string,payload:unknown):Observable<T>{
        return this.withLoading(this.http.post<T>(`${this.baseUrl}${path}`,payload));
    }

    protected put<T>(path:string,payload:unknown):Observable<T>{
        return this.withLoading(this.http.put<T>(`${this.baseUrl}${path}`,payload));
    }

    protected delete<T>(path:string):Observable<T>{
        return this.withLoading(this.http.delete<T>(`${this.baseUrl}${path}`));
    }

    /** Shows the loading overlay right as the request is subscribed to, and
     * hides it once the response completes or errors out. */
    private withLoading<T>(source$: Observable<T>): Observable<T> {
        return defer(() => {
            this.loading.show();
            return source$.pipe(finalize(() => this.loading.hide()));
        });
    }
}
