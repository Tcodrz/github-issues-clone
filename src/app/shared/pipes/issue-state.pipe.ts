import { ListStateService } from './../../services/list-state.service';
import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../interface/issue.interface';

@Pipe({
  name: 'issueState'
})
export class IssueStatePipe implements PipeTransform {

  constructor(private listState: ListStateService) { }

  transform(issues: Issue[], filterValue: string): Issue[] {
    if (!issues) {
      return null;
    }

    if (filterValue === 'all') {
      this.listState.setCurrentIssues(issues);
      return issues;
    }
    if (filterValue === 'open') {
      this.listState.setCurrentIssues(issues.filter((issue: Issue) => issue.state === 'open'));
      return issues.filter((issue: Issue) => issue.state === 'open');
    }
    if (filterValue === 'closed') {
      this.listState.setCurrentIssues(issues.filter((issue: Issue) => issue.state === 'closed'));
      return issues.filter((issue: Issue) => issue.state === 'closed');
    }

    return issues;
  }

}
