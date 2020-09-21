import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(
    private _afs: AngularFirestore
  ) {
  }

  getBoards(userUID: string): Observable<any> {
    return this._afs
      .collection('boards', ref => ref.where('userUID', '==', userUID))
      .valueChanges();
  }
}
