import { DateService } from './../../services/date.service';
import { IconService } from './../../services/icon.service';
import { Issue } from './../../shared/interface/issue.interface';
import { ActivatedRoute } from '@angular/router';
import { IssueInfoService } from './../../services/issue-info.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-issue-info',
  templateUrl: './issue-info.component.html',
  styleUrls: ['./issue-info.component.css']
})
export class IssueInfoComponent implements OnInit, OnDestroy {

  issue: Issue;

  titleEditMode = false;
  title: string;

  constructor(
    private issueInfoService: IssueInfoService,
    private activeRoute: ActivatedRoute,
    public iconService: IconService,
    public dateService: DateService
  ) { }

  ngOnDestroy(): void {
    this.issueInfoService.resetLabels();
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.issueInfoService.getIssueFromApi(params.number).then((issue) => {
        this.issue = issue;
        this.title = issue.title;
      });
    });
  }

  handleLabelEvent(event): void {
    console.log(event);
  }

  saveTitle(): void {
    console.log('last title: ', this.title);
    console.log('New title: ', this.issue.title);
    this.titleEditMode = false;
  }

}
