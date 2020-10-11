import { BehaviorSubject } from 'rxjs';
import { DateService } from './date.service';
import { IssueEvent } from './../shared/interface/event.interface';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { IssueComment } from '../shared/interface/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class TimelineService {

  private todaysEvents: IssueEvent[] = [];

  private eventDates: string[] = [];

  private eventsObject = {};

  private events: BehaviorSubject<{ todaysEvents: IssueEvent[], eventDates: string[], events: object }> = new BehaviorSubject({
    todaysEvents: this.todaysEvents,
    eventDates: this.eventDates,
    events: this.eventsObject
  });


  constructor(
    private apiService: ApiService,
    private dateService: DateService
  ) { }

  getEvents(): BehaviorSubject<{ todaysEvents: IssueEvent[], eventDates: string[], events: object }> {
    this.events.next({ todaysEvents: this.todaysEvents, eventDates: this.eventDates, events: this.eventsObject });
    return this.events;
  }

  sortEventsObject(issueNumber: number): Promise<void> {

    return new Promise(async (resolve) => {

      let events = await this.getEventsFromApi(issueNumber);

      const comments = await this.getCommentsFromApi(issueNumber);

      comments.forEach((comment: IssueEvent) => comment.edit = false);

      const commentEvents = await this.commentsToEvents(comments);

      events = events.concat(commentEvents);

      this.eventsObject = (await this.addEventsObjectDates(events)).eventsObject;

      this.eventDates = (await this.addEventsObjectDates(events)).eventDates;

      this.eventsObject = (await this.sortEventsByDate(events)).eventObject;

      this.todaysEvents = (await this.sortEventsByDate(events)).todaysEvents;

      resolve();
    });
  }

  addEvent(value: IssueEvent): void {
    this.todaysEvents.push(value);
    this.events.next({ ...this.events.getValue(), todaysEvents: this.todaysEvents });
  }

  removeEvent(event: IssueEvent): void {

    let index: number;

    for (const date in this.eventsObject) {
      for (const array in this.eventsObject[date]) {
        index = this.eventsObject[date][array].findIndex(x => x.id === event.id);
        if (index >= 0) {
          this.eventsObject[date][array].splice(index , 1);
        }
      }
    }

    if (index < 0 || !index) {
      index = this.todaysEvents.findIndex(x => x.id === event.id);
      this.todaysEvents.splice(index , 1);
    }

    this.events.next({ ...this.events.getValue() });

  }

  private sortEventsByDate(events: IssueEvent[]): Promise<{ eventObject: object, todaysEvents: IssueEvent[] }> {

    return new Promise((resolve) => {

      const today = this.dateSlice(this.dateService.getFullDate());

      const todaysEvents: IssueEvent[] = [];

      events.forEach(event => {

        if (this.dateSlice(event.created_at) !== today) {

          const index = this.eventsObject[this.dateSlice(event.created_at)][event.event]
            .findIndex((x: IssueEvent) => {

              if (event.event === 'labeled' || event.event === 'unlabeled') {
                return x.label.name === event.label.name;
              }
              if (event.event === 'reopened' || event.event === 'closed') {
                return event.event === x.event;
              }
              if (event.event === 'renamed') {
                return event.id === x.id;
              }
              if (event.event === 'comment') {
                return event.id === x.id;
              }
            });

          if (index < 0) {
            this.eventsObject[this.dateSlice(event.created_at)][event.event].push(event);
          }
        }

        if (this.dateSlice(event.created_at) === today) {
          todaysEvents.push(event);
        }

      });

      for (const date in this.eventsObject) {
        for (const array in this.eventsObject[date]) {
          this.eventsObject[date][array].sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
        }
      }


      resolve({ eventObject: this.eventsObject, todaysEvents });

    });

  }

  private addEventsObjectDates(events: IssueEvent[]): Promise<{ eventsObject: object, eventDates: string[] }> {
    return new Promise((resolve) => {

      const today = this.dateSlice(this.dateService.getFullDate());

      const eventsObject = {};

      const eventDates: string[] = [];

      events.forEach(event => {
        if (!eventsObject[this.dateSlice(event.created_at)]) {
          if (this.dateSlice(event.created_at) !== today) {
            eventsObject[this.dateSlice(event.created_at)] = {
              labeled: [],
              unlabeled: [],
              closed: [],
              reopened: [],
              renamed: [],
              comment: []
            };
            eventDates.push(this.dateSlice(event.created_at));
          }
        }
      });
      resolve({ eventsObject, eventDates });
    });
  }

  private getEventsFromApi(issueNumber: number): Promise<IssueEvent[]> {
    return new Promise((resolve) => {
      let eventsArray = [];
      this.apiService.getIssueEvents(issueNumber, 1).subscribe(events => {
        eventsArray = events;
        if (eventsArray.length > 99) {
          this.apiService.getIssueEvents(issueNumber, 2).subscribe(pageTwo => {
            eventsArray = eventsArray.concat(pageTwo);
            resolve(eventsArray);
          });
        } else {
          resolve(eventsArray);
        }
      });
    });
  }

  private getCommentsFromApi(issueNumber: number): Promise<IssueComment[]> {
    return this.apiService.getIssueComments(issueNumber).toPromise();
  }

  private commentsToEvents(comments: IssueComment[]): Promise<IssueEvent[]> {
    return new Promise((resolve) => {

      const events: IssueEvent[] = [];

      comments.forEach((comment) => {

        const event: IssueEvent = {
          actor: comment.user,
          event: 'comment',
          id: comment.id,
          created_at: comment.created_at,
          comment: comment.body
        };
        events.push(event);
      });
      resolve(events);
    });
  }

  private dateSlice(date: string): string {
    return date.split('').splice(0, 10).join('');
  }

}
