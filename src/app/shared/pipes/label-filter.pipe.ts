import { Pipe, PipeTransform } from '@angular/core';
import { Label } from '../interface/label.interface';

@Pipe({
  name: 'labelFilter'
})
export class LabelFilterPipe implements PipeTransform {

  transform(labels: Label[], searchFilter: string): Label[] {
    if (!labels) {
      return null;
    }
    if (!searchFilter) {
      return labels;
    }
    return labels.filter((label) => label.name.toLowerCase().includes(searchFilter.toLowerCase()));
  }

}
