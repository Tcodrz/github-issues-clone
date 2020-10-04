import { ListStateService } from './../../services/list-state.service';
import { DateService } from './../../services/date.service';
import { IconService } from './../../services/icon.service';
import { Issue } from './../../shared/interface/issue.interface';
import { IssueListService } from './../../services/issue-list.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues$: Observable<Issue[]>;

  openIssuesCount$: Observable<number>;
  closedIssuesCount$: Observable<number>;

  sort: string;
  state: string;

  mainCheckboxSelected = false;
  selectedMode = false;

  selectedIssuesCount: number;
  issuesFilterInput: string;

  constructor(
    private issueListService: IssueListService,
    private listStateService: ListStateService,
    public iconService: IconService,
    public dateService: DateService
  ) { }

  ngOnInit(): void {
    this.issueListService.getIssuesFromApi().then(() => {
      this.issues$ = this.issueListService.getIssues().asObservable();
      this.listStateService.getSort().subscribe(sort => this.sort = sort);
      this.listStateService.getState().subscribe(state => {
        if (this.state !== state) {
          this.state = state;
          this.mainCheckboxSelected = false;
          this.issueListService.unSelectAllIssues();
          this.selectedMode = false;
        }
      });
    });
    this.listStateService.getIssueFilter().subscribe((input: string) => {
      this.issuesFilterInput = input;
    });
  }


  handleMainCheckboxClick(): void {
    this.mainCheckboxSelected = !this.mainCheckboxSelected;
    this.issueListService.handleMainCheckboxClick(this.mainCheckboxSelected);
    if (this.mainCheckboxSelected) {
      this.issueListService.selectAllCurrentIssues().then((selectedIssues: Issue[]) => {
        this.selectedIssuesCount = selectedIssues.length;
        this.selectedMode = true;
      });
    } else {
      this.selectedMode = false;
    }
  }

  handleCheckboxClick(issue: Issue): void {
    this.issueListService.handleIssueSelection(issue)
    .then((val: {allSelected: boolean, selectedIssues: Issue[]}) => {
      this.mainCheckboxSelected = val.allSelected;
      if (val.selectedIssues.length > 0) {
        this.selectedMode = true;
        this.selectedIssuesCount = val.selectedIssues.length;
      } else {
        this.selectedMode = false;
      }
    });
  }


  handleLabelEvent(eventType: string): void {
    if (eventType === 'filter') {
      this.issues$ = this.issueListService.getCurrentIssuesAsObservable();
    }
  }


}
