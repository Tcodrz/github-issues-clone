import { SessionStorageService, UserDetails } from './../../services/session-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionStorage: SessionStorageService) { }

  canActivate(): boolean {
    const userDetails: UserDetails = this.sessionStorage.getUserDetails();
    if (!userDetails.repoName || !userDetails.username || !userDetails.token) {
      return false;
    }

    return true;
  }

}
