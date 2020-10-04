import { SessionStorageService, UserDetails } from './../../services/session-storage.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private sessionStorage: SessionStorageService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userDetails: UserDetails = this.sessionStorage.getUserDetails();
    if (!userDetails.repoName || !userDetails.username || !userDetails.token) {
      return false;
    }

    return true;
  }

}
