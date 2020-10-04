import { Issue } from './../interface/issue.interface';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'issuesFilter'
})
export class IssuesFilterPipe implements PipeTransform {

  transform(issues: Issue[], filterInput: string): Issue[] {

    if (!issues) {
      return null;
    }
    if (!filterInput) {
      return issues;
    }

    return issues.filter(issue => issue.title.toLowerCase().includes(filterInput.toLowerCase()));

  }

}
