import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { Observable, Subject } from 'rxjs';

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

    protected get<T>(path:string):Observable<T>{
        return this.http.get<T>(`${this.baseUrl}${path}`);
    }

    protected post<T>(path:string,payload:unknown):Observable<T>{
        return this.http.post<T>(`${this.baseUrl}${path}`,payload)
    }

    protected put<T>(path:string,payload:unknown):Observable<T>{
        return this.http.put<T>(`${this.baseUrl}${path}`,payload)
    }

    protected delete<T>(path:string):Observable<T>{
        return this.http.delete<T>(`${this.baseUrl}${path}`);
    }
    

    
}
