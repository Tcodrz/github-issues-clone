import { LabelState } from './../shared/interface/label-state.inteface';
import { ListStateService } from './list-state.service';
import { Issue } from './../shared/interface/issue.interface';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Label } from '../shared/interface/label.interface';

@Injectable({
  providedIn: 'root'
})
export class IssueListService {

  private issues: Issue[] = [];
  private issues$: BehaviorSubject<Issue[]> = new BehaviorSubject([]);

  private selectedIssues: Issue[] = [];
  private currentViewedIssues: Issue[] = [];

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
    unlabeled: false
  };

  private selectedLabels: LabelState = {
    bug: false,
    documentation: false,
    duplicate: false,
    enhancement: false,
    'good first issue': false,
    'help wanted': false,
    invalid: false,
    question: false,
    wontfix: false,
    unlabeled: false
  };

  private openIssuesCount: BehaviorSubject<number> = new BehaviorSubject(0);
  private closedIssuesCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(
    private apiService: ApiService,
    private listState: ListStateService,
  ) { }

  /* GETTERS */

  getIssuesFromApi(): Promise<Issue[]> {
    return new Promise(async (resolve) => {
      await this.apiService.getUserDetails();
      this.apiService.getIssuesForRepo().subscribe((issues) => {
        this.issues = issues;
        this.countIssues();
        this.listState.setCurrentIssues(this.issues);
        this.getCurrentViewedIssues();
        resolve(issues);
      });
    });
  }

  getIssues(): BehaviorSubject<Issue[]> {
    this.issues$.next(this.issues);
    return this.issues$;
  }

  getOpenIssuesCount(): BehaviorSubject<number> {
    return this.openIssuesCount;
  }
  getClosedIssuesCount(): BehaviorSubject<number> {
    return this.closedIssuesCount;
  }

  getCurrentViewedIssues(): void {
    this.listState.getCurrentIssues().subscribe(issues => {
      this.currentViewedIssues = issues;
    });
  }

  getCurrentIssuesAsObservable(): Observable<Issue[]> {
    return of(this.currentViewedIssues);
  }

  /* HANDLERS */

  handleIssueSelection(issue: Issue): Promise<{ allSelected: boolean, selectedIssues: Issue[] }> {

    return new Promise((resolve) => {

      const index = this.selectedIssues.findIndex(x => x.number === issue.number);

      if (index < 0) {
        this.addSelectedIssue(issue);
      } else {
        this.removeSelectedIssue(issue);
      }

      this.resetActiveLabel();

      if (this.selectedIssues.length > 0) {
        this.selectedIssues.forEach(x => {
          x.labels.forEach(label => {
            this.activeLabels[label.name] = true;
          });
        });

      } else {

        issue.labels.forEach(label => {
          if (this.selectedLabels[label.name]) {
            this.activeLabels[label.name] = true;
          }
        });
      }

      this.listState.setSelectedLabels(this.activeLabels);

      if (this.selectedIssues.length === this.currentViewedIssues.length) {
        resolve({ allSelected: true, selectedIssues: this.selectedIssues });
      }
      resolve({ allSelected: false, selectedIssues: this.selectedIssues });
    });
  }

  handleMainCheckboxClick(isChecked: boolean): void {

    if (isChecked) {
      this.currentViewedIssues.forEach((issue) => {
        const index = this.issues.findIndex(x => x.number === issue.number);
        this.issues[index].isSelected = true;
        const i = this.selectedIssues.findIndex(x => x.number === issue.number);
        if (i < 0) {
          this.selectedIssues.push(issue);
        }
      });

    }

    if (!isChecked) {
      this.currentViewedIssues.forEach((issue) => {
        const index = this.issues.findIndex(x => x.id === issue.id);
        this.issues[index].isSelected = false;
        const i = this.selectedIssues.findIndex(x => x.id === issue.id);
        if (i >= 0) {
          this.selectedIssues.splice(i, 1);
        }
      });
    }

    this.resetActiveLabel();

    if (this.selectedIssues.length > 0) {

      this.selectedIssues.forEach(issue => {
        issue.labels.forEach(label => {
          this.activeLabels[label.name] = true;
        });
      });

      this.listState.setSelectedLabels(this.activeLabels);

    } else {
      this.listState.setSelectedLabels(this.selectedLabels);
    }

  }

  handleLabelSelection(label: Label): Promise<void> {

    return new Promise((resolve) => {

      if (label.id === 1) {
        this.resetSelectedLabels();
      } else {
        this.selectedLabels.unlabeled = false;
      }

      this.selectedLabels[label.name] = !this.selectedLabels[label.name];
      this.filterIssuesByLabel().then((filteredIssues) => {
        this.listState.setCurrentIssues(filteredIssues);
        this.listState.setSelectedLabels(this.selectedLabels);
        resolve();
      });
    });
  }


  filterIssuesByLabel(): Promise<Issue[]> {

    return new Promise((resolve) => {

      const filteredIssues: Issue[] = [];

      let activateLabelsCount = 0;

      for (const label in this.selectedLabels) {
        if (this.selectedLabels[label]) {
          activateLabelsCount++;
        }
      }

      if (activateLabelsCount < 1) {
        resolve(this.issues);
      }

      this.issues.forEach(issue => {
        let matchingLabels = 0;

        if (issue.labels.length < 1 && this.selectedLabels.unlabeled) {
          filteredIssues.push(issue);
        }
        issue.labels.forEach(label => {

          if (this.selectedLabels[label.name]) {
            matchingLabels++;
          }
        });
        if (matchingLabels >= activateLabelsCount) {
          filteredIssues.push(issue);
        }
      });

      resolve(filteredIssues);
    });

  }

  handleAddRemoveLabel(label: Label): Promise<void> {

    return new Promise((resolve) => {

      const isActiveLabel = this.activeLabels[label.name];

      this.selectedIssues.forEach((issue) => {

        const index = issue.labels.findIndex(x => x.id === label.id);

        if (index < 0 && !isActiveLabel) {
          // add label to issue
          const issueLabels = issue.labels;
          const i = this.issues.findIndex(x => x.number === issue.number);
          this.issues[i].labels = issueLabels;
          issueLabels.push(label);
          this.activeLabels[label.name] = true;
          this.apiService.updateIssueLabels(issue.number, issueLabels).then(x => x);
        }
        if (isActiveLabel) {
          if (index >= 0) {
            // remove label from issue
            const issueLabels = issue.labels;
            const i = this.issues.findIndex(x => x.number === issue.number);
            const labelIndex = issueLabels.findIndex(x => x.id === label.id);
            issueLabels.splice(labelIndex, 1);
            this.issues[i].labels = issueLabels;
            this.activeLabels[label.name] = false;
            this.apiService.updateIssueLabels(issue.number, issueLabels).then(x => x);
          }
        }
      });

      this.listState.setSelectedLabels(this.activeLabels);

      resolve();
    });

  }

  markIssuesOpen(): Promise<void> {
    return new Promise((resolve) => {

      this.selectedIssues.forEach((issue) => {
        if (issue.state === 'closed') {
          this.apiService.markIssueOpen(issue);
          const index = this.issues.findIndex(x => x.number === issue.number);
          this.issues[index].state = 'open';
          this.counter('open', true);
          this.counter('closed', false);
        }
      });
      this.listState.setSelectedLabels(this.selectedLabels);
      resolve();
    });
  }

  markIssuesClosed(): Promise<void> {
    return new Promise((resolve) => {
      this.selectedIssues.forEach((issue) => {
        if (issue.state === 'open') {
          this.apiService.markIssueClosed(issue);
          const index = this.issues.findIndex(x => x.number === issue.number);
          this.issues[index].state = 'closed';
          this.counter('closed', true);
          this.counter('open', false);
        }
      });
      this.listState.setSelectedLabels(this.selectedLabels);
      resolve();
    });
  }

  /* HELPERS & PRIVATE METHODS */

  private countIssues(): void {
    this.openIssuesCount.next(0);
    this.closedIssuesCount.next(0);
    this.issues.forEach((issue) => {
      if (issue.state === 'open') {
        this.counter('open', true);
      } else {
        this.counter('closed', true);
      }
    });
  }

  private addSelectedIssue(issue: Issue): void {
    issue.isSelected = true;
    this.selectedIssues.push(issue);
  }

  private removeSelectedIssue(issue: Issue): void {
    issue.isSelected = false;
    this.selectedIssues.splice(this.selectedIssues.findIndex(x => x.id === issue.id), 1);
  }

  unSelectAllIssues(): void {
    this.issues.forEach(x => x.isSelected = false);
    this.selectedIssues = [];
  }

  selectAllCurrentIssues(): Promise<Issue[]> {
    return new Promise((resolve) => {

      this.currentViewedIssues.forEach(issue => {
        if (!this.selectedIssues.includes(issue)) {
          this.selectedIssues.push(issue);
        }
      });
      resolve(this.selectedIssues);
    });
  }

  private resetSelectedLabels(): void {
    for (const label in this.selectedLabels) {
      this.selectedLabels[label] = false;
    }
  }
  private resetActiveLabel(): void {
    for (const label in this.activeLabels){
      this.activeLabels[label] = false;
    }
  }

  private counter(state: string, increase: boolean): void {
    if (state === 'open') {
      const val = this.openIssuesCount.getValue();
      if (increase) {
        this.openIssuesCount.next(val + 1);
      } else {
        this.openIssuesCount.next(val - 1);
      }

    }
    if (state === 'closed') {
      const val = this.closedIssuesCount.getValue();
      if (increase) {
        this.closedIssuesCount.next(val + 1);
      } else {
        this.closedIssuesCount.next(val - 1);
      }

    }
  }

}

