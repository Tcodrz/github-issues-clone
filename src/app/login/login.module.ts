import { NavigatorModule } from './../navigator/navigator.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    NavigatorModule
  ]
})
export class LoginModule { }
