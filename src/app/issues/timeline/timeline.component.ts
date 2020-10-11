import { EventService } from './../../services/event.service';
import { IconService } from './../../services/icon.service';
import { DateService } from './../../services/date.service';
import { Issue } from './../../shared/interface/issue.interface';
import { IssueEvent } from './../../shared/interface/event.interface';
import { TimelineService } from './../../services/timeline.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  @Input() issue: Issue;

  events = {};

  eventDates: string[] = [];

  todaysEvents: IssueEvent[] = [];

  bodyEditMode = false;

  commentEditMode = false;

  constructor(
    private timelineService: TimelineService,
    public dateService: DateService,
    public iconService: IconService,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.timelineService.sortEventsObject(this.issue.number).then(() => {
      this.timelineService.getEvents().asObservable().subscribe(data => {
        this.events = data.events;
        this.todaysEvents = data.todaysEvents;
        this.eventDates = data.eventDates;
      });
    });
  }

  handleCommentEvent(value: any): void {
    const comment = value.comment;
    this.eventService.handleCommentEvent(comment, this.issue.number).then(() => {
      this.issue.comments++;
    });
  }

  handleReopenEvent(): void {
    console.log('reopen');
    this.eventService.handleReopenEvent(this.issue).then(() => {
      this.issue.state = 'open';
    });
  }

  handleCloseEvent(): void {
    console.log('close');
    this.eventService.handleCloseEvent(this.issue).then(() => {
      this.issue.state = 'closed';
    });

  }

  handleCommentEdit(event: {name: string, type: string }, issueEvent?: IssueEvent): void {
    if (event.type === 'issue-body') {
      this.bodyEditMode = true;
    }
    if (event.type === 'comment') {
      if (event.name === 'Edit') {
        issueEvent.edit = true;
      } 
      if (event.name === 'Delete') {
        this.eventService.handleCommentDelete(issueEvent);
        this.issue.comments--;
      }
    }
  }

  handleIssueBodyUpdate(event: string): void {
    console.log(event);
    this.eventService.handleIssueBodyUpdate(this.issue.number, event);
    this.issue.body = event;
  }
  updateComment(comment: string, event: IssueEvent): void {
    this.eventService.handleCommentUpdate(comment, event.id);
    event.comment = comment;

  }

}
