import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(
    private _afs: AngularFirestore
  ) {
  }

  createUser(params: any): Promise<DocumentReference> {
    return this._afs
      .collection('users')
      .add(params);
  }

  getUser(uid: string): Observable<any> {
    return this._afs
      .collection('users', ref => ref.where('uid', '==', uid))
      .valueChanges();
  }
}
