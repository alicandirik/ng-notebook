import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private _ns: NzNotificationService
  ) {
  }

  handle(err: any) {

    let message;
    let title = '';

    // Client-side
    if (err instanceof ErrorEvent) {

      message = `Error: ${err.error.message}`;

    } else {

      message = err.message;

    }

    if (err.code) {

      let code = err.code.split('/')[1];

      if (code.includes('-')) {
        const arr = code.split('-');

        arr.forEach(
          (el) => {
            title += `${el.slice(0, 1).toUpperCase()}${el.slice(1)} `;
          }
        );
      }

    }

    this._ns.error(title, message);
    return throwError(message);

  }
}
