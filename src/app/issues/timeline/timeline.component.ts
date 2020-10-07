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


  constructor(
    private timelineService: TimelineService,
    public dateService: DateService,
    public iconService: IconService
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
    console.log(comment);
  }

  handleReopenEvent(): void {
    console.log('reopen');
  }

  handleCloseEvent(): void {
    console.log('close');
  }

}
