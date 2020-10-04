import { SessionStorageService, UserDetails } from './session-storage.service';
import { ErrorHandlerService } from './error-handler.service';
import { Repo } from './../shared/interface/repo.interface';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from '../shared/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  userDetails: UserDetails = {
    username: '',
    repoName: '',
    token: ''
  };

  constructor(
    private apiService: ApiService,
    private sessionStrage: SessionStorageService,
    private erroHandler: ErrorHandlerService
  ) { }

  setUserName(username: string): Promise<Repo[]> {
    return new Promise((resolve) => {
        this.apiService.getUser(username).then((user: User) => {
          this.userDetails.username = user.login;
          this.apiService.getReposForUser(user.login).then((repos: Repo[]) => {
            this.sessionStrage.setUserDetails(this.userDetails);
            resolve(repos);
          });
        });
    });

  }
  setRepoName(reponame: string): Promise<void> {
    return new Promise((resolve) => {
      this.apiService.getRepoByName(reponame, this.userDetails.username).then((repo) => {
        this.userDetails.repoName = repo.name;
        resolve();
      });
    });

  }
  setToken(token: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!token) {
        this.erroHandler.setAppError('Please provide a token');
        reject('token is empty');
      }
      this.userDetails.token = token;
      this.sessionStrage.setUserDetails(this.userDetails);
      resolve();
    });
  }

  login(): Promise<void> {
    return new Promise((resolve) => {
      this.sessionStrage.setUserDetails(this.userDetails);
      resolve();
    });
  }

}
