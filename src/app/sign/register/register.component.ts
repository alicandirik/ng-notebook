import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignService } from '../sign.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { ErrorService } from '../../core/error.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isLoading = false;

  constructor(
    private _fb: FormBuilder,
    private _sis: SignService,
    private _ns: NzNotificationService,
    private _router: Router,
    private _es: ErrorService,
    private _us: UserService
  ) {
  }

  ngOnInit(): void {
    this.form = this._createForm();
  }

  onSignUp(): void {
    this.isLoading = true;
    const data = {...this.form.getRawValue()};
    data.name.text = `${data.name.given.slice(0, 1).toUpperCase()}${data.name.given.slice(1)} ` +
      `${data.name.family.slice(0, 1).toUpperCase()}${data.name.family.slice(1)}`;
    delete data.confirm;

    this._sis
      .signUp(data)
      .then(
        (res) => {
          delete data.password;

          data.uid = res.user.uid;

          this._us
            .createUser(data)
            .then(
              () => {
                this._ns.success('Success', 'Signed up successfully.');
                this.isLoading = false;
                this._router.navigate(['sign/login']);
              }
            );
        }
      )
      .catch(
        (err) => {
          console.error(err);
          this.isLoading = false;
          this._es.handle(err);
        }
      );
  }

  private _createForm(): FormGroup {
    return this._fb.group({
      email: new FormControl(null, [Validators.email, Validators.required]),
      name: new FormGroup({
        given: new FormControl(null, Validators.required),
        family: new FormControl(null, Validators.required),
        text: new FormControl(null)
      }),
      password: new FormControl(null, Validators.required),
      confirm: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required)
    });
  }

}
