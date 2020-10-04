import { LabelState } from './../shared/interface/label-state.inteface';
import { Issue } from './../shared/interface/issue.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListStateService {

  private activeLabels: LabelState = {
    bug: false,
    documentation: false,
    duplicate: false,
    enhancement: false,
    'good first issue': false,
    'help wanted': false,
    invalid: false,
    question: false,
    wontfix: false,
    unlabeled: false,
  };

  private sort: BehaviorSubject<string> = new BehaviorSubject('new');
  private state: BehaviorSubject<string> = new BehaviorSubject('open');
  private issueFilter: BehaviorSubject<string> = new BehaviorSubject('');

  private currentViewedIssues: Subject<Issue[]> = new Subject();
  private selectedIssues: BehaviorSubject<Issue[]> = new BehaviorSubject([]);
  private selectedLabels: BehaviorSubject<LabelState> = new BehaviorSubject(this.activeLabels);

  constructor() { }

  setSort(value: string): void {
    this.sort.next(value);
  }
  getSort(): BehaviorSubject<string> {
    return this.sort;
  }
  setState(value: string): void {
    this.state.next(value);
  }
  getState(): BehaviorSubject<string> {
    return this.state;
  }
  setCurrentIssues(issues: Issue[]): void {
    this.currentViewedIssues.next(issues);
  }
  getCurrentIssues(): Subject<Issue[]> {
    return this.currentViewedIssues;
  }
  setSelectedLabels(value: LabelState): void {
    this.selectedLabels.next(value);
  }
  getSelectedLabels(): BehaviorSubject<LabelState> {
    return this.selectedLabels;
  }
  setSelectedIssues(value: Issue[]): void {
    this.selectedIssues.next(value);
  }
  getSelectedIssues(): BehaviorSubject<Issue[]> {
    return this.selectedIssues;
  }
  setIssueFilter(value: string): void {
    this.issueFilter.next(value);
  }
  getIssueFilter(): BehaviorSubject<string> {
    return this.issueFilter;
  }
}
