import { ListStateService } from './list-state.service';
import { LabelState } from './../shared/interface/label-state.inteface';
import { Issue } from './../shared/interface/issue.interface';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IssueInfoService {

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

  constructor(
    private apiService: ApiService,
    private liseState: ListStateService,
  ) { }

  getIssueFromApi(issueNumber: number): Promise<Issue> {
    return new Promise((resolve) => {
      this.apiService.getUserDetails().then(() => {
        this.apiService.getIssueByNumber(issueNumber).subscribe(issue => {
          this.getIssueLabels(issue);
          resolve(issue);
        });
      });
    });
  }
  getIssueLabels(issue: Issue): void {
    issue.labels.forEach(label => {
      this.activeLabels[label.name] = true;
    });
    this.liseState.setSelectedLabels(this.activeLabels);
  }
  resetLabels(): void {
    for (const label in this.activeLabels) {
      this.activeLabels[label] = false;
    }
    this.liseState.setSelectedLabels(this.activeLabels);
  }


}
