import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { StorageService } from '../shared/storage.service';
import { User } from 'firebase';
import { ActivatedRoute, Router } from '@angular/router';
import { ReplaySubject, Subject } from 'rxjs';
import { catchError, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BoardService } from './board.service';
import { ErrorService } from '../core/error.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private _destroyer$: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _getBoards$: Subject<string> = new Subject<string>();

  user: any;
  uid: string;
  boards: any;
  isLoading = false;

  constructor(
    private _us: UserService,
    private _ar: ActivatedRoute,
    private _bs: BoardService,
    private _es: ErrorService,
    private _router: Router
  ) {
  }

  ngOnInit(): void {
    this._initBoards();

    this.uid = this._ar.snapshot.params.uid;

    this._us
      .getUser(this.uid)
      .pipe(
        takeUntil(this._destroyer$),
        map(
          (users) => users[0]
        )
      )
      .subscribe(
        (user) => {
          this.user = user;
          this._getBoards$.next(this.user.uid);
        }
      );
  }

  ngOnDestroy() {
    this._destroyer$.next(true);
    this._destroyer$.complete();
  }

  onAddBoard(): void {
    this._router.navigate(['./board/new']);
  }

  private _initBoards(): void {
    this._getBoards$
      .asObservable()
      .pipe(
        tap(
          () => this.isLoading = true
        ),
        switchMap(
          (userUID) => {
            return this._bs
              .getBoards(userUID)
              .pipe(
                catchError(
                  (err) => {
                    console.error(err);
                    this.isLoading = false;
                    return this._es.handle(err);
                  }
                )
              );
          }
        ),
        takeUntil(this._destroyer$)
      )
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.boards = res;
          console.log('BOARDS >', this.boards);
        }
      );
  }
}
