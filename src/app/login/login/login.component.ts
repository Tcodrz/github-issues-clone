import { Repo } from './../../shared/interface/repo.interface';
import { LoginService } from './../../services/login.service';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  showTokenInput = true;
  showUsernameInput = false;
  showRepoInput = false;

  repos: Repo[] = [];

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  sendToken(token: string): void {
    this.loginService.setToken(token).then(() => {
      this.showTokenInput = false;
      this.showUsernameInput = true;
    });
  }
  sendUserName(username: string): void {
    this.loginService.setUserName(username).then((repos: Repo[]) => {
      this.repos = repos;
      this.showUsernameInput = false;
      this.showRepoInput = true;
    });
  }
  sendRepoName(reponame: string): void {
    this.loginService.setRepoName(reponame).then(() => {
      this.login();
    });
  }
  login(): void {
    this.loginService.login().then(() => {
      this.router.navigate(['issues']);
    });
  }

}
