import { Router } from '@angular/router';
import { Issue } from '../shared/interface/issue.interface';
import { User } from '../shared/interface/user.interface';
import { SessionStorageService } from './session-storage.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextEditorService {

  constructor(
    private apiService: ApiService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) { }

  async getUser(): Promise<User>{
    const username = this.sessionStorage.getUserDetails().username;
    const user = await this.apiService.getUser(username);
    return user;
  }
  submitNewIssue(value: Issue): void {
    this.apiService.createNewIssue(value).subscribe((issue) => {
      if (issue.number) {
        this.router.navigate(['/issue', issue.number]);
      }
    });
  }
}
