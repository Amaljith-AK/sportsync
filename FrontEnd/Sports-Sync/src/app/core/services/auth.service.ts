import { Injectable, signal } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { BaseService } from './base.service';
import { STORAGE_KEY } from './service.model';


@Injectable({ providedIn: 'root' })
export class AdminAuthService extends BaseService {
  private readonly _isAuthenticated = signal<boolean>(false);
  readonly isAuthenticated = this._isAuthenticated.asReadonly();

  constructor(){
    super();
    const stored = sessionStorage.getItem(STORAGE_KEY)
    if (stored) {
      this.verifyKey(stored).subscribe();
    }
  }


  login(key:string):Observable<boolean>{
    return this.verifyKey(key).pipe(
        tap((valid)=>{
            if(valid)sessionStorage.setItem(STORAGE_KEY, key);
        })
    )
  }

  logout():void{
    sessionStorage.removeItem(STORAGE_KEY)
    this._isAuthenticated.set(false)
  }

  getkey():string | null{
    return sessionStorage.getItem(STORAGE_KEY)
  }

  private verifyKey(key:string):Observable<boolean>{
    const headers = new HttpHeaders({'x-admin-key':key})
    return this.post<{valid:boolean}>('/admin/verify',{},headers).pipe(
        map((res:{ valid: boolean }) => res.valid),
        tap((valid:boolean) => this._isAuthenticated.set(valid)),
        catchError(()=>{
            this._isAuthenticated.set(false);
            sessionStorage.removeItem(STORAGE_KEY);
            return of(false);
        })
    )
  }

}
