import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { StorageService } from '../shared/storage.service';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  constructor(
    private _afa: AngularFireAuth,
    private _afs: AngularFirestore,
    private _ss: StorageService,
    private _us: UserService
  ) {
  }

  getUser(): Observable<User> {
    return this._afa
      .authState;
  }

  signIn(params: { email: string, password: string }): Promise<any> {
    return this._afa
      .signInWithEmailAndPassword(params.email, params.password);
  }

  signUp(params: any): Promise<any> {
    return this._afa
      .createUserWithEmailAndPassword(params.email, params.password);
  }

  signOut(): Promise<any> {
    return this._afa
      .signOut();
  }
}
