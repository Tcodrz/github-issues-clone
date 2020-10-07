import { IssueInfoComponent } from './issues/issue-info/issue-info.component';
import { NewIssueComponent } from './issues/new-issue/new-issue.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './login/login/login.component';
import { IssuesComponent } from './issues/issues/issues.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: 'issues', component: IssuesComponent, canActivate: [ AuthGuard ] },
  { path: 'new-issue', component: NewIssueComponent, canActivate: [ AuthGuard ] },
  { path: 'issue/:number', component: IssueInfoComponent, canActivate: [ AuthGuard ]},
  {path: '', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
