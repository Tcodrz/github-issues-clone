import { IssueComment } from './../shared/interface/comment.interface';
import { IssueEvent } from './../shared/interface/event.interface';
import { DateService } from './date.service';
import { TimelineService } from './timeline.service';
import { SessionStorageService } from './session-storage.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Label } from '../shared/interface/label.interface';
import { Issue } from '../shared/interface/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(
    private apiService: ApiService,
    private sessionStorage: SessionStorageService,
    private timeline: TimelineService,
    private dateService: DateService
  ) { }

  async handleLabelEvent(label: Label, issue: Issue): Promise<void> {

    const user = await this.apiService.getUser(this.sessionStorage.getUserDetails().username);

    const index = issue.labels.findIndex(x => x.name === label.name);

    let event: IssueEvent;

    if (index < 0) {
      event = {
        actor: user,
        event: 'labeled',
        created_at: this.dateService.getFullDate(),
        label: {
          name: label.name,
          color: label.color
        }
      };
      issue.labels.push(label);
    }

    if (index >= 0) {
      event = {
        actor: user,
        event: 'unlabeled',
        created_at: this.dateService.getFullDate(),
        label: {
          name: label.name,
          color: label.color
        }
      };
      issue.labels.splice(index, 1);
    }
    this.timeline.addEvent(event);

    await this.apiService.updateIssueLabels(issue.number, issue.labels);
  }

  async handleCloseEvent(issue: Issue): Promise<void> {

    const event: IssueEvent = {
      actor: await this.apiService.getUser(this.sessionStorage.getUserDetails().username),
      created_at: this.dateService.getFullDate(),
      event: 'closed',
    };

    this.timeline.addEvent(event);

    this.apiService.markIssueClosed(issue);

  }

  async handleReopenEvent(issue: Issue): Promise<void> {

    const event: IssueEvent = {
      actor: await this.apiService.getUser(this.sessionStorage.getUserDetails().username),
      created_at: this.dateService.getFullDate(),
      event: 'reopened'
    };

    this.timeline.addEvent(event);

    this.apiService.markIssueOpen(issue);
  }

  handleIssueBodyUpdate(issueNumber: number, issueBody: string): void {
    this.apiService.updateIssueBody(issueNumber, issueBody).subscribe();
  }

  async handleCommentEvent(comment: string, issueNumber: number): Promise<void> {

    const commentEvent: IssueComment = {
      user: await this.apiService.getUser(this.sessionStorage.getUserDetails().username),
      created_at: this.dateService.getFullDate(),
      body: comment,
    };

    const issueComment: IssueEvent = {
      actor: commentEvent.user,
      created_at: commentEvent.created_at,
      event: 'comment',
      comment: commentEvent.body
    };

    this.apiService.createNewComment(issueNumber, commentEvent).subscribe();
    this.timeline.addEvent(issueComment);

  }

  handleCommentUpdate(commentBody: string, commentId: number): void {
    this.apiService.updateCommentById(commentId, commentBody).subscribe();
  }

  handleCommentDelete(comment: IssueEvent): void {
    this.timeline.removeEvent(comment);
    this.apiService.removeCommentById(comment.id).subscribe();
  }

  async handleIssueTitleUpdate(issue: Issue, newTitle: string, oldTitle: string): Promise<void> {

    const event: IssueEvent = {
      actor: await this.apiService.getUser(this.sessionStorage.getUserDetails().username),
      created_at: this.dateService.getFullDate(),
      event: 'renamed',
      rename: {
        from: oldTitle,
        to: newTitle
      }
    };

    this.timeline.addEvent(event);

    this.apiService.updateIssueTitle(issue.number, newTitle).subscribe();
  }


}
