import { Observable } from 'rxjs';
import { Pipe, PipeTransform } from '@angular/core';
import { Issue } from '../interface/issue.interface';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(issues: Issue[], sortType: string): Issue[] {

    if (!issues) {
      return null;
    }

    return issues.sort((a, b) => {
      if (sortType === 'old') {
        return Date.parse(a.created_at) - Date.parse(b.created_at);
      } 
      if (sortType === 'new') {
        return Date.parse(b.created_at) - Date.parse(a.created_at);
      }
    });
  }

}
