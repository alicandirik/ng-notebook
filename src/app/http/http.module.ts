import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTOR_PROVIDERS } from './interceptors';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS
  ]
})
export class HttpModule { }
