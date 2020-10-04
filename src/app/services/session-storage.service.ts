import { Injectable } from '@angular/core';

export interface UserDetails {
  username?: string;
  repoName?: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setUserDetails(value: UserDetails): void {
    sessionStorage.setItem('userDetails', JSON.stringify(value));
  }
  getUserDetails(): UserDetails {
    return JSON.parse(sessionStorage.getItem('userDetails'));
  }
  clearSession(): void { 
    sessionStorage.clear();
  }
}
