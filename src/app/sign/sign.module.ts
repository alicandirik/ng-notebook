import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignRoutingModule } from './sign-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { HttpModule } from '../http/http.module';
import { RegisterComponent } from './register/register.component';
import { SignComponent } from './sign.component';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, SignComponent],
  imports: [
    CommonModule,
    SignRoutingModule,
    SharedModule
  ]
})
export class SignModule { }
