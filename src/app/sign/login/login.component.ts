import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignService } from '../sign.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { throwError } from 'rxjs';
import { StorageService } from '../../shared/storage.service';
import UserCredential = firebase.auth.UserCredential;
import { Router } from '@angular/router';
import { ErrorService } from '../../core/error.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isLoading = false;

  constructor(
    private _sis: SignService,
    private _fb: FormBuilder,
    private _ns: NzNotificationService,
    private _ss: StorageService,
    private _router: Router,
    private _es: ErrorService,
    private _us: UserService
  ) {
  }

  ngOnInit(): void {
    this.form = this._createForm();

    this.form.patchValue({
      email: 'admin@ng-notebook.com',
      password: '123123',
      rememberMe: true
    });
  }

  onLogin(): void {
    this.isLoading = true;

    this._sis.signIn(this.form.getRawValue())
      .then(
        (res) => {
          this._ss.set('ng-user', res.user, true);
          this.isLoading = false;
          this._ns.success('Success', 'Signed in successfully.');
          this._router.navigate([`/dashboard/${res.user.uid}`]);
        }
      )
      .catch(
        (err) => {
          this._ss.remove('ng-user-logged-in');
          console.error(err);
          this.isLoading = false;
          this._es.handle(err);
        }
      );
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    });
  }
}
