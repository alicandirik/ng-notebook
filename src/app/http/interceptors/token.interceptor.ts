import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { NzNotificationService } from 'ng-zorro-antd';
import { StorageService } from '../../shared/storage.service';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  private _refresh$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private _isRefreshing = false;

  constructor(
    private _ns: NzNotificationService,
    private _ss: StorageService,
    private _router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = this._ss.get('ng-user');
    const token = user.stsTokenManager.accessToken;

    req = this._add(req, token);

    return next.handle(req)
      .pipe(
        catchError(
          (err) => {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              return this._refresh(req, next);
            } else {
              return throwError(err);
            }
          }
        )
      );
  }

  private _refresh(req: HttpRequest<any>, next: HttpHandler) {

    if (!this._isRefreshing) {
      this._isRefreshing = true;
      this._refresh$.next(null);

      this._ns.warning('Needs Action', 'You need to re-login to Panates Authentication System.');
      this._router.navigate(['sign/login']);
      return next.handle(req);

    } else {

      return this._refresh$.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this._add(req, jwt));
        }));
    }
  }

  private _add(req: HttpRequest<any>, token: string) {

    return req.clone({
      setHeaders: {
        Authorization: `${token}`
      }
    });
  }
}
