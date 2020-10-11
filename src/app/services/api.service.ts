import { Label } from './../shared/interface/label.interface';
import { SessionStorageService, UserDetails } from './session-storage.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../shared/interface/user.interface';
import { Repo } from './../shared/interface/repo.interface';
import { Issue } from './../shared/interface/issue.interface';
import { IssueEvent } from '../shared/interface/event.interface';
import { IssueComment } from '../shared/interface/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://api.github.com';

  userDetails: UserDetails;

  constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) { }

  getUserDetails(): Promise<void> {
    return new Promise((resolve) => {
      this.userDetails = this.sessionStorage.getUserDetails();
      resolve();
    });
  }

  getUser(username: string): Promise<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${username}`).toPromise();
  }
  getReposForUser(username: string): Promise<Repo[]> {
    return this.http.get<Repo[]>(`${this.apiUrl}/users/${username}/repos`).toPromise();
  }
  getRepoByName(reponame: string, username: string): Promise<Repo> {
    return this.http.get<Repo>(`${this.apiUrl}/repos/${username}/${reponame}`).toPromise();
  }

  getIssuesForRepo(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues?state=all`);
  }

  getIssueByNumber(issueNumber: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumber}`);
  }

  createNewIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues`, issue
    );
  }

  updateIssueLabels(issueNumber: number, labels: Label[]): Promise<Issue> {
    return this.http.patch<Issue>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumber}`,
        { labels }).toPromise();
  }

  updateIssueBody(issueNumber: number, issueBody: string): Observable<Issue> {
    return this.http.patch<Issue>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumber}`,
      { body: issueBody }
    );
  }

  updateIssueTitle(issueNumer: number, newTitle: string): Observable<Issue> {
    return this.http.patch<Issue>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumer}`,
      { title: newTitle }
    );
  }

  markIssueOpen(issue: Issue): void {
    this.http.patch<Issue>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issue.number}`, {state: 'open'}
    ).subscribe();
  }
  markIssueClosed(issue: Issue): void {
    this.http.patch<Issue>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issue.number}`, { state: 'closed' }
    ).subscribe();
  }

  getIssueEvents(issueNumber: number, pageNumber: number): Observable<IssueEvent[]> {
    return this.http.get<IssueEvent[]>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumber}/events?per_page=100&page=${pageNumber}`
    );
  }

  getIssueComments(issueNumber: number): Observable<IssueComment[]> {
    return this.http.get<IssueComment[]>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumber}/comments`
    );
  }

  createNewComment(issueNumber: number, commentEvent: IssueComment): Observable<IssueComment> {
    return this.http.post<IssueComment>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/${issueNumber}/comments`, commentEvent
    );
  }

  updateCommentById(commentId: number, commentBody: string): Observable<IssueComment> {
    return this.http.patch<IssueComment>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/comments/${commentId}`, { body: commentBody }
    );
  }

  removeCommentById(commentId: number): Observable<null> {
    return this.http.delete<null>(
      `${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/issues/comments/${commentId}`
    );
  }

  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(`${this.apiUrl}/repos/${this.userDetails.username}/${this.userDetails.repoName}/labels`);
  }
}
