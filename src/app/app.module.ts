import { SharedModule } from './shared/shared.module';
import { LoginModule } from './login/login.module';
import { IssuesModule } from './issues/issues.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    IssuesModule,
    LoginModule,
    SharedModule,
    ModalModule.forRoot(),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
