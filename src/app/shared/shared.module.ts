import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NzBreadCrumbModule,
  NzButtonModule,
  NzCheckboxModule,
  NzDropDownModule,
  NzInputModule,
  NzLayoutModule, NzListModule,
  NzMenuModule,
  NzNotificationModule, NzResultModule
} from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from './storage.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzNotificationModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzListModule,
    NzResultModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzInputModule,
    NzNotificationModule,
    NzCheckboxModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzListModule,
    NzResultModule
  ],
  providers: [
    StorageService
  ]
})
export class SharedModule { }
