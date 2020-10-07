import { Observable } from 'rxjs';
import { IconService } from './../../services/icon.service';
import { LabelService } from './../../services/label.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Label } from '../interface/label.interface';

@Component({
  selector: 'app-label-dropdown',
  templateUrl: './label-dropdown.component.html',
  styleUrls: ['./label-dropdown.component.css']
})
export class LabelDropdownComponent implements OnInit {

  @Input() type: string;
  @Input() position: string;

  @Output() labelEvent: EventEmitter<Label> = new EventEmitter();
  @Output() labelArray: EventEmitter<Label[]> = new EventEmitter();

  title = 'Labels';
  subtitle: string;

  labels: Label[] = [];

  holdDropdown = false;

  filterInput: string;

  selectedLabels: Label[] = [];

  constructor(
    private labelService: LabelService,
    public iconService: IconService,
  ) { }

  ngOnInit(): void {
    this.labelService.getLabelsFromApi().then(() => {
      this.labelService.getAllLabels().subscribe(labels => {
        this.labels = labels;
        this.labels.forEach(label => {
          if (label.isSelected) {
            this.selectedLabels.push(label);
          }
        });
      });

      if (this.type === 'select') {
        this.subtitle = 'Apply labels';
      }
      if (this.type === 'filter') {
        this.labelService.addUnlabeled();
        this.subtitle = 'Filter by label';
      }
    });
  }

  sendEvent(label: Label): void {
    this.labelEvent.emit(label);
    this.labelArray.emit(this.selectedLabels);
  }

  addSelectedLabel(label: Label): void {
    const index = this.selectedLabels.findIndex(x => x.id === label.id);
    if (index < 0) {
      this.selectedLabels.push(label);
      label.isSelected = true;
    } else {
      this.selectedLabels.splice(index, 1);
      label.isSelected = false;
    }
  }


}
